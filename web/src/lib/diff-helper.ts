/**
 * Tiện ích So sánh Văn bản Trực quan (Visual Diff Engine)
 * Thuật toán so sánh cấp độ từ (Word-level LCS) tương tự Wikidiff2 của Wikipedia
 */

export interface DiffSegment {
  type: "added" | "removed" | "unchanged";
  value: string;
}

/**
 * Tách văn bản thành các từ và khoảng trắng
 */
function tokenize(text: string): string[] {
  if (!text) return [];
  // Tách theo từ hoặc dấu câu, giữ lại khoảng trắng
  return text.match(/[\w\d\u00C0-\u1EF9]+|[^\w\d\u00C0-\u1EF9\s]+|\s+/g) || [];
}

/**
 * Tính toán Longest Common Subsequence (LCS) giữa 2 mảng token
 */
export function computeWordDiff(originalText: string = "", proposedText: string = ""): DiffSegment[] {
  const origTokens = tokenize(originalText);
  const propTokens = tokenize(proposedText);

  const n = origTokens.length;
  const m = propTokens.length;

  if (n === 0 && m === 0) return [];
  if (n === 0) return [{ type: "added", value: proposedText }];
  if (m === 0) return [{ type: "removed", value: originalText }];

  // Ma trận DP cho LCS
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (origTokens[i - 1] === propTokens[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Truy vết ngược để xây dựng các đoạn Diff
  const segments: DiffSegment[] = [];
  let i = n;
  let j = m;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && origTokens[i - 1] === propTokens[j - 1]) {
      segments.unshift({ type: "unchanged", value: origTokens[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      segments.unshift({ type: "added", value: propTokens[j - 1] });
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
      segments.unshift({ type: "removed", value: origTokens[i - 1] });
      i--;
    }
  }

  // Gộp các đoạn liên tiếp cùng loại để tối ưu hiển thị
  const merged: DiffSegment[] = [];
  for (const seg of segments) {
    if (merged.length > 0 && merged[merged.length - 1].type === seg.type) {
      merged[merged.length - 1].value += seg.value;
    } else {
      merged.push({ ...seg });
    }
  }

  return merged;
}
