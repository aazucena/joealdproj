<template>
  <div class="container-fluid vstack gap-4">
    <div class='hstack gap-4 d-flex align-items-center'>
      <div class='w-25 vstack gap-3'>
        <div class='fs-3 fw-light'>Choose your table: </div>
        <vue-select v-model="value" :update="value"
        :loading='!(options?.length > 0)'
        :close-on-select="true" @selected="onTableSelect"
        search-placeholder="Search for table"
        :options="options" searchable class='w-100 form-control'/>
      </div>
      <div class='w-25 vstack gap-3'>
        <div class='fs-3 fw-light'>Type your ID: </div>
        <input type='number' class='form-control' @keydown='onChange' v-model.number='id' />
      </div>
      <div class='w-25 vstack gap-3 d-flex justify-content-end'>
        <button type='button' @click='onClick' 
          class="btn btn-secondary btg-lg p-3 w-25 fw-bold fs-5">
          Search
        </button>
      </div>
    </div>
    <div v-if="item && Object.keys(item)?.length > 0" 
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
        id = null,
        disabled = true
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
        formatString,
        disabled
      }
    },
    methods: {
      async onTableSelect(value) {
        if (value) {
          this.value = value
          this.results = await api.collections(value).browse().then(_ => {
              if (_) console.log(_)
              return _.data
          })
          this.disabled = this.value == null && this.id == null
          console.log(this.disabled)
        }
      },
      onChange(event) {
        var value = (event.target.type == 'number') ? parseInt(event.target.value) : event.target.value
        console.log(value, typeof value)
        this.id = (isNaN(value)) ? null : (value ?? null)
        this.disabled = this.value == null && this.id == null
        console.log(this.disabled)
      },
      async onClick() {
        switch(true) {
          case this.value == null:
            this.toast.error(`The input for table is empty`)
            break
          case this.id == null:
            this.toast.error(`The input for ID is empty`)
            break
          default:
            this.item = await api.collections(this.value).read(this.id).then(_ => {
                if (_) console.log(_)
                this.toast.success(`Read Data with ID ${this.id} ${this.value} Table`)
                return _
            }).catch((e) => {
                console.log(e)
                this.toast.error(`Failed to Retrieve Data from ${this.value} Table`)
            })
        }
      }
    },
    unmounted() {
        this.results = []
        this.value = null
        this.options = []
        this.item = {}
        this.id = null
    }
}
</script>

<style>

</style>