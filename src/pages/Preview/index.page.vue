<template>
    <v-locale-provider rtl>
        <div>
            <v-row class="mt-15" align="center" justify="center">
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
                                    <td class="hoverable"></td>
                                    <td class="hoverable"></td>
                                    <td class="hoverable"> </td>
                                    <td class="hoverable"></td>
                                    <td class="hoverable"></td>
                                    <td class="hoverable"></td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
                </v-col>
            </v-row>
        </div>
    </v-locale-provider>
</template>
<script>
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
                },
                {
                    dayId: 2,
                    dayName: "یک شنبه ",
                },
                {
                    dayId: 3,
                    dayName: "دو شنبه ",
                },
                {
                    dayId: 4,
                    dayName: "سه شنبه ",
                },
                {
                    dayId: 5,
                    dayName: "چهارشتبه ",
                },
                {
                    dayId: 6,
                    dayName: "پنج شنبه ",
                },
                {
                    dayId: 7,
                    dayName: "جمعه ",
                },

            ],
        }

    }
}
</script>
<style scoped>
.hoverable {
    padding: 20px 100px !important;
    border: 0.5px solid #E0F7FA;
}
</style>