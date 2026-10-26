import { auth, db, googleProvider, isFirebaseConfigured } from "./firebase";
import { 
  signInWithPopup, 
  signOut as fbSignOut, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  addDoc, 
  serverTimestamp 
} from "firebase/firestore";

const LOCAL_STORAGE_BOOKMARKS_KEY = "rv_user_bookmarks";

export interface UserBookmarkData {
  termIds: string[];
  updatedAt: string;
}

export interface FeedbackInput {
  termId?: string;
  termName?: string;
  type: "correction" | "missing_term" | "suggestion" | "bug";
  message: string;
  userEmail?: string;
}

/**
 * Đăng nhập qua Google Popup
 */
export async function loginWithGoogle(): Promise<User | null> {
  if (!isFirebaseConfigured || !auth || !googleProvider) {
    console.info("[Auth] Firebase chưa cấu hình credentials. Chạy chế độ khách/demo.");
    return null;
  }
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (err: any) {
    console.error("[Auth] Login error:", err);
    throw err;
  }
}

/**
 * Đăng xuất
 */
export async function logoutUser(): Promise<void> {
  if (auth && isFirebaseConfigured) {
    await fbSignOut(auth);
  }
}

/**
 * Lắng nghe thay đổi trạng thái đăng nhập
 */
export function subscribeToAuth(callback: (user: User | null) => void): () => void {
  if (!isFirebaseConfigured || !auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

/**
 * Đọc bookmarks: ưu tiên Firestore nếu đã đăng nhập, fallback localStorage
 */
export async function fetchUserBookmarks(userId?: string): Promise<string[]> {
  // 1. Thử lấy từ Firestore nếu có user
  if (isFirebaseConfigured && db && userId) {
    try {
      const docRef = doc(db, "users", userId, "preferences", "bookmarks");
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        const ids: string[] = data.termIds || [];
        // Sync ngược lại localStorage để dùng offline
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_STORAGE_BOOKMARKS_KEY, JSON.stringify(ids));
        }
        return ids;
      }
    } catch (err) {
      console.warn("[Bookmarks] Firestore read error, falling back to localStorage:", err);
    }
  }

  // 2. Fallback localStorage
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_BOOKMARKS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
  return [];
}

/**
 * Toggle Bookmark (Lưu / Bỏ lưu thuật ngữ)
 */
export async function toggleUserBookmark(termId: string, currentBookmarks: string[], userId?: string): Promise<string[]> {
  const isBookmarked = currentBookmarks.includes(termId);
  const newBookmarks = isBookmarked 
    ? currentBookmarks.filter(id => id !== termId)
    : [...currentBookmarks, termId];

  // 1. Lưu ngay vào localStorage (Phản hồi tức thì UI)
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(LOCAL_STORAGE_BOOKMARKS_KEY, JSON.stringify(newBookmarks));
    } catch (e) {
      console.warn("localStorage error:", e);
    }
  }

  // 2. Đồng bộ Firestore nếu có user
  if (isFirebaseConfigured && db && userId) {
    try {
      const docRef = doc(db, "users", userId, "preferences", "bookmarks");
      await setDoc(docRef, {
        termIds: newBookmarks,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.error("[Bookmarks] Firestore sync error:", err);
    }
  }

  return newBookmarks;
}

/**
 * Gửi phản hồi / Góp ý thuật ngữ
 */
export async function submitUserFeedback(feedback: FeedbackInput): Promise<boolean> {
  if (isFirebaseConfigured && db) {
    try {
      const feedbacksCol = collection(db, "feedbacks");
      await addDoc(feedbacksCol, {
        ...feedback,
        createdAt: serverTimestamp(),
        status: "pending"
      });
      return true;
    } catch (err) {
      console.error("[Feedback] Firestore submit error:", err);
    }
  }

  // Fallback: ghi vào console và lưu tạm localStorage
  console.log("[Feedback] Logged locally:", feedback);
  if (typeof window !== "undefined") {
    const localFeedbacks = JSON.parse(localStorage.getItem("rv_local_feedbacks") || "[]");
    localFeedbacks.push({ ...feedback, createdAt: new Date().toISOString() });
    localStorage.setItem("rv_local_feedbacks", JSON.stringify(localFeedbacks));
  }
  return true;
}
