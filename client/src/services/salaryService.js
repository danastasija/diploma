import Axios from "axios";
import { safeParseDate } from "../shared/utils";
function mapDates(person) {
  person.employmentDate = safeParseDate(person.employmentDate);
  person.dob = safeParseDate(person.dob);
  return person;
}
export default {
  async loadHistory(id) {
    try {
      const res = await Axios.get(`/salary/${id}`);
      return res.data.map(mapDates);
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  async addToHistory(id, model) {
    const res = await Axios.post(`/salary/${id}`, model);
    return mapDates(res.data);
  },
  async saveSalaryFile(userId, file) {
    const data = new FormData();
    data.set("file", file);
    data.set("userId", userId);
    return Axios.post(`/upload/salary`, data).then((res) => res.data);
  },
};
