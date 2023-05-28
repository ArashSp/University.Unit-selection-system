<template>
    <v-locale-provider rtl>

    </v-locale-provider>
</template>

<script>
import Swal from 'sweetalert2'
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            Accesslevel: 'getAccessLevel'
        })
    },
    mounted() {

        if (this.Accesslevel === "") {
            Swal.fire({
                text: "برای دسترسی به این بخش وارد سامانه شوید",
                icon: "error",
                confirmButtonText: "متوجه شدم"
            })
            this.$router.push('/')
        }
    },
}
</script>