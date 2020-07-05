import Vue from "vue";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import ru from "date-fns/locale/ru";
import { getFileNameFromPath } from "../utils";
import { FamilyStatus, Gender } from "../../constants/Enums";
Vue.filter("date", function(date) {
  if (!date) return undefined;
  return format(
    typeof date === "string" ? parseISO(date) : date,
    "dd.MM.yyyy",
    { locale: ru }
  );
});
Vue.filter("label", function(value) {
  if (value && value.label) {
    return value.label;
  }
  if (Array.isArray(value)) {
    return value.map((it) => it.label).join(", ");
  }
  return "";
});
Vue.filter("bool", function(value) {
  return typeof value === "boolean" ? (value ? "Да" : "Нет") : value;
});
Vue.filter("filename", function(path) {
  return path ? getFileNameFromPath(path) : path;
});
Vue.filter("serverPath", function(path) {
  return process.env.VUE_APP_API_URL + path;
});
Vue.filter("gender", function(value) {
  return Gender[value];
});
Vue.filter("fmStatus", function(value) {
  return FamilyStatus[value];
});
