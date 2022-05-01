<template>
  <div class="container-fluid vstack gap-4">
    <div class='fs-3 fw-light'>Choose your table: </div>
    <vue-select v-model="value" :update="value"
    :loading='!(options.length > 0)'
    :close-on-select="true" @click="onSelect"
    search-placeholder="Search for table"
    :options="options" searchable class='w-100 form-control'/>
    <div v-if="results.length > 0">
      <CustomTable :rows="results" />
    </div>
  </div>
</template>

<script>

import VueSelect from 'vue-next-select'
import { ref, onMounted } from 'vue'
import CustomTable from '@/components/CustomTable'
import { api, formatString } from '@/utilities/services'
import { useToast } from 'vue-toastification'

export default {
    name: 'BrowseForm',
    components: {
      VueSelect,
      CustomTable,
    },
    setup() {
      const toast = useToast()
      var value = ref(null),
        options = ref([]),
        results = ref([])

      onMounted(async() => {
        options.value = await api.tables.list()
      })
      return {
        value, 
        options, 
        results, 
        toast,
        formatString,
      }
    },
    methods: {
      async onSelect(event) {
        if (event) event.preventDefault()
        if (this.value) {
          console.log(this.value)
          this.results = await api.collections(this.value).browse().then(_ => {
              if (_) console.log(_)
              this.toast.success(`Listed Data to the ${this.value} Table`)
              return _.data
          }).catch(() => {
              this.toast.error(`Failed to Retrieve Data from ${this.value} Table`)
          })
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