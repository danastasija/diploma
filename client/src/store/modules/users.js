import userService from "../../services/userService";

export const module = {
  namespaced: true,
  state: () => ({
    searchText: "",
    items: [],
  }),
  actions: {
    async loadUsers({ commit, state }) {
      const items = await userService.all(state.searchText);
      commit("setItems", items);
    },
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    setSearchText(state, searchText) {
      state.searchText = searchText;
    },
  },
};
