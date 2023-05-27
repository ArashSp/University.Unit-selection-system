import Vuex from "vuex";

export { createStore };

function createStore() {
  const store = Vuex.createStore({
    state: {
      user: {
        phoneNumber: "",
      },
    },
    getters: {
      getPhone: (state) => {
        return state.user.phoneNumber;
      },
    },
    mutations: {
      changePhone(state, payload) {
        state.user.phoneNumber = payload;
      },
    },
    actions: {
      changePhonenumber(context, payload) {
        context.commit("changePhone", payload);
      },
    },
  });
  return store;
}