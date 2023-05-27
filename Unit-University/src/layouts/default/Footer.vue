<template>
    <v-locale-provider rtl>
      <v-footer class="bg-black d-flex flex-column footersize">
        <div class="d-none d-md-inline d-lg-inline">
          <div class="d-flex align-center justify-center w-100 mt-5">
            <p
              class="text-h4 mx-10"
              style="color: #ec407a"
              @click="$router.push({ name: 'Home' })"
            >
              در اختیار
            </p>
            <v-btn variant="text" v-for="item in navs">{{ item.name }}</v-btn>
          </div>
          <div class="d-flex mt-8 mb-4 align-center justify-center w-100">
            <p class="mx-10 text-caption">
              کپی رایت تمامی حقوق مادی و معنوی این سرویس (وب سایت و اپلیکیشن های
              موبایل) متعلق به ایده گزین ارتباطات روماک (دراختیار) است.
            </p>
            <p class="mr-16 text-caption">Copyright</p>
            <v-icon icon="mdi-copyright" class="text-caption"></v-icon>
          </div>
        </div>
        <div class="d-md-none d-lg-none">
          <v-row justify="center">
            <v-col cols="12" class="text-center">
              <p
                class="text-h4 mx-8 mt-6"
                style="color: #ec407a"
                @click="$router.push({ name: 'Home' })"
              >
                ثبت نام دانشجویان
              </p>
            </v-col>
            <v-col cols="6" v-for="item in navs" class="text-center">
              <v-btn size="x-small" variant="text" class="text-button">{{
                item.name
              }}</v-btn>
            </v-col>
            <v-col cols="12" class="text-center">
              <v-divider></v-divider>
              <p class="text-caption mt-4">
                کپی رایت تمامی حقوق مادی و معنوی این سرویس (وب سایت و اپلیکیشن های
                موبایل) متعلق به ایده گزین ارتباطات روماک (دراختیار) است.
              </p>
              <p class="text-caption mt-2">
                Copyright
                <v-icon icon="mdi-copyright" class="text-caption"></v-icon>
              </p>
            </v-col>
          </v-row>
        </div>
      </v-footer>
    </v-locale-provider>
  </template>
  <script>
  export default {
    data() {
      return {
        navs: [
          {
            name: "  دریافت دراختیار",
          },
          {
            name: " فرصت های سرمایه گذاری",
          },
          {
            name: " فرصت های شغلی ",
          },
          {
            name: " حریم خصوصی",
          },
          {
            name: " تماس با ما",
          },
          {
            name: " سوالات متداول",
          },
        ],
      };
    },
  };
  </script>
  <style>
  @media (min-width: 600px) {
    .footersize {
      max-height: 150px;
    }
  }
  
  @media (max-width: 600px) {
  }
  </style>