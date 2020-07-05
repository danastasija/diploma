import Axios from "axios";

export default {
  async all(searchText, archive) {
    const query = { searchText: searchText };
    if (archive) {
      query.archived = true;
    }
    try {
      const res = await Axios.get("/users", {
        params: query,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  async create(model) {
    return Axios.post("/users", model).then((res) => res.data);
  },
  async update(model) {
    return Axios.put("/users", model).then((res) => res.data);
  },
  async changePassword(model) {
    return Axios.put("/users/changePassword", model);
  },
  async remove(id) {
    return Axios.delete(`/users/${id}`);
  },
};
