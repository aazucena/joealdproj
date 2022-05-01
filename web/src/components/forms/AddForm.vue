<template>
  <div class="container-fluid vstack gap-4">
    <div class='fs-3 fw-light'>Choose your table: </div>
    <vue-select v-model="value" :update="value"
    :loading='!(options.length > 0)'
    :close-on-select="true" @click="onSelect"
    search-placeholder="Search for table"
    :options="options" searchable class='w-100 form-control'/>
    <Suspense>
      <div v-if="schema.length > 0" class='vstack gap-2'>
          <div class='w-100 py-3'><hr /></div>
          <div class='fs-4 fw-light'>Add Form: </div>
          <FormKit type="group" class='vstack gap-3' v-model="data">
              <FormKit v-for='(field, i) in schema' v-bind:key='i' 
                      :type='field.props.type'
                      :label='formatString(field.props.label)'
                      :name='field.props.name'
                      :validation='field.props.validation'
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
      async onSelect(event) {
        if (event) event.preventDefault()
        var value = this.value
        if (value) {
          this.fields = await api.collections(value).getFields().then(_ => {
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
            console.log(this.schema)
        }
      },
      async onSubmit(event) {
          if (event) event.preventDefault()
          await api.collections(this.value).add(this.data)
          .then(() => {
            this.toast.success(`Added Data to the ${this.value} Table`)
          })
          .catch(() => {
            this.toast.error(`Failed to Add Data to the ${this.value} Table`)
          })
      },
    },
    onInputChange(event) {
        this.data = { 
            ...this.data, 
            [event.target.name]: event.target.value
        }
        console.log(this.data)
    },
    unmounted() {
      this.fields = []
    }
}
</script>

<style>

</style>