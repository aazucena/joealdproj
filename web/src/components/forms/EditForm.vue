<template>
    <div class="container-fluid vstack gap-4">
        <div class='hstack gap-4 d-flex align-items-center'>
            <div class='w-25 vstack gap-3'>
                <div class='fs-3 fw-light'>Choose your table: </div>
                <vue-select v-model="value" :update="value"
                :loading='!(options.length > 0)'
                :close-on-select="true" @click="onSelect"
                search-placeholder="Search for table"
                :options="options" searchable class='w-100 form-control'/>
            </div>
            <div class='w-25 vstack gap-3'>
                <div class='fs-3 fw-light'>Type your ID: </div>
                <input type='number' class='form-control' @change='onChange' 
                v-model.number='id' />
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
                            :type='field.props.type'
                            :label='formatString(field.props.label)'
                            :name='field.props.name'
                            :validation='field.props.validation'
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
            results = ref([]),
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
            changed,
            results,
            fields,
            data,
            schema,
            id,
            toast,
            formatString
        }
    },
    methods: {
        async onSelect(event) {
            if (event) event.preventDefault()
            var value = this.value
            if (value) {
                this.results = await api.collections(value).browse().then(_ => {
                    if (_) console.log(_)
                    return _.data
                })
            } else {
                console.log(this.loaded)
            }
        },
        async onSubmit(event) {
            if (event) event.preventDefault()
            await api.collections(this.value).edit(this.id, this.changed)
                .then(() => {
                    this.toast.success(`Updated Data to the ${this.value} Table`)
                })
                .catch(() => {
                    this.toast.error(`Failed to Update Data to the ${this.value} Table`)
                })
        },
        onInputChange(event) {
            this.changed = { 
                ...this.changed, 
                [event.target.name]: event.target.value
            }
            console.log(this.changed)
        },
        onChange(event) {
            console.log(event.target.value)
            this.id = event.target.value
        },
        async onClick() {
            switch(false) {
                case this.value:
                    this.toast.error(`The Value for Table is Empty`)
                    break
                case this.id:
                    this.toast.error(`The Value for ID is Empty`)
                    break
                default:
                    await run()
            }
            const run = async() => {
                this.data = await api.collections(this.value).read(this.id).then(_ => {
                    if (_) {
                        delete _.id
                        console.log(_)
                    }
                    return _
                })
                this.fields = await api.collections(this.value).getFields().then(_ => {
                    if (_) console.log(_)
                    return _
                })
                const getType = (type) => {
                    var typeName = (type.includes('(')) ? 
                            type.split('(')?.at(0).toLowerCase() : type.toLowerCase()
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
                            return 'number'
                        case 'longtext':
                        case 'longblob':
                            return 'textarea'
                        case 'year':
                        case 'date':
                            return 'date'
                        case 'time':
                            return 'time'
                        case 'datetime':
                        case 'timestamp':
                            return 'datetime-local'
                        case 'json':
                            return 'select'
                        default:
                            return 'text'
                    }
                }
                this.schema = this.fields.filter(_ => !['id', 'date_created', 'date_updated'].includes(_.Field))
                    .map(_ => ({
                        $cmp: 'FormKit',
                        props: {
                            type: getType(_.Type),
                            name: _.Field,
                            label: `Enter ${_.Field}`,
                            validation: (_.Null === 'YES') ? 'optional' : 'required',
                            value: `$${_.Field}`
                        },
                    }))
                this.toast.success(`Found and Retrieved Data from ${this.value} Table`)
            }
        }
    },
    unmounted() {
        this.results = []
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