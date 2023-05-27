import Vuex from "vuex";

export { createStore };

function createStore() {
  const store = Vuex.createStore({
    state: {
      user: {
        token: "",
      },
    },
    getters: {
      getToken: (state) => {
        return state.user.token;
      },
    },
    mutations: {
      SET_TOKEN(state, payload) {
        state.user.token = payload;
      },
    },
    actions: {
      setToken(context, payload) {
        context.commit("SET_TOKEN", payload);
      },
    },
  });
  return store;
}
