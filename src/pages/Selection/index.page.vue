<template>
    <v-locale-provider rtl>
        <div>
            <v-row class="mt-15" justify="center" align="center">
                <v-col xs="12" sm="5" lg="5" xl="5" md="5">
                    <SelectionList />
                </v-col>
                <v-col xs="12" sm="5" lg="5" xl="5" md="5">
                    <SelectionList />
                </v-col>
            </v-row>
        </div>

    </v-locale-provider>
</template>

<script>
import Swal from 'sweetalert2'
import { mapGetters } from 'vuex'
import axios from "axios";
import SelectionList from '@/components/Selection/SelectionList.vue';

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
                this.$store.dispatch('setList', res.data.subjectList)
            })
    },
    components: {
        SelectionList
    }
}
</script>