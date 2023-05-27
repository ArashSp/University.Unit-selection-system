<template>
    <v-app>
        <mainheader />
        <v-main class="mt-1 mt-md-7">
            <router-view :key="$route.fullPath"></router-view>
        </v-main>
    </v-app>
</template>
  
<script>
import mainheader from './layouts/default/AppBar.vue'
import mainFooter from './layouts/default/Footer.vue'
export default {
    components: { mainheader },
};
</script>
  
<style>
.main-container {
    margin: 0 auto;
    padding: 0 auto;
}
</style>