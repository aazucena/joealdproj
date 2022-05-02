<template>
  <div class="container-fluid vstack gap-4">
    <div class='hstack gap-4 d-flex align-items-center'>
      <div class='w-25 vstack gap-3'>
        <div class='fs-3 fw-light'>Choose your table: </div>
        <vue-select v-model="value" :update="value"
        :loading='!(options.length > 0)'
        :close-on-select="true" @click="onTableSelect"
        search-placeholder="Search for table"
        :options="options" searchable class='w-100 form-control'/>
      </div>
      <div class='w-25 vstack gap-3'>
        <div class='fs-3 fw-light'>Type your ID: </div>
        <input type='number' class='form-control' @change='onChange' 
          v-model.number='id' />
      </div>
      <div class='w-25 vstack gap-3 d-flex justify-content-end'>
        <button type='button' @click='onClick' :disabled="id !== null && value !== null"
          class="btn btn-warning btg-lg p-3 w-25 fw-bold fs-5">
          Delete
        </button>
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
    name: 'DeleteForm',
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
        formatString,
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
          await api.collections(this.value).delete(this.id)
          .then(() => {
            this.toast.success(`Delete Data to the ${this.value} Table`)
          })
          .catch(() => {
            this.toast.error(`Failed to Delete Data to the ${this.value} Table`)
          })
      }
    },
    unmounted() {
      this.value = null
      this.options = []
      this.results = []
      this.item = {}
      this.id = null
    }
}
</script>

<style>

</style>