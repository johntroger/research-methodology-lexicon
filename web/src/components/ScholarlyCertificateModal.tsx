"use client";

import React, { useRef } from "react";
import { 
  X, 
  Printer, 
  Award, 
  ShieldCheck, 
  Building2, 
  CheckCircle2, 
  ExternalLink,
  Sparkles
} from "lucide-react";

interface ScholarlyCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  scholarName: string;
  institution?: string;
  termName: string;
  version?: string;
  approvedDate?: string;
  certificateId: string;
  languageMode: "vi" | "en";
}

export default function ScholarlyCertificateModal({
  isOpen,
  onClose,
  scholarName,
  institution,
  termName,
  version = "v1.1",
  approvedDate,
  certificateId,
  languageMode
}: ScholarlyCertificateModalProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const isEn = languageMode === "en";
  const formattedDate = approvedDate 
    ? new Date(approvedDate).toLocaleDateString(isEn ? "en-US" : "vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    : new Date().toLocaleDateString(isEn ? "en-US" : "vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });

  const t = {
    modalTitle: isEn ? "Certificate of Scholarly Contribution" : "Chứng Nhận Đóng Góp Học Thuật",
    printBtn: isEn ? "Print / Save PDF" : "In / Lưu PDF",
    closeBtn: isEn ? "Close" : "Đóng",
    headerOrg: isEn ? "RESEARCH METHODOLOGY LEXICON & SCHOLARLY COMMITTEE" : "HỘI ĐỒNG BIÊN TẬP TỪ ĐIỂN PHƯƠNG PHÁP NGHIÊN CỨU",
    headerSub: isEn ? "PEER-REVIEWED ACADEMIC REGISTRY & REPOSITORY" : "CƠ SỞ DỮ LIỆU THUẬT NGỮ PHƯƠNG PHÁP LUẬN ĐƯỢC BẢO CHỨNG",
    certTitle: isEn ? "CERTIFICATE OF SCHOLARLY CONTRIBUTION" : "GIẤY CHỨNG NHẬN ĐÓNG GÓP HỌC THUẬT",
    certPreamble: isEn 
      ? "This certificate is formally presented to acknowledge the distinguished peer-reviewed editorial contribution of"
      : "Chứng nhận ghi nhận đóng góp học thuật và thẩm định phương pháp luận xuất sắc của",
    certBody: isEn
      ? "for contributing rigorously verified methodological definitions, empirical benchmarks, and academic literature provenance for the lexicon entry:"
      : "cho những đóng góp định nghĩa phương pháp luận chuẩn xác, ngưỡng số liệu thực nghiệm và minh chứng học thuật đối với mục từ:",
    signTitle: isEn ? "Editor-in-Chief & Lead Methodologist" : "Tổng Biên tập & Trưởng Ban Phương pháp",
    signAffiliation: isEn ? "Nguyen Tat Thanh University (NTTU)" : "Trường Đại học Nguyễn Tất Thành (NTTU)",
    certIdLabel: isEn ? "Verification Code" : "Mã định danh xác thực",
    issuedOn: isEn ? "Issued On" : "Ngày cấp chứng nhận",
    officialSeal: isEn ? "OFFICIAL SCHOLARLY SEAL" : "DẤU CHỨNG THỰC HỌC THUẬT"
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-sans animate-in fade-in duration-150">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Thanh công cụ điều khiển trên Modal */}
        <div className="no-print h-12 px-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
            <Award size={16} className="text-amber-500" />
            <span>{t.modalTitle}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition"
            >
              <Printer size={13} />
              <span>{t.printBtn}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ===============================================================
            KHUNG GIẤY CHỨNG NHẬN (CERTIFICATE FRAME - OPTIMIZED FOR PRINT)
            =============================================================== */}
        <div 
          ref={certificateRef}
          className="p-6 sm:p-10 md:p-12 bg-[#FCFCFD] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between relative overflow-hidden"
          style={{ minHeight: "520px" }}
        >
          {/* Viền đôi trang trọng phong cách văn bằng học thuật */}
          <div className="absolute inset-3 sm:inset-4 border-2 border-amber-600/40 rounded-xl pointer-events-none" />
          <div className="absolute inset-4 sm:inset-5 border border-amber-500/20 rounded-lg pointer-events-none" />

          {/* Góc hoa văn trang trí */}
          <div className="absolute top-5 left-5 text-amber-500/30 text-xs font-serif select-none pointer-events-none">❖</div>
          <div className="absolute top-5 right-5 text-amber-500/30 text-xs font-serif select-none pointer-events-none">❖</div>
          <div className="absolute bottom-5 left-5 text-amber-500/30 text-xs font-serif select-none pointer-events-none">❖</div>
          <div className="absolute bottom-5 right-5 text-amber-500/30 text-xs font-serif select-none pointer-events-none">❖</div>

          {/* 1. Header Cơ quan Ban hành */}
          <div className="text-center space-y-1 relative z-10 pt-2">
            <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
              <ShieldCheck size={26} />
            </div>
            <h4 className="font-serif uppercase tracking-widest text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-400">
              {t.headerOrg}
            </h4>
            <p className="font-mono text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 tracking-wider">
              {t.headerSub}
            </p>
          </div>

          {/* 2. Tiêu đề Giấy Chứng Nhận */}
          <div className="text-center my-6 sm:my-8 space-y-2 relative z-10">
            <h2 className="font-serif font-extrabold tracking-wider text-xl sm:text-2xl md:text-3xl text-amber-700 dark:text-amber-400 uppercase">
              {t.certTitle}
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
          </div>

          {/* 3. Nội dung Chứng nhận & Tên Học giả */}
          <div className="text-center space-y-4 max-w-xl mx-auto relative z-10 font-serif leading-relaxed">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 italic">
              {t.certPreamble}
            </p>

            <div className="space-y-1 py-1">
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
                {scholarName}
              </h3>
              {institution && (
                <p className="text-xs font-sans text-slate-500 dark:text-slate-400 font-medium">
                  {institution}
                </p>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {t.certBody}
            </p>

            {/* Mục từ được chứng nhận */}
            <div className="inline-block p-3 sm:px-6 sm:py-2.5 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200">
              <span className="font-serif font-extrabold text-base sm:text-lg block">
                {termName}
              </span>
              <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 tracking-wider">
                Permanent Academic Edition &bull; {version}
              </span>
            </div>
          </div>

          {/* 4. Footer: Chữ ký Tổng Biên tập & Mã Xác thực */}
          <div className="pt-8 sm:pt-10 mt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 text-xs">
            {/* Mã Xác thực Certificate ID */}
            <div className="text-center sm:text-left space-y-1 font-mono text-[11px] text-slate-400">
              <div>
                <span className="text-slate-500">{t.certIdLabel}: </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{certificateId}</span>
              </div>
              <div>
                <span className="text-slate-500">{t.issuedOn}: </span>
                <span>{formattedDate}</span>
              </div>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 block pt-0.5">
                https://vnresearch-dictionary.vercel.app
              </span>
            </div>

            {/* Con dấu & Chữ ký ThS. Trần Thanh Tùng */}
            <div className="text-center sm:text-right space-y-1">
              <div className="font-serif italic font-semibold text-sm text-slate-900 dark:text-white">
                ThS. Trần Thanh Tùng
              </div>
              <div className="font-sans text-[11px] font-bold text-slate-700 dark:text-slate-300">
                {t.signTitle}
              </div>
              <div className="font-sans text-[10px] text-slate-500 dark:text-slate-400">
                {t.signAffiliation}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
