/**
 * db-pull.ts: Kéo toàn bộ thuật ngữ từ Firestore về lưu thành file JSON dự phòng
 * Chạy lệnh: npx tsx scripts/db-pull.ts
 */
import fs from "fs";
import path from "path";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...vals] = trimmed.split("=");
      if (key && vals.length > 0) {
        process.env[key.trim()] = vals.join("=").trim();
      }
    }
  });
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

async function pullTermsFromFirestore() {
  console.log("=== DB-PULL: Kéo thuật ngữ từ Firestore về máy ===");

  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "your_api_key_here") {
    console.warn("⚠️  CẢNH BÁO: Chưa cấu hình Firebase API Key trong .env.local.");
    return;
  }

  const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const snapshot = await getDocs(collection(db, "methodology_terms"));
  const terms: any[] = [];
  snapshot.forEach(docSnap => {
    terms.push(docSnap.data());
  });

  console.log(`📦 Đã lấy về ${terms.length} thuật ngữ từ Firestore.`);

  const outputPath = path.join(process.cwd(), "public", "data", "methodology_terms_remote.json");
  fs.writeFileSync(outputPath, JSON.stringify({ version: "1.0", terms }, null, 2), "utf-8");
  console.log(`🎉 Đã lưu file thành công tại: ${outputPath}`);
}

pullTermsFromFirestore().catch(err => {
  console.error("❌ Lỗi trong quá trình pull:", err);
  process.exit(1);
});
