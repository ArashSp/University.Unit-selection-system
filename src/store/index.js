import Vuex from "vuex";

export { createStore };

function createStore() {
  const store = Vuex.createStore({
    state: {
      user: {
        Average: "",
        StudentID: null,
        currentSemester: "",
        firstName: "",
        lastName: "",
        passedSubjects: [],
      },
      subjectList: [],
    },
    getters: {
      getSubjectList: (state) => {
        return state.subjectList;
      },
      getUser: (state) => {
        return state.user;
      },
    },
    mutations: {
      SET_LIST(state, payload) {
        state.subjectList = payload;
      },
      SET_USER(state, payload) {
        console.log(payload);
        state.user.Average = payload.Average;
        state.user.StudentID = payload.StudentID;
        state.user.currentSemester = payload.currentSemester;
        state.user.firstName = payload.firstName;
        state.user.lastName = payload.lastName;
        state.user.passedSubjects = payload.passedSubjects;
      },
    },
    actions: {
      setList(context, payload) {
        context.commit("SET_LIST", payload);
      },
      setUser(context, payload) {
        context.commit("SET_USER", payload);
      },
    },
  });
  return store;
}
