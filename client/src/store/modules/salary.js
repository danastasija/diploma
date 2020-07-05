import salaryService from "../../services/salaryService";

export const module = {
  state: () => ({
    history: [],
    loading: false,
  }),
  actions: {
    async loadHistory({ commit }, id) {
      commit("setLoading", true);
      const items = await salaryService.loadHistory(id);
      commit("setHistory", items);
      commit("setLoading", false);
    },
    async addHistoryItem({ commit }, payload) {
      const historyItem = await salaryService.addToHistory(
        payload.id,
        payload.model
      );
      commit("addHistoryItem", historyItem);
      commit("updatePersonPostion", historyItem.positions || []);
    },
  },
  mutations: {
    setHistory(state, history) {
      state.history = history;
    },
    addHistoryItem(state, historyItem) {
      state.history.unshift(historyItem);
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
};
