<template>
    <v-app>
        <mainheader />
        <v-main >
            <router-view></router-view>
        </v-main>
        <mainFooter />
    </v-app>
</template>
  
<script>
import mainheader from './layouts/default/AppBar.vue'
import mainFooter from './layouts/default/Footer.vue'
export default {
    components: { mainheader, mainFooter },
    mounted() {
    },
};
</script>
  
<style scoped>
.main-container {
    margin: 0 auto;
    padding: 0 auto;
}


</style>