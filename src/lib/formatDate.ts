import { format, isToday, isTomorrow } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const BANGKOK_TIMEZONE = "Asia/Bangkok"; // UTC+7

export function formatDate(dateString: string): string {
  const utcDate = new Date(dateString);
  const bangkokDate = toZonedTime(utcDate, BANGKOK_TIMEZONE);

  if (isToday(bangkokDate)) {
    return "today";
  }
  if (isTomorrow(bangkokDate)) {
    return "tomorrow";
  }
  return format(bangkokDate, "dd/MM/yyyy");
}