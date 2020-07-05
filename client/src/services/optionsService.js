import Axios from "axios";
export default {
  async getMentors(searchText) {
    try {
      const res = await Axios.get("/options/autocomplete", {
        params: { type: "mentor", searchText },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  async getCauses() {
    return (await Axios.get("/options/cause")).data;
  },
  async getSkills() {
    return (await Axios.get("/options/skill")).data;
  },
  async getStatus() {
    return (await Axios.get("/options/status")).data;
  },
  async getPositions() {
    return (await Axios.get("/options/position")).data;
  },
  async getUserRoles() {
    return (await Axios.get("/options/user_role")).data;
  },
};
