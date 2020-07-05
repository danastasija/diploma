import personService from "../../services/personService";

export const module = {
  state: () => ({
    searchText: "",
    items: [],
    archive: [],
    person: {},
    loadingPerson: false,
  }),
  actions: {
    async loadPersons({ commit, state }) {
      const items = await personService.all(state.searchText);
      commit("setItems", items);
    },
    async loadArchive({ commit, state }) {
      const items = await personService.all(state.searchText, true);
      commit("setArchive", items);
    },
    async loadPerson({ commit }, personId) {
      commit("setLoadingPerson", true);
      const person = await personService.get(personId);
      commit("setPerson", person);
      commit("setLoadingPerson", false);
    },
    async savePerson({ commit }, payload) {
      const person = await personService.save(payload);
      commit("setPerson", person);
      return person;
    },
    async saveAvatar({ commit }, payload) {
      const filename = await personService.saveAvatar(payload.id, payload.file);
      commit("updateAvatarPath", filename);
      return filename;
    },
    async saveAdaptationFiles(context, payload) {
      const files = await personService.saveAdaptationFiles(
        payload.id,
        payload.files,
        payload.summary
      );
      return files;
    },
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    setArchive(state, archive) {
      state.archive = archive;
    },
    deleteFromArchive(state, id) {
      state.archive = state.archive.filter((ar) => ar.id != id);
    },
    setPerson(state, person) {
      state.person = person;
    },
    updatePerson(state, partialPerson) {
      Object.assign(state.person, partialPerson);
    },
    updatePersonPostion(state, positions) {
      state.person.positions = positions;
    },
    setLoadingPerson(state, loading = false) {
      state.loadingPerson = loading;
    },
    setSearchText(state, searchText) {
      state.searchText = searchText;
    },
    updateAvatarPath(state, path) {
      state.person.avatar = path;
    },
    updateAdaptationFiles(state, files) {
      state.person.adaptationFiles.push(...files);
    },
  },
};
