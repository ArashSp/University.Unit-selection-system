<template>
  <v-app>
    <default-bar />

    <default-view />

    <DefaultFooter />
  </v-app>
</template>

<script setup>
import DefaultFooter from './Footer.vue';
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
</script>
