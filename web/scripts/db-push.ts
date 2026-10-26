/**
 * db-push.ts: Đồng bộ danh sách thuật ngữ từ file JSON cục bộ lên Firestore
 * Chạy lệnh: npx tsx scripts/db-push.ts
 */
import fs from "fs";
import path from "path";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, writeBatch } from "firebase/firestore";

// Load local env file if present
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

async function pushTermsToFirestore() {
  console.log("=== DB-PUSH: Đồng bộ thuật ngữ lên Firestore ===");

  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "your_api_key_here") {
    console.warn("⚠️  CẢNH BÁO: Chưa cấu hình Firebase API Key trong .env.local.");
    console.log("👉 Vui lòng tạo file web/.env.local dựa trên web/.env.example để đồng bộ dữ liệu thật lên cloud.");
    return;
  }

  const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Đọc methodology_terms.json
  const dataPath = path.join(process.cwd(), "public", "data", "methodology_terms.json");
  if (!fs.existsSync(dataPath)) {
    console.error(`❌ Không tìm thấy file dữ liệu tại: ${dataPath}`);
    return;
  }

  const raw = fs.readFileSync(dataPath, "utf-8");
  const json = JSON.parse(raw);
  let terms: any[] = json.terms || [];

  const args = process.argv.slice(2);
  const onlyFlagship = args.includes("--only-flagship");
  const onlyUpdated = args.includes("--only-updated");

  if (onlyUpdated) {
    terms = terms.filter(t => t.last_updated === "2026-10-26");
    console.log(`🔍 Lọc theo chế độ --only-updated: còn ${terms.length} thuật ngữ.`);
  } else if (onlyFlagship) {
    terms = terms.filter(t => t.is_flagship);
    console.log(`🔍 Lọc theo chế độ --only-flagship: còn ${terms.length} thuật ngữ.`);
  }

  console.log(`📦 Tìm thấy ${terms.length} thuật ngữ cần đồng bộ. Đang tiến hành ghi theo lô (batch write)...`);

  // Firestore giới hạn 500 thao tác / batch
  const BATCH_SIZE = 400;
  let batch = writeBatch(db);
  let count = 0;
  let batchCount = 0;

  for (const term of terms) {
    const termDocRef = doc(db, "methodology_terms", term.id);
    batch.set(termDocRef, {
      ...term,
      syncedAt: new Date().toISOString()
    }, { merge: true });
    count++;

    if (count % BATCH_SIZE === 0) {
      await batch.commit();
      batchCount++;
      console.log(`   ✓ Đã hoàn thành batch ${batchCount} (${count}/${terms.length} terms)`);
      batch = writeBatch(db);
    }
  }

  if (count % BATCH_SIZE !== 0) {
    await batch.commit();
    batchCount++;
    console.log(`   ✓ Đã hoàn thành batch cuối ${batchCount} (${count}/${terms.length} terms)`);
  }

  console.log(`🎉 HOÀN TẤT! Đã đồng bộ thành công ${terms.length} thuật ngữ lên collection "methodology_terms".`);
}

pushTermsToFirestore().catch(err => {
  console.error("❌ Lỗi trong quá trình push:", err);
  process.exit(1);
});
