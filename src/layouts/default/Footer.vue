<template>
  <v-locale-provider rtl>
    <v-footer class="bg-black d-flex flex-column footersize">
      <div>
        <div class="d-flex mt-5 mb-4 align-center justify-center w-100">
          <p class="px-3 text-caption">
            تمامی حقوق مادی و معنوی این وبسایت متعلق به شخص آرش سپاهی می باشد
          </p>
          <p class="text-caption">Copyright</p>
          <v-icon icon="mdi-copyright" class="text-caption"></v-icon>
        </div>
      </div>
    </v-footer>
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
    max-height: 100px;
  }
}
</style>