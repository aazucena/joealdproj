<template>
    <div class='vstack gap-3'>
        <div class='fs-4'> Result Table:</div>
        <v-table-lite
            :is-loading="table.isLoading"
            :columns="table.columns"
            :rows="table.rows"
            :total="table.totalRecordCount"
            :sortable="table.sortable"
            @do-search="doSearch"
            @is-finished="tableLoadingFinish"
            />
    </div> 
</template>

<script>
import VueTableLite from 'vue3-table-lite'
import { reactive } from 'vue'
import { formatString } from '@/utilities/services'
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
                            field.replaceAll('_id', '')
                                .replaceAll("_", " ").toLowerCase()
                                .split(' ').map((_) => _.charAt(0).toUpperCase() + _.substring(1))
                                .join(' ').trim(),
                        field: field,
                        width: `${(i + 1)/Object.keys(this.rows[0]).length}%`,
                        sortable: true,
                        isKey: (field === 'id'),
                    })),
                rows: this.rows,
                totalRecordCount: this.rows.length,
                sortable: {
                    order: "id",
                    sort: "asc",
                },
            }),
            formatString
        }
    },
    methods: {
        onSearch(offset=0, limit=10, order='id', sort='asc') {

            const sortBy = (a, b) => {
                var type_a = a[order], type_b = b[order]
                switch (typeof type_a) {
                    case 'string':
                        if (type_a.toUpperCase() < type_b.toUpperCase()) 
                            return (sort === 'asc') ? -1 : 1
                        if (type_a.toUpperCase() > type_b.toUpperCase()) 
                            return (sort === 'asc') ? 1 : -1
                        return 0
                    case 'number':
                        return (sort === 'asc') ? type_a - type_b : type_b - type_a
                    default:
                        return 0 
                }
            }

            this.table = reactive({
                isLoading: true,
                columns: this.columns ?? Object.keys(this.rows[0])?.map((field, i) => ({
                        label: (field === 'id') ? 'ID' : 
                            field.charAt(0).toUpperCase() + field.slice(1),
                        field: field,
                        width: `${(i + 1)/Object.keys(this.rows[0]).length}%`,
                        sortable: true,
                        isKey: (field === 'id'),
                    })),
                rows: this.rows.slice(offset, limit).sort(sortBy),
                totalRecordCount: this.rows.length,
                sortable: {
                    order: "id",
                    sort: "asc",
                },
            })
        },
        tableLoadingFinish() {
            this.table.isLoading = false
        }
    },
}
</script>

<style>

</style>