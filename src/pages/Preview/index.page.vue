<template>
    <v-locale-provider rtl>
        <div>
            <v-row class="mt-15 mb-6" align="center" justify="center">
                <v-col cols="10">
                    <v-card variant="outlined">
                        <v-card-text>
                            <v-table fixed-header>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th class="text-center px-4" v-for="item in classHours">
                                            {{ item }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="text-center" v-for="day in days">
                                        <td>
                                            {{ day.dayName }}
                                        </td>
                                        <td>{{ day.subjectsoftheday[0] }}</td>
                                        <td>{{ day.subjectsoftheday[1] }}</td>
                                        <td>{{ day.subjectsoftheday[2] }}</td>
                                        <td>{{ day.subjectsoftheday[3] }}</td>
                                        <td>{{ day.subjectsoftheday[4] }}</td>
                                        <td>{{ day.subjectsoftheday[5] }}</td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row align="center " justify="center">
                <v-col v-if="alreadySelected === false" cols="10 " xl="4" lg="4" md="4" sm="10" xs="10">
                    <v-btn class="py-7 mb-6" block variant="outlined" rounded="lg" size="large" color="grey-darken-1"
                        @click="edit()">ویرایش</v-btn>
                </v-col>
                <v-col v-if="alreadySelected === false" cols="10 " xl="4" lg="4" md="4" sm="10" xs="10">
                    <v-btn class="py-7 mb-6" block variant="outlined" rounded="lg" size="large" color="primary"
                        @click="submit()">ثبت نهایی</v-btn>
                </v-col>
                <v-col v-if="alreadySelected === true" cols="10 " xl="4" lg="4" md="4" sm="10" xs="10">
                    <v-btn class="py-7 mb-6" block variant="outlined" rounded="lg" size="large" color="primary"
                        @click="logout()">بازگشت به
                        صفحه ورود </v-btn>
                </v-col>
            </v-row>
        </div>
    </v-locale-provider>
</template>
<script>
import Swal from 'sweetalert2'
import { mapGetters } from 'vuex'
import axios from "axios";

export default {
    data() {
        return {
            classHours: [
                "8 - 9:30",
                "9:30 - 11",
                "12:30 - 14",
                "14 - 15:30",
                "15:30 - 17",
                "17 - 18:30",
            ],
            days: [
                {
                    dayId: 1,
                    dayName: "شنبه ",
                    subjectsoftheday: ["", "", "", "", "", ""],
                },
                {
                    dayId: 2,
                    dayName: "یکشنبه ",
                    subjectsoftheday: ["", "", "", "", "", ""],
                },
                {
                    dayId: 3,
                    dayName: "دوشنبه ",
                    subjectsoftheday: ["", "", "", "", "", ""],
                },
                {
                    dayId: 4,
                    dayName: "سه شنبه ",
                    subjectsoftheday: ["", "", "", "", "", ""],
                },
                {
                    dayId: 5,
                    dayName: "چهارشتبه ",
                    subjectsoftheday: ["", "", "", "", "", ""],
                },
                {
                    dayId: 6,
                    dayName: "پنج شنبه ",
                    subjectsoftheday: ["", "", "", "", "", ""],
                },
                {
                    dayId: 7,
                    dayName: "جمعه ",
                    subjectsoftheday: ["", "", "", "", "", ""],
                },

            ],
            dataList: [],
            alreadySelected: false
        }
    },
    mounted() {
        if (this.user.StudentID === null) {
            Swal.fire({
                text: "برای دسترسی به این بخش وارد سامانه شوید",
                icon: "error",
                confirmButtonText: "متوجه شدم"
            })
            this.$router.push('/')
        }
        if (this.user.SelectedCourses.length > 0) {
            this.alreadySelected = true
            this.sortDays(this.user.SelectedCourses)
        }
        else {
            this.alreadySelected = false
            this.sortDays(this.previewlist)
        }
    },
    computed: {
        ...mapGetters({
            user: 'getUser',
            previewlist: 'getPreviewList'
        })
    },
    methods: {
        sortDays(array) {
            for (let i = 0; i < 7; i++) {
                let list = array.filter(x => x.dayID === i)
                if (list.length > 0) {
                    list.forEach(element => {
                        if (element.ClassStartTime === "8")
                            this.days[i - 1].subjectsoftheday[0] = element.name
                        else if (element.ClassStartTime === "9:30")
                            this.days[i - 1].subjectsoftheday[1] = element.name
                        else if (element.ClassStartTime === "12:30")
                            this.days[i - 1].subjectsoftheday[2] = element.name
                        else if (element.ClassStartTime === "14")
                            this.days[i - 1].subjectsoftheday[3] = element.name
                        else if (element.ClassStartTime === "15:30")
                            this.days[i - 1].subjectsoftheday[4] = element.name
                        else if (element.ClassStartTime === "17")
                            this.days[i - 1].subjectsoftheday[5] = element.name
                    });
                }

                console.log(this.days)
            }
        },
        edit() {
            this.$router.push('/Selection')
        },
        async submit() {
            let obj = {
                previewlist: this.previewlist,
                userID: this.user.StudentID
            }
            const data = JSON.stringify(obj);
            await axios
                .post("/Selection/submit", data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        if (res.data.success === true) {
                            Swal.fire({
                                text: "واحد های شما با موفقیت در سامانه ثبت شد ",
                                icon: "success",
                                confirmButtonText: "ممنون"
                            })
                            this.logout()
                        }
                        else if (res.data.success === false) {
                            let title = "با عرض پوزش  درس های"
                            res.data.data.list.forEach(element => {
                                title += element.name + " و "
                            });
                            title = title.slice(0, -2);
                            title += "ظرفیتشان به اتمام رسیده است"
                            Swal.fire({
                                text: title,
                                icon: "error",
                                confirmButtonText: "متوجه شدم"
                            })
                        }
                        else {
                        }
                    }
                    else {
                    }
                });
        },
        logout() {
            this.$store.dispatch('logout')
            this.$router.push('/')
        }
    },
}
</script>
<style scoped>
.hoverable {
    padding: 20px 100px !important;
    border: 0.5px solid #E0F7FA;
}
</style>