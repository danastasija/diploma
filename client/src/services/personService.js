import Axios from "axios";
import parseISO from "date-fns/parseISO";
export default {
  async all(searchText, archive) {
    const query = { searchText: searchText };
    if (archive) {
      query.archived = true;
    }
    try {
      const res = await Axios.get("/persons", {
        params: query,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  async get(id) {
    return this.mapDates((await Axios.get(`/persons/${id}`)).data);
  },
  async save(person) {
    return this.mapDates((await Axios.post("/persons", person)).data);
  },
  mapDates(person) {
    person.employmentDate =
      person.employmentDate &&
      typeof person.employmentDate == "string" &&
      parseISO(person.employmentDate);
    person.dob =
      person.dob && typeof person.dob == "string" && parseISO(person.dob);
    return person;
  },
  async saveAvatar(id, file) {
    const data = new FormData();
    data.set("id", id);
    data.set("avatar", file);
    return await Axios.post(`/upload/profilepic`, data).then((r) => r.data);
  },
  async saveAdaptationFiles(id, files, summary) {
    const data = new FormData();
    data.set("userId", id);
    for (const file of files) {
      data.append("adaptation", file);
    }
    if (summary) {
      data.set("summary", summary);
    }
    return await Axios.post("/upload/adaptationFiles", data).then(
      (r) => r.data
    );
  },
  async saveDismissalFile(userId, file) {
    const data = new FormData();
    data.set("userId", userId);
    data.set("file", file);
    return await Axios.post("/upload/dismissal", data).then((r) => r.data);
  },
  async archive(id) {
    await Axios.put(`/persons/${id}/archive`);
  },
  async recover(id) {
    await Axios.put(`/persons/${id}/recover`);
  },
};
