<template>
  <v-locale-provider rtl>

    <v-responsive class="text-center align-center fill-height">
      <v-row justify="center" class="mx-3">
        <v-col cols="12" md="4" class="text-md-center">
          <p class="mb-7">
            لطفا برای انتخاب واحد وارد سامانه شوید.
          </p>
          <v-text-field v-model="username" variant="outlined" type="text" label=" نام کاربری"
            class="mx-lg-5 lefted-input"></v-text-field>

          <v-text-field name="password" v-model="password" variant="outlined" label="رمز عبور"
            :append-inner-icon="value ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="() => (value = !value)"
            :type="value ? 'password' : 'text'" class="mx-lg-5 lefted-input"></v-text-field>

          <v-row>
            <v-col cols="12 text-center">
              <v-btn variant="outlined" class="bg-primary px-15 mt-5 " size="large" aria-label="تایید"
                @click="validateInfo()" :disabled="username == '' || password == ''">
                ورود
              </v-btn>
            </v-col>
            <v-col cols="12 text-center">
              <v-btn variant="text" class="my-5 text-secondary text-body-2" @click="ForgetPass()">
                نام کاربری یا رمز عبور خود را فراموش کردید؟
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

    </v-responsive>

  </v-locale-provider>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2'
import { mapActions } from "vuex";

export default {
  data() {
    return {
      value: String,
      username: "",
      password: "",
    }
  },
  methods: {
    ...mapActions({

    }),
    async validateInfo() {
      // make data object
      let obj = {
        username: this.username,
        password: this.password
      }
      // make data into Json
      const data = JSON.stringify(obj);
      // send json to server
      await axios
        .post("/Account/Validate", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            if (res.data.success === true) {
              Swal.fire({
                text: "شما با موفقیت وارد سامانه شدید",
                icon: "success",
                confirmButtonText: "باشه"
              })
              this.$store.dispatch("setUser", res.data)
              
              this.$router.push('/Selection')
            }
            else {
              Swal.fire({
                text: res.data.errorMessage,
                icon: "error",
                confirmButtonText: "باشه"
              })
            }
          }
        });
    },
    ForgetPass() {
      Swal.fire({
        text: "درخواست شما به پشتیبانی ارسال شد",
        icon: "success",
        confirmButtonText: "ممنون"
      })
    }
  },
}
</script>
