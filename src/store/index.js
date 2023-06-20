import Vuex from "vuex";

export { createStore };

function createStore() {
  const store = Vuex.createStore({
    state: {
      user: {
        Accesslevel: "",
        name: null
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
      getName : (state) => {
        return state.user.name
      }
    },
    mutations: {
      SET_ACCESS_LEVEL(state, payload) {
        state.user.Accesslevel = payload;
      },
      SET_LIST(state, payload) {
        state.subjectList = payload;
      },
      SET_USER(state,payload){
        state.user.name = payload;
      }
    },
    actions: {
      setAccess(context, payload) {
        context.commit("SET_ACCESS_LEVEL", payload);
      },
      setList(context, payload) {
        context.commit("SET_LIST", payload);
      },
      setUser(context,payload){
        context.commit("SET_USER" , payload)
      }
    },
  });
  return store;
}
