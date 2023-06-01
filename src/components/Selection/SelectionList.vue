<template>
    <v-locale-provider rtl>
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
                        <tr v-for="subject in subjectList" class="text-center" v-show="subject.quota !== 0">
                            <td>
                                {{ subject.name }}
                            </td>
                            <td>
                                {{ subject.unit }}
                            </td>
                            <td>
                                {{ subject.ClassDates }} {{ subject.ClassStartTime }} - {{ subject.ClassEndTime }}
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
                                <v-btn title="اضافه کردن واحد به سبد " size="x-small" color="primary" class="dark" icon="mdi-plus" variant="outlined">
                                    
                                </v-btn>
                            </td>

                        </tr>
                    </tbody>
                </v-table>

            </v-card-text>
        </v-card>
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

            ]
        }
    },
    computed: {
        ...mapGetters({
            subjectList: 'getSubjectList'
        })
    },
    methods: {
        getSubjectList() {

        }
    },
    async mounted() {
    },
}
</script>