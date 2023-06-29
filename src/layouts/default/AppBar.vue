<template>
  <v-locale-provider rtl>
    <v-app-bar class="py-2 font">
      <v-toolbar class="bg-white py-2">       
        <v-toolbar-title>
         سامانه انتخاب واحد دانشجویان
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <span v-if="user.StudentID !== null" class=" mx-5">
          <v-chip class="mx-2 mt-2" color="primary" variant="text">
            {{ user.firstName }} {{  user.lastName }}
            <v-icon end icon="mdi-account-outline"></v-icon>
          </v-chip>
        </span>
      </v-toolbar>
    </v-app-bar>
  </v-locale-provider>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      drawer: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
}
</script>
<style scoped>
.font {
  font-family: iransans !important;
}
</style>