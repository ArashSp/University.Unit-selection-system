import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      phoneNumber: "",
      userData: "",

      transportationTypes: ["سواری", "وانت", "موتورسیکلت"],
      cities: ["تهران", "کرج", "شیراز"],

      stepNum: 1,
      imagesData: [],
      userInfo: {
        firstName: "",
        lastName: "",
        sex: "مرد",
        idCode: "",
        hasReferralCode: false,
        referralCode: "",
        transportationType: "سواری",
        city: "تهران",
        /// this field is opposite
        noInsurancePic: true,
        yektaInsuranceCode: "",
        yektaInsuranceOwnerIdCode: "",
        vehicleName: "",
        vehiclePlateFirstNumbers: null,
        vehiclePlateLetter: "ب",
        vehiclePlateLastNumbers: null,
        vehiclePlateCode: null,
        vehicleColor: "",
      },

      formProgress: 0,
      uploadProgress: 0,

      isDone: false,
    };
  },
  getters: {
    getPhoneNumber: (state) => {
      return state.phoneNumber;
    },
    getImagesData: (state) => {
      return state.imagesData;
    },
    getStepNum: (state) => {
      return state.stepNum;
    },
    getImagesData: (state) => {
      return state.imagesData;
    },
    getFormProgress: (sate) => {
      return state.formProgress;
    },
    getNoInsurance: (state) => {
      return state.userInfo.noInsurancePic;
    },
  },
  mutations: {
    changePhone(state, payload) {
      state.phoneNumber = payload;
    },
    setUserData(state, payload) {
      state.userData = payload;
    },
    setPhoneNumber(state, payload) {
      state.phoneNumber = payload;
    },
    setImagesData(state, payload) {
      state.imagesData = payload;
    },
    addImagesData(state, payload) {
      const objIndex = state.imagesData.findIndex(
        (x) => x.stepNum == payload.stepNum
      );
      if (objIndex >= 0) {
        state.imagesData.splice(objIndex, 1);
      }
      state.imagesData.push(payload);
    },
    removeInsurancePic(state) {
      const objIndex = state.imagesData.findIndex((x) => x.stepNum === 6);
      if (objIndex >= 0) {
        state.imagesData.splice(objIndex, 1);
      }
    },
    setStepNum(state, payload) {
      state.stepNum = payload;
    },
    increaseStepNum(state) {
      state.stepNum = state.stepNum + 1;
    },
    descreaseStepNum(state) {
      state.stepNum = state.stepNum - 1;
    },
    setFormProgress(state, payload) {
      state.formProgress = payload;
    },
    setIsDone(state, payload) {
      state.isDone = payload;
    },
  },
  actions: {
    changePhonenumber(context, payload) {
      context.commit("changePhone", payload);
    },
    logOff({ state }) {
      state.phoneNumber = "";
      state.userData = "";
    },
  },
});