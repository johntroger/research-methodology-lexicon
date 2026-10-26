/**
 * Trình hỗ trợ phát âm âm thanh học thuật bằng Web Speech API
 * 100% Client-side, 0đ chi phí lưu trữ, chất lượng âm thanh bản xứ
 */

export function speakAcademicTerm(
  termText: string,
  lang: "en-US" | "en-GB" = "en-US",
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("Trình duyệt không hỗ trợ Web Speech API");
    return false;
  }

  try {
    // Dừng câu nói trước nếu đang phát
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(termText);
    utterance.lang = lang;
    utterance.rate = 0.9; // Tốc độ đọc chậm hơn một chút để phát âm rõ từng âm tiết học thuật
    utterance.pitch = 1.0;

    // Tìm giọng đọc tự nhiên nếu có
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) => v.lang.startsWith(lang.slice(0, 2)) && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Samantha"))
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      if (onEnd) onEnd();
      if (onError) onError(e);
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.error("Lỗi khi phát âm:", err);
    if (onError) onError(err);
    return false;
  }
}
