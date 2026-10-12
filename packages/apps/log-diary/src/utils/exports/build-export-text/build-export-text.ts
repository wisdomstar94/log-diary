import type { DayTitle, Entry } from "@/types/entry";
import { formatLongDate } from "@/utils/dates/format-long-date";

export const EMPTY_EXPORT_TEXT = "내보낼 기록이 없습니다.";

/** 날짜마다 `2026년 10월 05일 월요일 · 제목` 아래에 `[HH:mm]` + 본문을 이어 붙인다 */
export function buildExportText(entries: Entry[], dayTitles: DayTitle[]) {
  if (entries.length === 0) {
    return EMPTY_EXPORT_TEXT;
  }
  const titleByDate = new Map(dayTitles.map((dayTitle) => [dayTitle.date, dayTitle.title]));
  const entriesByDate = new Map<string, Entry[]>();
  for (const entry of entries) {
    entriesByDate.set(entry.date, [...(entriesByDate.get(entry.date) ?? []), entry]);
  }

  return [...entriesByDate.entries()]
    .map(([date, dayEntries]) => {
      const title = titleByDate.get(date);
      const heading =
        (title ?? "") === "" ? formatLongDate(date) : `${formatLongDate(date)} · ${title}`;
      const body = dayEntries.map((entry) => `[${entry.time}]\n${entry.content}`).join("\n\n");
      return `${heading}\n\n${body}`;
    })
    .join("\n\n\n");
}
