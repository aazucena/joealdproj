<template>
    <div class="container-fluid vstack gap-4">
        <div class='hstack gap-4 d-flex align-items-center'>
            <div class='w-25 vstack gap-3'>
                <div class='fs-3 fw-light'>Choose your table: </div>
                <vue-select v-model="value" :update="value"
                :loading='!(options?.length > 0)'
                :close-on-select="true" @selected="onSelect"
                search-placeholder="Search for table"
                :options="options" searchable class='w-100 form-control'/>
            </div>
            <div class='w-25 vstack gap-3'>
                <div class='fs-3 fw-light'>Type your ID: </div>
                <input type='number' class='form-control' @keydown='onChange' v-model.number='id' />
            </div>
            <div class='w-25 vstack gap-3 d-flex justify-content-end'>
                <button type='button' @click='onClick'
                class="btn btn-success btg-lg p-3 w-25 fw-bold fs-5">
                Find
                </button>
            </div>
        </div>
        <Suspense>
            <div v-if="data && schema" class='vstack gap-2'>
                <div class='w-100 py-3'><hr /></div>
                <div class='fs-4 fw-light'>Update Form: </div>
                <FormKit type="group" class='vstack gap-3' v-model="data">
                    <FormKit v-for='(field, i) in schema' v-bind:key='i' 
                            :type='field?.props?.type'
                            :label='formatString(field.props.label)'
                            :name='field?.props?.name'
                            :validation='field?.props?.validation'
                            @change='onInputChange'
                                />
                    <div class="formkit-wrapper">
                        <button type="submit" class="formkit-input" name="submit_2" id="input_2" @click="onSubmit">
                            Submit
                        </button>
                    </div>
                </FormKit>
            </div>
            <template #fallback>
                Loading...
            </template>
        </Suspense>
    </div>
</template>

<script>

import VueSelect from 'vue-next-select'
import { ref, onMounted } from 'vue'
import { api, formatString } from '@/utilities/services'
import { FormKit, /*FormKitSchema*/ } from '@formkit/vue'
import { useToast } from 'vue-toastification'
export default {
    name: 'EditForm',
    components: {
        VueSelect,
        // FormKitSchema,
        FormKit,
    },
    setup() {
        const toast = useToast()
        var value = ref(null),
            options = ref([]),
            fields = ref([]),
            data = ref({}),
            changed = ref({}),
            schema = ref(null),
            id = null
            
        onMounted(async() => {
            options.value = await api.tables.list()
        })
        return {
            value, 
            options,
            fields,
            changed,
            data,
            schema,
            id,
            toast,
            formatString
        }
    },
    methods: {
        async onSelect() {
            this.changed = {}
            this.fields = [] 
            this.schema = null 
        },
        async onSubmit(event) {
            if (event) event.preventDefault()
            var prev = await api.collections(this.value).read(this.id)
            switch(true) {
                case this.changed && (Object.keys(this.changed).length <= 0):
                case this.changed && (Object.keys(this.changed).every(_ => prev[_] == this.changed[_])):
                    console.log(Object.keys(this.data).every(_ => prev[_] == this.changed[_]), prev, this.changed)
                    this.toast.error(`No changes to the data are made`)
                    break
                default: 
                    console.log(Object.keys(this.changed).every(_ => prev[_] == this.changed[_]), prev, this.changed)
                    await api.collections(this.value).edit(this.id, this.changed)
                        .then(() => {
                            this.toast.success(`Updated Data to the ${this.value} Table`)
                            this.schema = null
                            this.$router.push({path: '/browse'})
                        })
                        .catch(e => {
                            console.log(e)
                            this.toast.error(`Failed to Update Data to the ${this.value} Table`)
                        })
                }
        },
        onInputChange(event) {
            this.changed[event.target.name] = event.target.value
        },
        onChange(event) {
            this.changed = {}
            this.fields = [] 
            this.schema = null 
            this.id = event.target.value
        },
        async onClick() {
            const getType = (type) => {
                var typeName = (type.includes('(')) ? 
                        type.split('(')?.at(0).toLowerCase() : type.toLowerCase(),
                    length = type.split('(')?.at(1).replaceAll(')', '').split(',')
                switch(typeName) {
                    case 'tinyint':
                    case 'smallint':
                    case 'mediumint':
                    case 'int':
                    case 'bigint':
                    case 'decimal':
                    case 'float':
                    case 'double':
                    case 'bit':
                        var nmaxlen = (length?.at(0)) ? { maxlength: length?.at(0)} : {}
                        return {
                            type: 'number',
                            ...nmaxlen
                        }
                    case 'longtext':
                    case 'longblob':
                        return {
                            type: 'textarea',
                        }
                    case 'year':
                    case 'date':
                        return {
                            type: 'date',
                        }
                    case 'time':
                        return {
                            type: 'time',
                        }
                    case 'datetime':
                    case 'timestamp':
                        return {
                            type: 'datetime-local',
                        }
                    case 'json':
                        return {
                            type: 'select',
                        }
                    default:
                        var cmaxlen = (length?.at(0)) ? { maxlength: length?.at(0)} : {}
                        return {
                            type: 'text',
                            ...cmaxlen
                        }
                }
            }
            switch(true) {
                case this.value == null:
                    this.toast.error(`The Value for Table is Empty`)
                    break
                case this.id == null:
                    this.toast.error(`The Value for ID is Empty`)
                    break
                default:
                    this.data = await api.collections(this.value).read(this.id).then(_ => {
                        if (_) {
                            delete _.id
                        }
                        return _
                    })
                    this.fields = await api.collections(this.value).getFields().then(_ => {
                        return _
                    })
                    this.schema = this.fields.filter(_ => !['id', 'date_created', 'date_updated'].includes(_.Field))
                        .map(_ => ({
                            $cmp: 'FormKit',
                            props: {
                            ...getType(_.Type),
                                name: _.Field,
                                label: `Enter ${_.Field}`,
                                validation: (_.Null === 'YES') ? 'optional' : 'required',
                                value: `$${_.Field}`,
                            },
                        }))
                    this.toast.success(`Found and Retrieved Data from ${this.value} Table`)
            }
        }
    },
    unmounted() {
        this.value = null
        this.options = []
        this.fields = []
        this.data = {}
        this.changed = {}
        this.schema = null
        this.id = null
    }
}
</script>

<style>
</style>