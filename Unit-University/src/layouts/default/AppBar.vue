<template>
  <v-locale-provider rtl>
    <v-app-bar class="py-2 font">
      <v-toolbar class="bg-white py-2">
        <v-app-bar-nav-icon class="d-md-none d-lg-none" @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title @click="$router.push('/')">
          انتخاب واحد دانشجویان
        </v-toolbar-title>
        <v-toolbar-items v-for="item in navs" class=" d-none d-md-flex d-lg-flex">
          <v-btn variant="text" block v-if="item.mobile === false" @click="$router.push(item.RouteName)">{{ item.name
          }}</v-btn>
          <v-divider vertical v-if="item.divider === true"></v-divider>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      </v-toolbar>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" location="right" class="d-md-none d-lg-none">
      <v-list v-for="item in navs" class="mt-6">
        <v-list-item>
          <v-btn variant="text" block v-if="item.mobile === false" @click="$router.push(item.RouteName)">{{ item.name
          }}</v-btn>
          <v-btn variant="outlined" class="d-md-none d-lg-none" block v-if="item.mobile === true">{{ item.name }}</v-btn>
        </v-list-item>
        <v-divider v-if="item.divider === true"></v-divider>
      </v-list>
    </v-navigation-drawer>
  </v-locale-provider>
</template>

<script>
export default {
  data() {
    return {
      navs: [
        {
          name: "انتخاب واحد",
          divider: false,
          mobile: false,
          RouteName: "/Selection",
        },
        {
          name: "درباره ما",
          divider: false,
          mobile: false,
          RouteName: "/",
        },
        {
          name: " پشتیبانی ",
          divider: false,
          mobile: false,
          RouteName: "/",
        },
      ],
      drawer: false
    }
  }
}
</script>
<style scoped>
.font {
  font-family: iransans !important;
}
</style>