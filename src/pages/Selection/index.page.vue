<template>
    <!-- this tag allows me to change the direction to "Right to left" -->
    <v-locale-provider rtl>
        <div>
            <v-row class="mt-15" justify="center" align="center">
                <v-col cols="10" xl="2" lg="2" md="2" sm="10" xs="10">
                    <!-- First Table contaning subject List -->
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
                <v-col cols="10" xl="8" lg="8" md="8" sm="10" xs="10">
                    <!-- Second Table contaning Class List -->
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
                                            <span v-if="subject.type == 'Foundation'">
                                                پایه
                                            </span>
                                            <span v-if="subject.type == 'optional'">
                                                اختیاری
                                            </span>
                                            <span v-if="subject.type == 'Professional'">
                                                تخصصی
                                            </span>
                                            <span v-if="subject.type == 'General'">
                                                عمومی
                                            </span>
                                            <span v-if="subject.type == 'Generalskill'">
                                                مهارت عمومی
                                            </span>
                                        </td>
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
                                        <td>
                                            <span v-for="item in subject.RequiredSubjects">
                                                {{ item }}
                                            </span>
                                        </td>
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
                    <!-- button -->
                    <v-btn :disabled="totalSelectedUnit > maxUnit" class=" font-weight-bold py-7  mb-6" block
                        variant="outlined" rounded="lg" size="large" color="primary" @click="goToPreview()"> نمایش تمام واحد
                        های انتخاب شده در جدول هفتگی</v-btn>

                    <!-- shows Unit Count -->
                    <div class="my-2"> واحد های انتخاب شده شما : {{ totalSelectedUnit }}
                        <v-tooltip v-model="show" location="top">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat v-bind="props">
                                    <v-icon color="primary">
                                        mdi-information
                                    </v-icon>
                                </v-btn>
                            </template>
                            <span v-if="totalSelectedUnit > 0">
                                <p v-if="ProfessionalUnitCount > 0"> تعداد واحد های تخصصی شما : {{ ProfessionalUnitCount
                                }}
                                </p>
                                <p v-if="GeneralUntiCount > 0"> تعداد واحد های عمومی شما : {{ GeneralUntiCount }}
                                </p>
                                <p v-if="FoundationUnitCount > 0"> تعداد واحد های پایه شما : {{ FoundationUnitCount
                                }} </p>
                                <p v-if="GeneralskillUnitCount > 0"> تعداد واحد های مهارت عمومی شما :
                                    {{ GeneralskillUnitCount }} </p>
                                <p v-if="optionalUnitCount > 0"> تعداد واحد های اختیاری شما : {{ optionalUnitCount
                                }} </p>
                            </span>
                            <span v-else> شما هنوز واحدی انتخاب نکرده اید</span>
                        </v-tooltip>

                    </div>
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
        // gets our data from vuex store
        ...mapGetters({
            user: 'getUser',
            subjectlistAll: 'getSubjectList',
            previewlist: "getPreviewList",
            maxUnit: 'getMaxUnit'
        })
    },
    async mounted() {
        // checks if the user is logged in
        if (this.user.StudentID === null) {
            Swal.fire({
                text: "برای دسترسی به این بخش وارد سامانه شوید",
                icon: "error",
                confirmButtonText: "متوجه شدم"
            })
            this.$router.push('/')
        }

        // requests the subject data related to study field
        let obj = {
            request: this.user,
        }
        // make data into Json
        const data = JSON.stringify(obj);
        await axios
            .post("/Selection/SubjectData", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => {
                // Adds subject data to our store ( vuex ) and pushes it to our local Array
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

        // Adds data to the List 
        this.subjectListFilter = this.subjectlistAll

        // Sorts data based on day of the week 
        this.subjectListFilter.sort(function (a, b) {
            return (a.dayID - b.dayID)
        })


        // if the user already picked subjects
        if (this.previewlist.length > 0) {
            this.previewlist.forEach(element => {
                this.selectedsubjectID.push(element.id)
                this.previewListHere.push(element.rootID)

                this.totalSelectedUnit += parseInt(element.unit)
                if (element.type === "Foundation")
                    this.FoundationUnitCount += parseInt(element.unit)
                else if (element.type === "General")
                    this.GeneralUntiCount += parseInt(element.unit)
                else if (element.type === "Professional")
                    this.ProfessionalUnitCount += parseInt(element.unit)
                else if (element.type === "Generalskill")
                    this.GeneralskillUnitCount += parseInt(element.unit)
            });
        }
        // if already finished subject Selection
        else if (this.user.alreadySelected === true) {
            if (this.user.SelectedCourses.length > 0) {
                this.user.SelectedCourses.forEach(element => {
                    this.$store.dispatch('AddToPreview', element)
                    this.selectedsubjectID.push(element.id)
                    this.previewListHere.push(element.rootID)

                    this.totalSelectedUnit += parseInt(element.unit)
                    if (element.type === "Foundation")
                        this.FoundationUnitCount += parseInt(element.unit)
                    else if (element.type === "General")
                        this.GeneralUntiCount += parseInt(element.unit)
                    else if (element.type === "Professional")
                        this.ProfessionalUnitCount += parseInt(element.unit)
                    else if (element.type === "Generalskill")
                        this.GeneralskillUnitCount += parseInt(element.unit)
                });
            }

        }

    },
    data() {
        return {
            // Header Text Arrays
            days: [
                "شنبه ",
                " یکشنبه ",
                "دوشنبه ",
                "سه شنبه ",
                "چهارشنبه ",
                " پنج شنبه ",
                "جمعه ",
            ],
            tableHeaders: [
                "  لیست دروس مجاز",
            ],
            tableHeadersSelection: [
                "نوع درس",
                "زمان برگزاری کلاس",
                " استاد",
                "مکان برگزاری کلاس",
                "زمان امتحان ",
                "پیش نیاز",
                "ظرفیت",
            ],

            // unit control variables
            totalSelectedUnit: 0,
            ProfessionalUnitCount: 0,
            GeneralUntiCount: 0,
            FoundationUnitCount: 0,
            GeneralskillUnitCount: 0,
            optionalUnitCount: 0,

            // Data Control Variables
            tableHeaderData: [],
            isActive: "",
            subjectListFilter: [],
            selectedsubjectID: [],
            previewListHere: [],

            // tooltip
            show: false,
        }
    },
    methods: {
        unitSelected(item) {
            // Handles Css
            this.isActive = item.rootID
            // Adds filtered subjects to the data and sorts them according to dayID
            this.subjectListFilter = this.subjectlistAll.filter(x => x.rootID === item.rootID)
            this.subjectListFilter.sort(function (a, b) {
                return (a.dayID - b.dayID)
            })
        },
        addSubjectToList(item) {
            // Sends An Error if the subject already exists in the list
            if (this.previewListHere.includes(item.rootID)) {
                Swal.fire({
                    text: "شما در در حال حاضر یک بازه زمانی برای این درس را انتخاب کرده اید ",
                    icon: "error",
                    confirmButtonText: "باشه"
                })
            }
            else {
                // Adds the units to their respective variables
                this.totalSelectedUnit += parseInt(item.unit)
                if (item.type === "Foundation")
                    this.FoundationUnitCount += parseInt(item.unit)
                else if (item.type === "General")
                    this.GeneralUntiCount += parseInt(item.unit)
                else if (item.type === "Professional")
                    this.ProfessionalUnitCount += parseInt(item.unit)
                else if (item.type === "Generalskill")
                    this.GeneralskillUnitCount += parseInt(item.unit)

                // Handles Store and css
                this.$store.dispatch('AddToPreview', item)
                this.selectedsubjectID.push(item.id)
                this.previewListHere.push(item.rootID)
            }

        },
        removeSubejectFromList(item) {
            // checks if the subject exists in the list
            const index = this.selectedsubjectID.indexOf(item.id);
            if (index > -1) {
                // removes the units from their respective variables
                this.totalSelectedUnit -= parseInt(item.unit)
                if (item.type === "Foundation")
                    this.FoundationUnitCount -= parseInt(item.unit)
                else if (item.type === "General")
                    this.GeneralUntiCount -= parseInt(item.unit)
                else if (item.type === "Professional")
                    this.ProfessionalUnitCount -= parseInt(item.unit)
                else if (item.type === "Generalskill")
                    this.GeneralskillUnitCount -= parseInt(item.unit)

                // Handles Store and css
                this.$store.dispatch('DeleteFromPreview', item)
                this.selectedsubjectID.splice(index, 1);
            }

            // Handles Css
            const index2 = this.previewListHere.indexOf(item.rootID);
            if (index2 > -1) {
                this.previewListHere.splice(index, 1);
            }
        },
        async goToPreview() {
            await this.$store.dispatch('CheckPreview')
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
    font-size: medium;
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