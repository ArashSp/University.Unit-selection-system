<template>
  <v-locale-provider rtl>
  </v-locale-provider>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style>
@media (min-width: 600px) {
  .footersize {
    max-height: 80px;
  }
}

@media (max-width: 600px) {
  .footersize {
    max-width: auto;
  }
}
</style>