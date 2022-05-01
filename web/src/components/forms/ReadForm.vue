<template>
  <div class="container-fluid vstack gap-4">
    <div class='hstack gap-4 d-flex align-items-center'>
      <div class='w-25 vstack gap-3'>
        <div class='fs-3 fw-light'>Choose your table: </div>
        <vue-select v-model="value"
        :loading='!(options.length > 0)'
        :close-on-select="true" @click="onTableSelect"
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
          <span>{{ (key === 'id') ? 'ID' : formatString(key) }}:</span>
          <span>{{ value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSelect from 'vue-next-select'
import { ref, onMounted } from 'vue'
import { api, formatString } from '@/utilities/services'
import { useToast } from 'vue-toastification'
export default {
    name: 'ReadForm',
    components: {
      VueSelect,
    },
    setup() {
      const toast = useToast()
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
        toast,
        formatString
      }
    },
    methods: {
      async onTableSelect(event) {
        if (event) event.preventDefault()
        var value = this.value
        if (value) {
          this.results = await api.collections(value).browse().then(_ => {
              if (_) console.log(_)
              return _.data
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
              this.toast.success(`Read Data with ID ${this.id} ${this.value} Table`)
              return _
          }).catch(() => {
              this.toast.error(`Failed to Retrieve Data from ${this.value} Table`)
          })
      }
    },
    unmounted() {
      this.results = []
    }
}
</script>

<style>

</style>