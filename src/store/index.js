import Vuex from "vuex";

export { createStore };

function createStore() {
  const store = Vuex.createStore({
    state: {
      user: {
        Accesslevel: "",
      },
    },
    getters: {
      getAccessLevel: (state) => {
        return state.user.Accesslevel;
      },
    },
    mutations: {
      SET_ACCESS_LEVEL(state, payload) {
        state.user.Accesslevel = payload;
      },
    },
    actions: {
      setAccess(context, payload) {
        context.commit("SET_ACCESS_LEVEL", payload);
      },
    },
  });
  return store;
}
