import Vuex from "vuex";
import Swal from "sweetalert2";
import router from "@/router";

export { createStore };

function createStore() {
  const store = Vuex.createStore({
    // all States needed for state management
    state: {
      user: {
        Average: "",
        StudentID: null,
        currentSemester: "",
        firstName: "",
        lastName: "",
        passedSubjects: [],
        StudyField: "",
        SelectedCourses: [],
      },
      subjectList: [],
      SubjectListPreview: [],
    },
    // Getter functions to send data from Store
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
    // mutations that will be called if needed
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
        state.user.StudyField = payload.StudyField;
        state.user.SelectedCourses = payload.SelectedCourses;

        state.SubjectListPreview = [];
      },
      DELETE_USER(state) {
        state.user = {
          Average: "",
          StudentID: null,
          currentSemester: "",
          firstName: "",
          lastName: "",
          passedSubjects: [],
          StudyField: "",
          SelectedCourses: [],
        };
      },
      ADD_TO_PREVIEW_LIST(state, payload) {
        let index = state.SubjectListPreview.indexOf(payload);
        if (index > -1) {
        } else {
          state.SubjectListPreview.push(payload);
        }
      },
      DELETE_FROM_PREVIEW_LIST(state, payload) {
        let temp = state.SubjectListPreview.filter((x) => x.id === payload.id);
        if (temp.length > 0) {
          temp.forEach((element) => {
            let idx = state.SubjectListPreview.indexOf(element);
            console.log(idx);
            if (idx > -1) {
              state.SubjectListPreview.splice(idx, 1);
            }
          });
        }
      },
      DELETE_ALL_PREVIEW_LIST(state) {
        state.SubjectListPreview = [];
      },
      CHECK_CONFLICT(state) {
        state.SubjectListPreview.forEach((element) => {
          let list = state.SubjectListPreview.filter(
            (x) => x.dayID === element.dayID
          );
          if (list.length > 1) {
            list.forEach((element) => {
              let list2 = list.filter(
                (x) => x.ClassStartTime === element.ClassStartTime
              );

              if (list2.length > 1) {
                let title = "کلاس درس های ";
                for (let i = 0; i < list2.length; i++) {
                  title += list2[i].name + " و ";
                }
                title = title.slice(0, -2);
                title +=
                  "در ساعت شروع" + list2[0].ClassStartTime + " تداخل دارند";

                Swal.fire({
                  text: title,
                  icon: "error",
                  confirmButtonText: "متوجه شدم",
                });
              } else {
                router.push("/Preview");
              }
            });
          } else {
            router.push("/Preview");
          }
        });
      },
    },
    // actions that will be called by our components
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
      ResetPreviewList(context) {
        context.commit("DELETE_ALL_PREVIEW_LIST");
      },
      CheckPreview(context) {
        context.commit("CHECK_CONFLICT");
      },
      logout(context) {
        context.commit("DELETE_USER");
      },
    },
  });
  return store;
}
