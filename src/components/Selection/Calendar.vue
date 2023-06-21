<template>
    <v-locale-provider rtl>
        <v-card>
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
                            <td class="hoverable" @click="getTimeSlotInfo(day.dayId, 1)"> {{ day.timeLines[0] }}</td>
                            <td class="hoverable" @click="getTimeSlotInfo(day.dayId, 2)"> {{ day.timeLines[1] }}</td>
                            <td class="hoverable" @click="getTimeSlotInfo(day.dayId, 3)"> {{ day.timeLines[2] }}</td>
                            <td class="hoverable" @click="getTimeSlotInfo(day.dayId, 4)"> {{ day.timeLines[3] }}</td>
                            <td class="hoverable" @click="getTimeSlotInfo(day.dayId, 5)"> {{ day.timeLines[4] }}</td>
                            <td class="hoverable" @click="getTimeSlotInfo(day.dayId, 6)"> {{ day.timeLines[5] }}</td>
                        </tr>
                    </tbody>
                </v-table>

            </v-card-text>
        </v-card>
        <v-row justify="center" no-gutters>
            <v-dialog v-model="dialog" scrollable width="50%">
                <v-card>
                    <v-card-title class="pa-5">
                        کلاس خود را برای روز {{ selectedTimeLine[0] }} در بازه زمانی {{ selectedTimeLine[1] }} انتخاب نمایید
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>

                        <v-row justify="right" align="center">
                            <v-col cols="12" lg="3" xl="3 " md="3" sm="4">
                                <v-select label=" نام استاد" :items="teacherList" v-model="selectedTeacher"
                                    variant="outlined"></v-select>
                            </v-col>
                            <v-col cols="12" lg="2" xl="2 " md="2" sm="2">
                                <v-select label=" تعداد واحد" :items="unitOptions" v-model="selectedUnit"
                                    variant="outlined"></v-select>
                            </v-col>
                            <v-col cols="12" lg="2" xl="2 " md="2" sm="3">
                                <v-btn prepend-icon="" class="mb-5 px-3" variant="tonal" block color="primary "
                                    size="large">
                                    جست و جو
                                </v-btn>
                            </v-col>
                        </v-row>

                        <v-divider></v-divider>

                        <v-card variant="outlined">
                            <v-card-text>
                                <v-table fixed-header height="300px">
                                    <thead>
                                        <tr>
                                            <th v-for="item in tableHeaders" class="text-center">
                                                {{ item }}
                                            </th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="subject in dataList" class="text-center tableRow"
                                            v-show="subject.quota !== 0">
                                            <td>
                                                {{ subject.name }}
                                            </td>
                                            <td>
                                                {{ subject.unit }}
                                            </td>
                                            <td>
                                                {{ subject.ClassDates }} {{ subject.ClassStartTime }} - {{
                                                    subject.ClassEndTime }}
                                            </td>
                                            <td>
                                                {{ subject.classPlace }}
                                            </td>
                                            <td>
                                                {{ subject.ExamDay }} {{ subject.ExamDate }} {{ subject.ExamMonth }} ساعت {{
                                                    subject.ExamTime }}
                                            </td>
                                            <td>
                                                {{ subject.quota }} نفر
                                            </td>
                                            <td>
                                                <v-btn variant="tonal" title="اضافه کردن واحد به سبد " size="x-small"
                                                    color="primary" class="dark" icon="mdi-plus">

                                                </v-btn>
                                            </td>

                                        </tr>
                                    </tbody>
                                </v-table>

                            </v-card-text>
                        </v-card>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                            Close
                        </v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-locale-provider>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            tableHeaders: [
                "نام درس",
                "تعداد واحد",
                "زمان برگزاری کلاس",
                "مکان برگزاری کلاس",
                "زمان امتحان ",
                "ظرفیت",

            ],
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
                    timeLines: [
                        "", "", "", "", "", "",
                    ]
                },
                {
                    dayId: 2,
                    dayName: "یک شنبه ",
                    timeLines: [
                        "", "", "", "", "", "",
                    ]
                },
                {
                    dayId: 3,
                    dayName: "دو شنبه ",
                    timeLines: [
                        "", "", "", "", "", "",
                    ]
                },
                {
                    dayId: 4,
                    dayName: "سه شنبه ",
                    timeLines: [
                        "", "", "", "", "", "",
                    ]
                },
                {
                    dayId: 5,
                    dayName: "چهارشتبه ",
                    timeLines: [
                        "", "", "", "", "", "",
                    ]
                },
                {
                    dayId: 6,
                    dayName: "پنج شنبه ",
                    timeLines: [
                        "", "", "", "", "", "",
                    ]
                },
                {
                    dayId: 7,
                    dayName: "جمعه ",
                    timeLines: [
                        "", "", "", "", "", "",
                    ]
                },

            ],
            dialog: false,
            dataList: null,
            selectedTimeLine: [],
            teacherList: [],
            unitOptions: [1, 2, 3],

            selectedUnit: "",
            selectedTeacher: "",
        }
    },
    methods: {
        async getTimeSlotInfo(dayId, TimelineID) {
            let timeslot = []
            switch (TimelineID) {
                case 1:
                    timeslot = [8, 930, "8 - 9:30"]
                    break;
                case 2:
                    timeslot = [930, 11, "9:30 - 11"]
                    break;
                case 3:
                    timeslot = [1230, 14, "12:30 - 14"]
                    break;
                case 4:
                    timeslot = [14, 1530, "14 - 15:30"]
                    break;
                case 5:
                    timeslot = [1530, 17, "15:30 - 17"]
                    break;
                case 6:
                    timeslot = [17, 1830, "17 - 18:30"]
                    break;
                default:
                    break;
            }
            this.addtimefortitle(timeslot, dayId)
            let data = await this.getTimeSlotSubjects(timeslot, dayId)
            this.openDialog(data)
        },
        async getTimeSlotSubjects(timeslot, dayID) {
            let subjectarray = JSON.parse(JSON.stringify(this.subjectList))
            let subjects = await subjectarray.filter(obj => obj.ClassStartTime == timeslot[0] && obj.ClassEndTime == timeslot[1] && obj.ClassDatesId == dayID)
            return subjects
        },
        addtimefortitle(timeslot, dayId) {
            let dayName
            switch (dayId) {
                case 1:
                    dayName = "شنبه"
                    break;
                case 2:
                    dayName = "یک شنبه"
                    break;
                case 3:
                    dayName = "دو شنبه"
                    break;
                case 4:
                    dayName = "سه شنبه"
                    break;
                case 5:
                    dayName = "چهار شنبه"
                    break;
                case 6:
                    dayName = "پنج شنبه"
                    break;
                case 7:
                    dayName = "جمعه"
                    break;
                default:
                    break;
            }

            this.selectedTimeLine = [
                dayName, timeslot[2]
            ]
        },
        openDialog(data) {
            this.dialog = true
            data.forEach(element => {
                this.teacherList.push(element.teacherName)
            });
            this.dataList = data
            console.log(this.dataList)
        }
    },
    computed: {
        ...mapGetters({
            subjectList: 'getSubjectList'
        })
    },
}
</script>
<style scoped>
.hoverable:hover {
    background-color: #E0F7FA;
}

.hoverable {
    padding: 20px 100px !important;
    border: 0.5px solid #E0F7FA;
}

.tableRow:hover {
    background-color: #E0F7FA;
}
</style>
