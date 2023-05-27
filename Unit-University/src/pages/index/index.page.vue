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
              <v-btn variant="outlined" class="bg-primary px-15 mt-5 mb-15" size="large" aria-label="تایید"
                @click="validateInfo()">
                ورود
              </v-btn></v-col>
          </v-row>
        </v-col>
      </v-row>

    </v-responsive>

  </v-locale-provider>
</template>

<script>

export default {
  data() {
    return {
      value: String,
      username: "",
      password: "",
    }
  },
  methods: {
    validateInfo() {

    }
  },
}
</script>
