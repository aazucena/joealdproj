<template>
  <div class="container-fluid vstack gap-4">
    <div class='fs-3 fw-light'>Choose your table: </div>
    <vue-select v-model="value" :update="value"
    :loading='!(options.length > 0)'
    :close-on-select="true" :selected="onSelect(value)"
    search-placeholder="Search for table"
    :options="options" searchable class='w-100 form-control'/>
    <Suspense>
      <FormKitSchema :schema="schema" :data="data" />
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>

<script>

import VueSelect from 'vue-next-select'
import { ref, onMounted } from 'vue'
import { api } from '../../utilities/services'
import { FormKitSchema } from '@formkit/vue'
export default {
    name: 'AddForm',
    components: {
      VueSelect,
      FormKitSchema,
    },
    setup() {
      var value = ref(null),
        options = ref([]),
        results = ref([]),
        fields = ref([]),
        data = ref({}),
        schema = ref([])
        
      onMounted(async() => {
        options.value = await api.tables.list()
      })
      return {
        value, 
        options, 
        results,
        fields,
        loaded: false,
        data,
        schema
      }
    },
    methods: {
      async onSelect(value) {
        if (value) {
          this.results = await api.collections(value).browse().then(_ => {
              if (_) console.log(_)
              return _.data
          })
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
          var fields = this.fields.filter(_ => _.Field !== 'id').map(_ => ({
                  $formkit: getType(_.Type),
                  name: _.Field,
                  label: `Enter ${_.Field}`,
                  validation: (_.Null === 'YES') ? 'optional' : 'required'
              }))
          console.log(fields)
          this.schema = [...fields, {
              $formkit: 'submit',
              label: `Submit new ${value} item`
          }]
          this.loaded = true
          console.log(this.loaded, this.schema)
        } else {
          this.loaded = false
          console.log(this.loaded)
        }
      },
    },
    unmounted() {
      this.results = []
    }
}
</script>

<style>

</style>