<template>
  <div class="container-fluid vstack gap-4">
    <div class='fs-3 fw-light'>Choose your table: </div>
    <vue-select v-model="value" :update="value"
    :loading='!(options?.length > 0)'
    :close-on-select="true" @selected="onSelect"
    search-placeholder="Search for table"
    :options="options" searchable class='w-100 form-control'/>
    <CustomTable v-if="results?.length > 0 && value" :rows="results" />
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
      async onSelect(value) {
        this.results = []
        if (value) {
          this.value = value
          this.results = await api.collections(value).browse().then(_ => {
              if (_) console.log(_)
              if (_.data.length > 0)
                this.toast.success(`Listed Data to the ${value} Table`)
              return _.data
          })
          .catch((e) => {
              console.log(e)
              this.toast.error(`Failed to Retrieve Data from ${value} Table`)
          })
        } else {
          this.results = []
          this.value.value = null
        }
      },
    },
    unmounted() {
      this.value = null
      this.options = []
      this.results = []
    }
}
</script>

<style>

</style>