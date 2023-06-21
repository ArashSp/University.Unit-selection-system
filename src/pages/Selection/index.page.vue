<template>
    <v-locale-provider rtl>
        <div>
            <v-row class="mt-15 mx-15" justify="right" align="center">
                <v-col cols="12" lg="4" xl="4 " md="4" sm="3">
                    <v-select label="روز کلاس" :items="days"  variant="outlined"></v-select>
                </v-col>
                <v-col cols="12" lg="3" xl="3 " md="3" sm="4">
                    <v-select label=" نام استاد" :items="teacherList"  variant="outlined"></v-select>
                </v-col>
                <v-col cols="12" lg="2" xl="2 " md="2" sm="2">
                    <v-select label=" تعداد واحد" :items="unitOptions"  variant="outlined"></v-select>
                </v-col>
                <v-col cols="12" lg="2" xl="2 " md="2" sm="3">
                    <v-btn prepend-icon="" class="mb-5 px-3" variant="tonal" block color="primary " size="large">
                        جست و جو
                    </v-btn>
                </v-col>
            </v-row>
        </div>
        <div>
            <v-row class="mt-15" justify="center" align="center">
                <v-col cols="10">
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
            user: 'getUser'
        })
    },
    async mounted() {
        if (this.user.StudentID === null) {
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
                res.data.subjectList.forEach(element => {
                    this.teacherList.push(element.teacherName)
                });
            })
    },
    components: {
        SelectionList
    },
    data() {
        return {
            days: [
                "شنبه ",
                " یکشنبه ",
                "دوشنبه ",
                "سه شنبه ",
                "چهارشنبه ",
                " پنج شنبه ",
                "جمعه ",
            ],
            teacherList: [],
            unitOptions: [1, 2, 3],
        }
    },
}
</script>