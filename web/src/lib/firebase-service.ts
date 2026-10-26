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
  getDocs,
  query,
  orderBy,
  updateDoc,
  serverTimestamp 
} from "firebase/firestore";
import { TermRevisionInput, NewTermProposalInput } from "./types";

export interface TermRevisionItem extends TermRevisionInput {
  id: string;
}

export interface NewTermProposalItem extends NewTermProposalInput {
  id: string;
}

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

/**
 * Kiểm tra giới hạn tần suất gửi đóng góp (Tối đa 3 lượt / 24h trên client)
 */
export function checkSubmissionRateLimit(): { allowed: boolean; remaining: number } {
  if (typeof window === "undefined") return { allowed: true, remaining: 3 };
  try {
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;
    const history: number[] = JSON.parse(localStorage.getItem("rv_submission_history") || "[]");
    const validHistory = history.filter(ts => now - ts < oneDayMs);
    
    if (validHistory.length >= 3) {
      return { allowed: false, remaining: 0 };
    }
    return { allowed: true, remaining: 3 - validHistory.length };
  } catch {
    return { allowed: true, remaining: 3 };
  }
}

/**
 * Ghi nhận một lượt gửi thành công vào rate limit
 */
function recordSubmissionTimestamp(): void {
  if (typeof window === "undefined") return;
  try {
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;
    const history: number[] = JSON.parse(localStorage.getItem("rv_submission_history") || "[]");
    const validHistory = history.filter(ts => now - ts < oneDayMs);
    validHistory.push(now);
    localStorage.setItem("rv_submission_history", JSON.stringify(validHistory));
  } catch (e) {
    console.warn("rate limit record error", e);
  }
}

/**
 * Gửi đề xuất chỉnh sửa mục từ (Wiki Revision)
 */
export async function submitTermRevision(revision: TermRevisionInput): Promise<{ success: boolean; error?: string }> {
  // 1. Kiểm tra rate limit
  const rateLimit = checkSubmissionRateLimit();
  if (!rateLimit.allowed) {
    return { 
      success: false, 
      error: "Bạn đã gửi đủ 3 đóng góp trong 24 giờ. Vui lòng quay lại vào ngày mai để đảm bảo chất lượng học thuật!" 
    };
  }

  // 2. Gửi vào Firestore
  if (isFirebaseConfigured && db) {
    try {
      const revisionsCol = collection(db, "pending_revisions");
      await addDoc(revisionsCol, {
        ...revision,
        createdAt: serverTimestamp(),
        status: "pending"
      });
      recordSubmissionTimestamp();
      return { success: true };
    } catch (err: any) {
      console.error("[Wiki] Firestore revision submit error:", err);
    }
  }

  // Fallback: ghi vào localStorage
  if (typeof window !== "undefined") {
    const localRevs = JSON.parse(localStorage.getItem("rv_local_revisions") || "[]");
    localRevs.push({ ...revision, createdAt: new Date().toISOString(), status: "pending" });
    localStorage.setItem("rv_local_revisions", JSON.stringify(localRevs));
    recordSubmissionTimestamp();
  }
  return { success: true };
}

/**
 * Gửi đề xuất tạo thuật ngữ mới
 */
export async function submitNewTermProposal(proposal: NewTermProposalInput): Promise<{ success: boolean; error?: string }> {
  // 1. Kiểm tra rate limit
  const rateLimit = checkSubmissionRateLimit();
  if (!rateLimit.allowed) {
    return { 
      success: false, 
      error: "Bạn đã gửi đủ 3 đóng góp trong 24 giờ. Vui lòng quay lại vào ngày mai!" 
    };
  }

  // 2. Gửi vào Firestore
  if (isFirebaseConfigured && db) {
    try {
      const proposalsCol = collection(db, "pending_terms");
      await addDoc(proposalsCol, {
        ...proposal,
        createdAt: serverTimestamp(),
        status: "pending"
      });
      recordSubmissionTimestamp();
      return { success: true };
    } catch (err: any) {
      console.error("[Wiki] Firestore new term submit error:", err);
    }
  }

  // Fallback: ghi vào localStorage
  if (typeof window !== "undefined") {
    const localProposals = JSON.parse(localStorage.getItem("rv_local_new_terms") || "[]");
    localProposals.push({ ...proposal, createdAt: new Date().toISOString(), status: "pending" });
    localStorage.setItem("rv_local_new_terms", JSON.stringify(localProposals));
    recordSubmissionTimestamp();
  }
  return { success: true };
}

/**
 * Tải danh sách đề xuất chỉnh sửa mục từ (Cho trang Kiểm duyệt)
 */
export async function fetchPendingRevisions(): Promise<TermRevisionItem[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "pending_revisions"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const items: TermRevisionItem[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt || new Date().toISOString()
        } as TermRevisionItem);
      });
      return items;
    } catch (err) {
      console.warn("[Moderation] Firestore fetch revisions error:", err);
    }
  }

  // Fallback: đọc từ localStorage
  if (typeof window !== "undefined") {
    const local = JSON.parse(localStorage.getItem("rv_local_revisions") || "[]");
    return local.map((item: any, idx: number) => ({
      id: `local-rev-${idx}`,
      ...item
    }));
  }
  return [];
}

/**
 * Tải danh sách đề xuất thuật ngữ mới (Cho trang Kiểm duyệt)
 */
export async function fetchPendingTerms(): Promise<NewTermProposalItem[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, "pending_terms"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const items: NewTermProposalItem[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt || new Date().toISOString()
        } as NewTermProposalItem);
      });
      return items;
    } catch (err) {
      console.warn("[Moderation] Firestore fetch new terms error:", err);
    }
  }

  // Fallback: đọc từ localStorage
  if (typeof window !== "undefined") {
    const local = JSON.parse(localStorage.getItem("rv_local_new_terms") || "[]");
    return local.map((item: any, idx: number) => ({
      id: `local-term-${idx}`,
      ...item
    }));
  }
  return [];
}

/**
 * Phê duyệt hoặc Từ chối bản sửa đổi mục từ
 */
export async function reviewTermRevision(
  revisionId: string, 
  status: "approved" | "rejected", 
  reviewerNote?: string
): Promise<boolean> {
  if (isFirebaseConfigured && db && !revisionId.startsWith("local-")) {
    try {
      const docRef = doc(db, "pending_revisions", revisionId);
      await updateDoc(docRef, {
        status,
        reviewerNote: reviewerNote || "",
        reviewedAt: serverTimestamp()
      });
      return true;
    } catch (err) {
      console.error("[Moderation] Update revision status error:", err);
    }
  }

  // Fallback update localStorage
  if (typeof window !== "undefined") {
    const localRevs = JSON.parse(localStorage.getItem("rv_local_revisions") || "[]");
    const idx = parseInt(revisionId.replace("local-rev-", ""), 10);
    if (!isNaN(idx) && localRevs[idx]) {
      localRevs[idx].status = status;
      localRevs[idx].reviewerNote = reviewerNote || "";
      localRevs[idx].reviewedAt = new Date().toISOString();
      localStorage.setItem("rv_local_revisions", JSON.stringify(localRevs));
    }
  }
  return true;
}

/**
 * Phê duyệt hoặc Từ chối bản đề xuất thuật ngữ mới
 */
export async function reviewNewTermProposal(
  proposalId: string, 
  status: "approved" | "rejected", 
  reviewerNote?: string
): Promise<boolean> {
  if (isFirebaseConfigured && db && !proposalId.startsWith("local-")) {
    try {
      const docRef = doc(db, "pending_terms", proposalId);
      await updateDoc(docRef, {
        status,
        reviewerNote: reviewerNote || "",
        reviewedAt: serverTimestamp()
      });
      return true;
    } catch (err) {
      console.error("[Moderation] Update proposal status error:", err);
    }
  }

  // Fallback update localStorage
  if (typeof window !== "undefined") {
    const localTerms = JSON.parse(localStorage.getItem("rv_local_new_terms") || "[]");
    const idx = parseInt(proposalId.replace("local-term-", ""), 10);
    if (!isNaN(idx) && localTerms[idx]) {
      localTerms[idx].status = status;
      localTerms[idx].reviewerNote = reviewerNote || "";
      localTerms[idx].reviewedAt = new Date().toISOString();
      localStorage.setItem("rv_local_new_terms", JSON.stringify(localTerms));
    }
  }
  return true;
}
