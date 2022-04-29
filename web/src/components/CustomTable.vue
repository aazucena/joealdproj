<template>
    <div>
        <v-table-lite
            :is-loading="table.isLoading"
            :columns="table.columns"
            :rows="table.rows"
            :total="table.totalRecordCount"
            :sortable="table.sortable"
            />
    </div> 
</template>

<script>
import VueTableLite from 'vue3-table-lite'
import { reactive } from 'vue'
export default {
    name: 'CustomTable',
    components: {
        'v-table-lite': VueTableLite,
    },
    props: {
        columns: {
            type: Array,
            required: true,
        },
        rows: {
            type: Array,
            required: false,
        },

    },
    data() {
        return {
            table: reactive({
                isLoading: false,
                columns: this.columns ?? Object.keys(this.rows[0])?.map((field, i) => ({
                        label: (field === 'id') ? 'ID' : 
                            field.charAt(0).toUpperCase() + field.slice(1),
                        field: field,
                        width: `${(i + 1)/Object.keys(this.rows[0]).length}%`,
                        sortable: true,
                        isKey: (field === 'id'),
                    })),
                rows: this.rows,
                totalRecordCount: 0,
                sortable: {
                    order: "id",
                    sort: "asc",
                },
            })
        }
    },
}
</script>

<style>

</style>