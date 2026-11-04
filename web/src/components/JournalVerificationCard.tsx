"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  Award,
  Flame,
  CheckCircle2,
  Copy,
  Check,
  BookOpen,
  Building,
  GraduationCap,
  Scale,
  ExternalLink,
  ShieldAlert,
  FileCheck2,
  Sparkles
} from "lucide-react";
import { JournalItemResult } from "@/lib/journal-search";

interface JournalVerificationCardProps {
  item: JournalItemResult;
  isCompact?: boolean;
}

export default function JournalVerificationCard({ item, isCompact = false }: JournalVerificationCardProps) {
  const [copied, setCopied] = useState(false);
  const rep = item.report;

  const handleCopyReport = () => {
    if (rep?.rawReportText) {
      navigator.clipboard.writeText(rep.rawReportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const isDanger = item.status === "discontinued" || item.status === "wos_delisted" || item.status === "hijacked";
  const isWarning = item.status === "predatory" || (item.retraction && item.retraction.count >= 5);

  return (
    <article
      className={`rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm ${
        isDanger
          ? "bg-gradient-to-b from-red-50/60 to-white dark:from-red-950/20 dark:to-[#0c1222] border-red-200 dark:border-red-900/60"
          : isWarning
          ? "bg-gradient-to-b from-amber-50/60 to-white dark:from-amber-950/20 dark:to-[#0c1222] border-amber-200 dark:border-amber-900/60"
          : "bg-white dark:bg-[#0c1222] border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700"
      }`}
    >
      {/* 1. EXECUTIVE BANNER (DÒNG TIÊU ĐỀ KẾT LUẬN TỔNG QUAN) */}
      <div
        className={`px-4 sm:px-6 py-3 border-b flex flex-wrap items-center justify-between gap-2.5 ${
          isDanger
            ? "bg-red-600 text-white border-red-700"
            : isWarning
            ? "bg-amber-600 text-white border-amber-700"
            : "bg-emerald-600 dark:bg-emerald-700 text-white border-emerald-700"
        }`}
      >
        <div className="flex items-center gap-2 font-bold text-xs sm:text-sm tracking-tight">
          {isDanger ? <AlertTriangle size={16} /> : isWarning ? <ShieldAlert size={16} /> : <CheckCircle2 size={16} />}
          <span>{rep?.verdictTitle || item.statusBadge.label}</span>
        </div>

        {/* Nút Sao chép toàn văn Báo cáo Thẩm định */}
        {rep?.rawReportText && (
          <button
            onClick={handleCopyReport}
            className="px-2.5 py-1 rounded-lg bg-black/20 hover:bg-black/30 text-white text-[11px] font-semibold flex items-center gap-1.5 transition cursor-pointer shrink-0"
            title="Sao chép toàn văn báo cáo thẩm định học thuật (định dạng chuẩn Zalo Bot) để dán vào Word, Email hoặc trao đổi"
          >
            {copied ? <Check size={13} className="text-white" /> : <Copy size={13} />}
            <span>{copied ? "Đã sao chép báo cáo!" : "Sao chép Báo cáo"}</span>
          </button>
        )}
      </div>

      {/* Pill summary badges dưới Header */}
      {rep?.verdictBadges && rep.verdictBadges.length > 0 && (
        <div className="px-4 sm:px-6 py-2 bg-slate-100/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
          {rep.verdictBadges.map((badge, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded-md font-medium text-[11px] bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-2xs"
            >
              {badge}
            </span>
          ))}
        </div>
      )}

      {/* MAIN BODY: 5 PHẦN THẨM ĐỊNH HỌC THUẬT */}
      <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
        
        {/* PHẦN 1: ĐỊNH DANH & CƠ QUAN CHỦ QUẢN */}
        <section className="space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-blue-700 dark:text-blue-400">
            <BookOpen size={14} />
            <span>1. Định danh & Cơ quan chủ quản</span>
          </div>

          <div className="pl-4 border-l-2 border-blue-400 dark:border-blue-600 space-y-1">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
              {item.title}
            </h3>
            {rep?.identification.acronymDecoded && (
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                (Được giải mã từ tên viết tắt: <strong>{rep.identification.acronymDecoded}</strong>)
              </p>
            )}
            <p className="font-mono text-xs text-slate-600 dark:text-slate-400">
              • Mã ISSN / eISSN: <strong className="text-slate-900 dark:text-slate-200">{item.issn}</strong>
              {item.eissn && item.eissn !== item.issn && (
                <span> | e-ISSN: <strong className="text-slate-900 dark:text-slate-200">{item.eissn}</strong></span>
              )}
            </p>
            {item.publisher && (
              <p className="text-xs">
                • Cơ quan chủ quản / NXB: <strong className="text-slate-900 dark:text-slate-200">{item.publisher}</strong>
                {item.country && <span> ({item.country})</span>}
              </p>
            )}
          </div>
        </section>

        {/* CẢNH BÁO NGUY HIỂM NẾU BỊ DISCONTINUED / WOS / HIJACKED */}
        {item.discontinuedInfo && (
          <div className="p-3.5 rounded-xl bg-red-100/80 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs sm:text-sm text-red-950 dark:text-red-200 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-red-700 dark:text-red-300">
              <AlertTriangle size={15} />
              <span>🚨 CẢNH BÁO: ĐÃ BỊ LOẠI KHỎI SCOPUS (DISCONTINUED)!</span>
            </div>
            <p>• Năm ngừng chỉ mục: <strong>{item.discontinuedInfo.year || "Gần đây"}</strong></p>
            {item.discontinuedInfo.reason && (
              <p>• Lý do loại bỏ: <em>{item.discontinuedInfo.reason}</em></p>
            )}
            {item.discontinuedInfo.coverage && (
              <p>• Dữ liệu bảo lưu: {item.discontinuedInfo.coverage}</p>
            )}
            <p className="font-semibold text-red-700 dark:text-red-300 pt-1">
              ⚠️ Đánh giá rủi ro: Bài đăng sau ngày bị loại sẽ bị 0 điểm HĐGSNN và không được tính chuẩn đầu ra Tiến sĩ.
            </p>
          </div>
        )}

        {item.hijackedInfo && (
          <div className="p-3.5 rounded-xl bg-amber-100/80 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-900/60 text-xs sm:text-sm text-amber-950 dark:text-amber-200 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
              <AlertTriangle size={15} />
              <span>⛔ CẢNH BÁO: TẠP CHÍ BỊ GIẢ MẠO / CƯỚP TÊN MIỀN (HIJACKED)!</span>
            </div>
            {item.hijackedInfo.realUrl && (
              <p className="flex items-center gap-1 text-emerald-800 dark:text-emerald-300">
                ✅ Website Chính thức:{" "}
                <a href={item.hijackedInfo.realUrl} target="_blank" rel="noreferrer" className="underline font-mono">
                  {item.hijackedInfo.realUrl}
                </a>
              </p>
            )}
            {item.hijackedInfo.fakeUrl && (
              <p className="flex items-center gap-1 text-red-700 dark:text-red-400">
                ❌ Website Giả mạo cần tránh: <span className="font-mono line-through">{item.hijackedInfo.fakeUrl}</span>
              </p>
            )}
            <p className="text-xs text-amber-900 dark:text-amber-200">
              {item.hijackedInfo.notes || "Kẻ xấu tạo website giả để thu phí đăng bài của tác giả. Tuyệt đối không nộp vào website giả mạo."}
            </p>
          </div>
        )}

        {/* PHẦN 2: TIÊU CHUẨN VIỆT NAM, NAFOSTED & HĐGSNN */}
        {(rep?.vietnamStandards.standardVn || rep?.vietnamStandards.nafosted || rep?.vietnamStandards.aci || (rep?.vietnamStandards.hdgsnnScores && rep.vietnamStandards.hdgsnnScores.length > 0)) && (
          <section className="space-y-1.5 pt-1">
            <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
              <Building size={14} />
              <span>🇻🇳 2. Tiêu chuẩn Việt Nam, NAFOSTED & HĐGSNN</span>
            </div>

            <div className="pl-4 border-l-2 border-indigo-400 dark:border-indigo-600 space-y-1 text-xs sm:text-sm">
              {rep?.vietnamStandards.standardVn && (
                <p>• Chuẩn khoa học VN 2026: <strong className="text-slate-900 dark:text-slate-100">{rep.vietnamStandards.standardVn}</strong></p>
              )}
              {rep?.vietnamStandards.category && (
                <p>• Phân nhóm: <span className="text-slate-800 dark:text-slate-200">{rep.vietnamStandards.category}</span></p>
              )}
              {rep?.vietnamStandards.nafosted && (
                <p>• Chuẩn Quỹ NAFOSTED: <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{rep.vietnamStandards.nafosted}</span></p>
              )}
              {rep?.vietnamStandards.aci && (
                <p>• Chỉ mục ACI (Đông Nam Á): <span className="text-amber-700 dark:text-amber-400 font-semibold">{rep.vietnamStandards.aci}</span></p>
              )}
              {rep?.vietnamStandards.hdgsnnScores && rep.vietnamStandards.hdgsnnScores.length > 0 && (
                <div className="pt-1">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">• Điểm HĐGSNN 2025 (QĐ 26/QĐ-HĐGSNN):</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {rep.vietnamStandards.hdgsnnScores.map((sc, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-mono text-xs"
                      >
                        🎯 {sc}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* PHẦN 3: XẾP HẠNG QUỐC TẾ (SCOPUS / ABDC) */}
        {(rep?.internationalRankings.scopus || rep?.internationalRankings.abdc) && (
          <section className="space-y-1.5 pt-1">
            <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400">
              <Award size={14} />
              <span>🏆 3. Xếp hạng Quốc tế (Scopus / ABDC)</span>
            </div>

            <div className="pl-4 border-l-2 border-amber-400 dark:border-amber-600 space-y-1 text-xs sm:text-sm">
              {rep?.internationalRankings.scopus && (
                <p>
                  • SCImago Scopus: <strong className="text-slate-900 dark:text-white">{rep.internationalRankings.scopus}</strong>
                </p>
              )}
              {rep?.internationalRankings.abdc && (
                <p>
                  • Phân hạng ABDC (Úc): <strong className="text-slate-900 dark:text-white">{rep.internationalRankings.abdc}</strong>
                </p>
              )}
            </div>
          </section>
        )}

        {/* PHẦN 4: KIỂM ĐỊNH LIÊM CHÍNH & RỦI RO */}
        <section className="space-y-1.5 pt-1">
          <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <ShieldCheck size={14} />
            <span>🛡️ 4. Kiểm định Liêm chính & Rủi ro</span>
          </div>

          <div className="pl-4 border-l-2 border-emerald-400 dark:border-emerald-600 space-y-1 text-xs">
            <p>• Tình trạng Scopus: <span className="font-semibold">{rep?.integrityChecks.scopusStatus || "An toàn"}</span></p>
            <p>• Web of Science: <span className="font-semibold">{rep?.integrityChecks.wosStatus || "An toàn"}</span></p>
            <p>• Tạp chí giả mạo: <span className="font-semibold">{rep?.integrityChecks.hijackedStatus || "An toàn"}</span></p>
            <p>• Danh sách Beall's List: <span className="font-semibold">{rep?.integrityChecks.beallStatus || "An toàn"}</span></p>
            <p>
              • Lịch sử rút bài (Retraction Watch):{" "}
              <strong className={item.retraction && item.retraction.count > 0 ? "text-rose-600 dark:text-rose-400" : "text-emerald-700 dark:text-emerald-400"}>
                {rep?.integrityChecks.retractionStatus || "0 bài bị rút"}
              </strong>
            </p>
          </div>
        </section>

        {/* PHẦN 5: KHUYẾN NGHỊ NỘP BÀI (VERDICT) */}
        <section className="pt-2">
          <div
            className={`p-3.5 sm:p-4 rounded-xl border flex items-start gap-3 ${
              isDanger
                ? "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900/60 text-red-900 dark:text-red-200"
                : isWarning
                ? "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60 text-amber-950 dark:text-amber-200"
                : "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60 text-emerald-950 dark:text-emerald-200"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isDanger ? (
                <AlertTriangle className="w-5 h-5 text-red-600" />
              ) : isWarning ? (
                <ShieldAlert className="w-5 h-5 text-amber-600" />
              ) : (
                <FileCheck2 className="w-5 h-5 text-emerald-600" />
              )}
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider mb-0.5">
                5. Khuyến nghị nộp bài (Verdict)
              </h4>
              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {rep?.recommendation || "Tạp chí hợp lệ, đủ điều kiện công bố nghiên cứu."}
              </p>
            </div>
          </div>
        </section>

      </div>
    </article>
  );
}
