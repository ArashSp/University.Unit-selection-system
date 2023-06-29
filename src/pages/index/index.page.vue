<template>
  <div class="bgHome" style="height: 100%;" >
  <!-- this tag allows me to change the direction to "Right to left" -->
  <v-locale-provider rtl class="bgHome">
      <v-responsive class="text-center align-center fill-height ">
        <v-row justify="center">
          <v-col cols="10" md="4" lg="4" xl="4" ms="4">
            <v-card class="bg-white rounded-xl">
              <v-row justify="center" class="mx-3" algin="center">
                <v-col cols="10" class="text-center align-center">
                  <v-row justify="center" class="mt-5">
                    <v-col cols="10" md="6" xl="6" lg="6" >
                      <v-img aspect-ratio="16/9" width="200" cover src="../../../public/logo.png"></v-img>
                    </v-col>
                  </v-row>

                </v-col>
                <v-col cols="10" class="text-center mt-3">

                  <p class="mb-7 text-md-h5">
                    لطفا برای انتخاب واحد وارد سامانه شوید.
                  </p>
                  <v-text-field v-model="username" variant="outlined" type="text" label=" نام کاربری"
                    class="mx-lg-5 lefted-input"></v-text-field>

                  <v-text-field name="password" v-model="password" variant="outlined" label="رمز عبور"
                    :append-inner-icon="value ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="() => (value = !value)"
                    :type="value ? 'password' : 'text'" class="mx-lg-5 lefted-input"></v-text-field>

                  <v-row>
                    <v-col cols="12 text-center mb-15">
                      <v-btn variant="outlined" class="bg-primary px-15 mt-5 " size="large" aria-label="تایید"
                        @click="validateInfo()" :disabled="username == '' || password == ''">
                        ورود
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-responsive>

  </v-locale-provider>
</div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      value: String,
      username: "",
      password: "",
    }
  },
  methods: {
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
              this.$store.dispatch("setUser", res.data.data)
              console.log(res.data.data)
              this.$router.push('/Selection')
            }
            else {
              Swal.fire({
                text: res.data.data.errorMessage,
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
<style scoped>
.bgHome {
  background-image: url(../../../public/university.png) !important;
  background-size: inherit !important;
  background-position: center center !important;

}
</style>