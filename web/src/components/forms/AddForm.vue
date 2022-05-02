<template>
  <div class="container-fluid vstack gap-4">
    <div class='fs-3 fw-light'>Choose your table: </div>
    <vue-select v-model="value" :update="value"
    :loading='!(options?.length > 0)'
    :close-on-select="true" @selected="onSelect"
    search-placeholder="Search for table"
    :options="options" searchable class='w-100 form-control'/>
    <Suspense>
      <div v-if="schema.length > 0" class='vstack gap-2'>
          <div class='w-100 py-3'><hr /></div>
          <div class='fs-4 fw-light'>Add Form: </div>
          <FormKit type="group" class='vstack gap-3' v-model="data">
              <FormKit v-for='(field, i) in schema' v-bind:key='i' 
                      :type='field.props.type'
                      :label='formatString(field?.props?.label)'
                      :name='field?.props?.name'
                      :validation='field?.props?.validation'
                      @change='onInputChange'
                      @keyup='onInputChange'
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
    name: 'AddForm',
    components: {
      VueSelect,
      FormKit,
    },
    setup() {
      const toast = useToast()
      var value = ref(null),
        options = ref([]),
        fields = ref([]),
        data = ref({}),
        schema = ref([])
        
      onMounted(async() => {
        options.value = await api.tables.list()
      })
      return {
        value, 
        options,
        fields,
        data,
        schema,
        toast,
        formatString
      }
    },
    methods: {
      async onSelect(value) {
        if (value) {
            this.value = value
            this.fields = await api.collections(value).getFields().then(_ => {
                if (_) console.log(_)
                return _
            })
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
            this.schema = this.fields.filter(_ => !['id', 'date_created', 'date_updated'].includes(_.Field))
                .map(_ => ({
                    $cmp: 'FormKit',
                    props: {
                      ...getType(_.Type),
                        name: _.Field,
                        label: `Enter ${_.Field}`,
                        validation: (_.Null === 'YES') ? 'optional' : 'required',
                        value: `$${_.Field}`,
                    }
                }))
          } else {
            this.fields = []
            this.schema = []
          }
      },
      async onSubmit(event) {
        if (event) event.preventDefault()
        switch(true) {
          case this.data && Object.keys(this.data) <= 0 :
            this.toast.error(`The data is empty`)
            break
          case this.value == null:
            this.toast.error(`The input for ID is empty`)
            break
          default:
            await api.collections(this.value).add(this.data)
            .then(() => {
              this.toast.success(`Added Data to the ${this.value} Table`)
              this.schema = []
              this.$router.push({path: '/browse'})
            })
            .catch((e) => {
              console.log(e)
              this.toast.error(`Failed to Add Data to the ${this.value} Table`)
            })
        }
      },
      onInputChange(event) {
          this.data = { 
              ...this.data, 
              [event.target.name]: event.target.value
          }
      },
    },
    unmounted() {
        this.value = null
        this.options = []
        this.fields = []
        this.data = {}
        this.schema = []
    }
}
</script>

<style>

</style>