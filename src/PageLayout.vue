<template>
    <v-app>
        <mainheader style="max-width: 100% !important;" />
        <v-main class="mt-1 mt-md-7" style="max-width: 100%  !important;">
            <router-view :key="$route.fullPath"></router-view>
        </v-main>

    </v-app>
</template>
  
<script>
import mainheader from './layouts/default/AppBar.vue'
export default {
    components: { mainheader, },
};
</script>
  
<style>
.main-container {
    margin: 0 auto;
    padding: 0 auto;
}
</style>