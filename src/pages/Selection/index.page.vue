<template>
    <v-locale-provider rtl>
        <div>
            <v-row class="mt-15" justify="center" align="center">
                <v-col cols="3">
                    <v-card variant="outlined">
                        <v-card-text>

                            <v-table fixed-header height="300px">
                                <thead>
                                    <tr>
                                        <th v-for="item in tableHeaders" class="text-center">
                                            {{ item }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="subject in tableHeaderData" class="text-center"
                                        :disabled="subject.quota !== 0" @click.native="unitSelected(subject)">
                                        <td :class="{ selectedsubject: subject.rootID === isActive }">
                                            {{ subject.name }} - {{ subject.unit }} واحد
                                            <v-icon v-if="previewListHere.includes(subject.rootID)" color="primary"
                                                icon="mdi-check-decagram"></v-icon>
                                        </td>
                                    </tr>
                                </tbody>
                            </v-table>

                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="7">
                    <v-card variant="outlined">
                        <v-card-text>
                            <v-table fixed-header height="300px">
                                <thead>
                                    <tr>
                                        <th v-for="item in tableHeadersSelection" class="text-center">
                                            {{ item }}
                                        </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="subject in subjectListFilter" class="text-center Selectionrow"
                                        v-show="subject.quota !== 0"
                                        :class="{ selectedSubjectinList: selectedsubjectID.includes(subject.id) }">
                                        <td>
                                            {{ subject.ClassDates }} {{ subject.ClassStartTime }} - {{ subject.ClassEndTime
                                            }}
                                        </td>
                                        <td> {{ subject.teacherName }}</td>
                                        <td>
                                            {{ subject.classPlace }}
                                        </td>

                                        <td>
                                            {{ subject.ExamDay }} {{ subject.ExamDate }} {{ subject.ExamMonth }} ساعت {{
                                                subject.ExamTime }}
                                        </td>
                                        <td></td>
                                        <td>
                                            {{ subject.quota }} نفر
                                        </td>
                                        <td>
                                            <v-btn v-if="selectedsubjectID.includes(subject.id)" variant="tonal"
                                                title="حذف کردن واحد به سبد " size="x-small" color="primary" class="dark"
                                                icon="mdi-trash-can" @click.native="removeSubejectFromList(subject)">
                                            </v-btn>
                                            <v-btn v-else variant="tonal" title="اضافه کردن واحد به سبد " size="x-small"
                                                color="primary" class="dark" icon="mdi-plus"
                                                @click.native="addSubjectToList(subject)">
                                            </v-btn>
                                        </td>

                                    </tr>
                                </tbody>
                            </v-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <v-row class="mt-15" justify="center" align="center">
                <v-col cols="6" sm="12" md="4">
                    <v-btn :disabled="totalSelectedUnit > maxUnit" class="py-7 mb-6" block variant="outlined" rounded="lg"
                        size="large" color="primary" @click="goToPreview()"> نمایش کلی واحد های انتخاب شده</v-btn>
                    <span title="حداقل 8 واحد"> تعداد کل واحد های انتخاب شده : {{ totalSelectedUnit }} از {{ maxUnit }}</span>
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
    computed: {
        ...mapGetters({
            user: 'getUser',
            subjectlistAll: 'getSubjectList',
            previewlist: "getPreviewList",
            maxUnit: 'getMaxUnit'
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
                    obj = {
                        name: element.name,
                        rootID: element.rootID,
                        unit: element.unit
                    }
                    this.tableHeaderData.push(obj)
                });
            })
        this.subjectListFilter = this.subjectlistAll
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
            subjectListFilter: [],
            tableHeaders: [
                " لیست دروس",
            ],
            tableHeaderData: [],
            isActive: "",
            totalSelectedUnit: 0,
            tableHeadersSelection: [
                "زمان برگزاری کلاس",
                " استاد",
                "مکان برگزاری کلاس",
                "زمان امتحان ",
                "پیش نیاز",
                "ظرفیت",
            ],
            selectedsubjectID: [],
            previewListHere: []
        }
    },
    methods: {
        unitSelected(item) {
            this.isActive = item.rootID
            this.subjectListFilter = this.subjectlistAll.filter(x => x.rootID === item.rootID)
        },
        addSubjectToList(item) {
            if (this.previewListHere.includes(item.rootID)) {
                Swal.fire({
                    text: "شما در در حال حاضر یک بازه زمانی برای این درس را انتخاب کرده اید ",
                    icon: "error",
                    confirmButtonText: "باشه"
                })
            }
            else {
                this.totalSelectedUnit += parseInt(item.unit)
                this.$store.dispatch('AddToPreview', item)
                this.selectedsubjectID.push(item.id)
                this.previewListHere.push(item.rootID)
            }

        },
        removeSubejectFromList(item) {
            const index = this.selectedsubjectID.indexOf(item.id);
            if (index > -1) {
                this.totalSelectedUnit -= parseInt(item.unit)
                this.$store.dispatch('DeleteFromPreview', item)
                this.selectedsubjectID.splice(index, 1);
            }

            const index2 = this.previewListHere.indexOf(item.rootID);
            if (index2 > -1) {
                this.previewListHere.splice(index, 1);
            }
        },
        goToPreview() {
            this.$router.push('/Preview')
        }
    },
}
</script>
<style>
th {
    font-size: large;
    background-color: antiquewhite !important;
}

td {
    font-size: small;
}

.selectedsubject {
    background-color: #E0F7FA;
}

.Selectionrow:hover {
    background-color: #E0F7FA;
}

.selectedSubjectinList {
    background-color: #B3E5FC;
}
</style>