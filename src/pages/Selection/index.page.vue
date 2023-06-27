<template>
    <v-locale-provider rtl>
        <div>
            <v-row class="mt-15" justify="center" align="center">
                <v-col cols="10" xl="3" lg="3" md="3" sm="10" xs="10">
                    <v-card variant="outlined">
                        <v-card-text>

                            <v-table fixed-header height="350px">
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
                <v-col cols="10" xl="7" lg="7" md="7" sm="10" xs="10">
                    <v-card variant="outlined">
                        <v-card-text>
                            <v-table fixed-header height="350px">
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
                <v-col cols="10" xl="6" lg="6" md="6" sm="10" xs="10">
                    <v-btn :disabled="totalSelectedUnit > maxUnit" class="py-7 mb-6" block variant="outlined" rounded="lg"
                        size="large" color="primary" @click="goToPreview()"> نمایش کلی واحد های انتخاب شده</v-btn>
                    <div class="my-2"> واحد های انتخاب شده شما : {{ totalSelectedUnit }}</div>
                    <div class="my-2"> تعداد واحد های مجاز برای انتخاب : {{ maxUnit }}</div>
                    <div class="my-2"> حداقل واحد انتخابی : 8</div>
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
            request: this.user.StudyField,
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

        if (this.previewlist.length > 0) {
            this.previewlist.forEach(element => {
                this.totalSelectedUnit += parseInt(element.unit)
                this.selectedsubjectID.push(element.id)
                this.previewListHere.push(element.rootID)
            });
        }

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
        async goToPreview() {
            let checkConfilct = await this.$store.dispatch('CheckPreview')
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