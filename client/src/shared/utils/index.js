import parseISO from "date-fns/parseISO";
export function getFileNameFromPath(path) {
  return path.substring(path.lastIndexOf("/") + 1);
}
export function safeParseDate(date) {
  date && typeof date === "string" && parseISO(date);
}
