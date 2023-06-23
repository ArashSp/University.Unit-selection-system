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
      SubjectListPreview: [],
    },
    getters: {
      getSubjectList: (state) => {
        return state.subjectList;
      },
      getUser: (state) => {
        return state.user;
      },
      getPreviewList: (state) => {
        return state.SubjectListPreview;
      },
      getMaxUnit: (state) => {
        if (state.user.Average >= 17 && state.user.Average <= 20) {
          return 24;
        } else if (state.user.Average < 17 && state.user.Average >= 12) {
          if (state.user.currentSemester === 4) {
            return 24;
          } else return 20;
        } else if (state.user.Average < 12) {
          if (state.user.currentSemester === 4) {
            return 24;
          } else return 11;
        }
      },
    },
    mutations: {
      SET_LIST(state, payload) {
        state.subjectList = payload;
      },
      SET_USER(state, payload) {
        state.user.Average = payload.Average;
        state.user.StudentID = payload.StudentID;
        state.user.currentSemester = payload.currentSemester;
        state.user.firstName = payload.firstName;
        state.user.lastName = payload.lastName;
        state.user.passedSubjects = payload.passedSubjects;
      },
      ADD_TO_PREVIEW_LIST(state, payload) {
        state.SubjectListPreview.push(payload);
      },
      DELETE_FROM_PREVIEW_LIST(state, payload) {
        const index = state.SubjectListPreview.indexOf(payload);
        if (index > -1) {
          state.SubjectListPreview.splice(index, 1);
        }
      },
    },
    actions: {
      setList(context, payload) {
        context.commit("SET_LIST", payload);
      },
      setUser(context, payload) {
        context.commit("SET_USER", payload);
      },
      AddToPreview(context, payload) {
        context.commit("ADD_TO_PREVIEW_LIST", payload);
      },
      DeleteFromPreview(context, payload) {
        context.commit("DELETE_FROM_PREVIEW_LIST", payload);
      },
    },
  });
  return store;
}
