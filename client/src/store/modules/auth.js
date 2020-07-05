import authService from "../../services/authService";
import Vue from "vue";

const SET_LOGGED_IN = "SET_LOGGED_IN";
const SET_USER = "SET_USER";
const SET_AUTH_INITIALIZED = "SET_AUTH_INITIALIZED";

export const module = {
  state: () => ({
    isLoggedIn: false,
    initialized: false,
    user: null,
  }),
  actions: {
    async login({ commit }, { login, password }) {
      try {
        const token = await authService.login(login, password);
        authService.setToken(token);
        const user = await authService.getProfile();
        commit(SET_AUTH_INITIALIZED, true);
        commit(SET_LOGGED_IN, true);
        commit(SET_USER, user);
        return true;
      } catch (error) {
        if (error && error.message) {
          Vue.prototype.$notify.error({
            title: "Ошибка авторизации",
            message: error.message,
          });
        }
        commit(SET_LOGGED_IN, false);
        commit(SET_USER, null);
        return false;
      }
    },
    async getProfile({ commit }) {
      try {
        const user = await authService.getProfile();
        commit(SET_AUTH_INITIALIZED, true);
        commit(SET_LOGGED_IN, true);
        commit(SET_USER, user);
        return true;
      } catch (error) {
        authService.logOut();
        commit(SET_LOGGED_IN, false);
        commit(SET_USER, null);
        return false;
      }
    },
    async logout({ commit }) {
      authService.logOut();
      commit(SET_LOGGED_IN, false);
      commit(SET_AUTH_INITIALIZED, false);
      commit(SET_USER, null);
    },
  },
  mutations: {
    [SET_LOGGED_IN](state, loggedIn = true) {
      state.isLoggedIn = loggedIn;
    },
    [SET_USER](state, user) {
      state.user = user;
    },
    [SET_AUTH_INITIALIZED](state, initialized) {
      state.initialized = initialized;
    },
  },
};

export const AUTH_MUTATIONS = {
  SET_LOGGED_IN,
  SET_USER,
  SET_AUTH_INITIALIZED,
};
