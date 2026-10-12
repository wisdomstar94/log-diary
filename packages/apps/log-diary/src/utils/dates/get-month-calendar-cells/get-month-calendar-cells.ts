import { toDateKey } from "@/utils/dates/to-date-key";

export type CalendarCell = {
  dateKey: string;
  day: number;
  weekday: number;
  isCurrentMonth: boolean;
};

/** 일요일 시작 달력. 앞뒤 달 날짜로 주 단위를 채운다. month 는 0 부터 시작 */
export function getMonthCalendarCells(year: number, month: number) {
  const firstWeekday = new Date(year, month, 1).getDay();
  const dayCount = new Date(year, month + 1, 0).getDate();
  const rowCount = Math.ceil((firstWeekday + dayCount) / 7);

  return Array.from({ length: rowCount * 7 }, (_, index): CalendarCell => {
    const date = new Date(year, month, 1 - firstWeekday + index);
    return {
      dateKey: toDateKey(date),
      day: date.getDate(),
      weekday: date.getDay(),
      isCurrentMonth: date.getMonth() === month,
    };
  });
}
