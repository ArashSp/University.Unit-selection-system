import Vuex from "vuex";

export { createStore };

function createStore() {
  const store = Vuex.createStore({
    state: {
      user: {
        Accesslevel: "",
      },
      subjectList: [],
    },
    getters: {
      getAccessLevel: (state) => {
        return state.user.Accesslevel;
      },
      getSubjectList: (state) => {
        return state.subjectList;
      },
    },
    mutations: {
      SET_ACCESS_LEVEL(state, payload) {
        state.user.Accesslevel = payload;
      },
      SET_LIST(state, payload) {
        state.subjectList = payload;
      },
    },
    actions: {
      setAccess(context, payload) {
        context.commit("SET_ACCESS_LEVEL", payload);
      },
      setList(context, payload) {
        context.commit("SET_LIST", payload);
      },
    },
  });
  return store;
}
