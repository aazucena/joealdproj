<template>
  <div class="container-fluid vstack gap-4">
    <div class='hstack gap-4 d-flex align-items-center'>
      <div class='w-25 vstack gap-3'>
        <div class='fs-3 fw-light'>Choose your table: </div>
        <vue-select v-model="value" :update="value"
        :close-on-select="true" :selected="onTableSelect(value)"
        search-placeholder="Search for table"
        :options="options" searchable class='w-100 form-control'/>
      </div>
      <div class='w-25 vstack gap-3'>
        <div class='fs-3 fw-light'>Type your ID: </div>
        <input type='number' class='form-control' @change='onChange($event)' 
          v-model.number='id' />
      </div>
      <div class='w-25 vstack gap-3 d-flex justify-content-end'>
        <button type='button' @click='onClick' :disabled="id !== null && value !== null"
          class="btn btn-secondary btg-lg p-3 w-25 fw-bold fs-5">
          Search
        </button>
      </div>
    </div>
    <div v-if="Object.keys(item).length > 0" 
        class="alert alert-info p-2 border border-2 border-info">
      <div v-for='[key, value] in Object.entries(item)' :key='key'>
        <div class="fs-4 fw-normal m-4 hstack gap-4" role="alert">
          <span>{{ (key === 'id') ? 'ID' : key.charAt(0).toUpperCase() + key.slice(1) }}:</span>
          <span>{{ value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSelect from 'vue-next-select'
import { ref, onMounted } from 'vue'
import { api } from '../../utilities/services'
export default {
    name: 'ReadForm',
    components: {
      VueSelect,
    },
    setup() {
      var value = ref(null),
        options = ref([]),
        results = ref([]),
        item = ref({}),
        id = null
      onMounted(async() => {
        var tables = await api.tables.list()
        console.log(tables)
        options.value = tables
      })
      return {
        value, 
        options, 
        results, 
        id,
        item,
      }
    },
    methods: {
      async onTableSelect(value) {
        if (value) {
          this.results = await api.collections(value).browse().then(_ => {
              if (_) console.log(_)
              return _?.at(0).map()
          })
        }
      },
      onChange(event) {
        console.log(event.target.value)
        this.id = event.target.value
      },
      async onClick() {
          this.item = await api.collections(this.value).read(this.id).then(_ => {
              if (_) console.log(_)
              return _
          })
      }
    }
}
</script>

<style>

</style>