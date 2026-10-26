"use client";

import React, { useState } from "react";
import { 
  LogIn, 
  X, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink,
  User
} from "lucide-react";
import { loginWithGoogle } from "@/lib/firebase-service";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
  languageMode: "vi" | "en";
}

export default function LoginModal({
  isOpen,
  onClose,
  onSuccess,
  languageMode
}: LoginModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [unauthorizedDomain, setUnauthorizedDomain] = useState<string | null>(null);

  if (!isOpen) return null;

  const isEn = languageMode === "en";

  const t = {
    title: isEn ? "Scholar Authentication" : "Xác Thực Danh Tính Học Thuật",
    subtitle: isEn 
      ? "Sign in with your Google account to save research bookmarks, propose peer-reviewed revisions, and join academic debates" 
      : "Đăng nhập bằng tài khoản Google để đồng bộ sổ tay tra cứu, đề xuất hiệu đính mục từ và tham gia diễn đàn học thuật",
    googleBtn: isEn ? "Sign in with Google Account" : "Đăng nhập bằng Tài khoản Google",
    unauthorizedTitle: isEn ? "Firebase Domain Not Authorized" : "Tên miền chưa được cấp quyền trong Firebase Auth",
    unauthorizedGuide: isEn 
      ? "The domain vnresearch-dictionary.vercel.app has not been whitelisted in Firebase Console. Please add it under: Firebase Console > Authentication > Settings > Authorized Domains."
      : "Tên miền vnresearch-dictionary.vercel.app chưa được cấp quyền trong Firebase Console. Vui lòng thêm vào mục: Firebase Console > Authentication > Settings > Authorized Domains.",
    footerNote: isEn
      ? "Your scholarly identity will be attributed on peer-reviewed revisions in the Hall of Fame."
      : "Danh tính học thuật của bạn sẽ được ghi nhận công khai trên các mục từ được phê duyệt và Bảng Vinh danh."
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setAuthError(null);
    setUnauthorizedDomain(null);

    try {
      const user = await loginWithGoogle();
      if (user) {
        onSuccess(user);
        onClose();
      }
    } catch (err: any) {
      console.error("[LoginModal] Google Auth Error:", err);
      const errCode = err?.code || "";
      const errMsg = err?.message || "";

      if (errCode === "auth/configuration-not-found" || errMsg.includes("configuration-not-found")) {
        setAuthError(
          isEn 
            ? "Google provider is not enabled in Firebase Console. Go to: Firebase Console > Authentication > Sign-in method > Enable 'Google' and save."
            : "Chưa kích hoạt đăng nhập Google trong Firebase Console. Vui lòng vào: Firebase Console > Authentication > tab 'Sign-in method' > Chọn 'Google', gạt nút 'Enable' (Bật), chọn email hỗ trợ và bấm Lưu (Save)."
        );
      } else if (errCode === "auth/unauthorized-domain" || errMsg.includes("unauthorized-domain")) {
        const domain = typeof window !== "undefined" ? window.location.hostname : "vnresearch-dictionary.vercel.app";
        setUnauthorizedDomain(domain);
      } else if (errCode === "auth/popup-closed-by-user") {
        setAuthError(isEn ? "Sign-in popup was closed." : "Cửa sổ đăng nhập đã bị đóng trước khi hoàn tất.");
      } else if (errCode === "auth/popup-blocked") {
        setAuthError(isEn ? "Popup blocked by browser. Please allow popups." : "Trình duyệt đã chặn cửa sổ pop-up. Vui lòng cho phép pop-up.");
      } else {
        setAuthError(err.message || (isEn ? "Failed to authenticate." : "Xác thực không thành công. Hãy thử lại."));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150 font-sans">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden space-y-4 p-5 sm:p-6 relative">
        {/* Nút đóng X */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X size={16} />
        </button>

        {/* Header Modal */}
        <div className="text-center space-y-1.5 pt-1">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-xs">
            <LogIn size={22} />
          </div>
          <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
            {t.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-serif">
            {t.subtitle}
          </p>
        </div>

        {/* Thông báo lỗi nếu có */}
        {unauthorizedDomain ? (
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs space-y-2 text-amber-900 dark:text-amber-200">
            <div className="flex items-start gap-2 font-bold">
              <AlertCircle size={15} className="text-amber-600 shrink-0 mt-0.5" />
              <span>{t.unauthorizedTitle}</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-800 dark:text-amber-300">
              {t.unauthorizedGuide}
            </p>
            <div className="p-2 rounded bg-white/70 dark:bg-slate-900/60 border border-amber-200 dark:border-amber-900 font-mono text-[11px] select-all break-all text-slate-800 dark:text-slate-200 font-bold">
              {unauthorizedDomain}
            </div>
          </div>
        ) : authError ? (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 flex items-center gap-2">
            <AlertCircle size={14} className="shrink-0" />
            <span>{authError}</span>
          </div>
        ) : null}

        {/* Hành động Đăng nhập */}
        <div className="space-y-3 pt-2">
          {/* Nút: Đăng nhập Google */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-800 dark:text-white font-semibold text-xs transition flex items-center justify-center gap-2.5 shadow-xs disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.99 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>{isLoading ? "..." : t.googleBtn}</span>
          </button>
        </div>

        {/* Footer ghi chú học thuật */}
        <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center leading-relaxed pt-1">
          {t.footerNote}
        </p>
      </div>
    </div>
  );
}
