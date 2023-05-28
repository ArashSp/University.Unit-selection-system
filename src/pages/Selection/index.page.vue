<template>
    <v-locale-provider rtl>

    </v-locale-provider>
</template>

<script>
import Swal from 'sweetalert2'
import { mapGetters } from 'vuex'
import axios from "axios";

export default {
    computed: {
        ...mapGetters({
            Accesslevel: 'getAccessLevel'
        })
    },
    async mounted() {
        if (this.Accesslevel === "") {
            Swal.fire({
                text: "برای دسترسی به این بخش وارد سامانه شوید",
                icon: "error",
                confirmButtonText: "متوجه شدم"
            })
            this.$router.push('/')
        }

        let obj = {
            request: "SelectionSubjects",
        }
        // make data into Json
        const data = JSON.stringify(obj);
        await axios
            .post("/Selection/SubjectData", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                console.log(res)
            })
    },
}
</script>