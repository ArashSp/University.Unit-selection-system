<template>
    <v-locale-provider rtl>
       
    </v-locale-provider>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            previewList: "getPreviewList"
        })
    },

    data() {
        return {
            tableHeaders: [
                "زمان برگزاری کلاس",
                "مکان برگزاری کلاس",
                "زمان امتحان ",
                "پیش نیاز",
                "ظرفیت",
            ],
            selectedsubjectID: []
        }
    },
    methods: {
        addSubjectToList(item) {
            this.$store.dispatch('AddToPreview', item)
            this.selectedsubjectID.push(item.id)
        },
        removeSubejectFromList(item) {
            this.$store.dispatch('DeleteFromPreview', item)
            const index = this.selectedsubjectID.indexOf(item.id);
            if (index > -1) {
                this.selectedsubjectID.splice(index, 1);
            }
        }
    },
    async mounted() {
    },
    props: {
        unitlist: {
            type: Array
        }
    }
}
</script>
<style scoped>
tr:hover {
    background-color: #E0F7FA;
}

.selectedSubjectinList {
    background-color: #B3E5FC;
}
</style>