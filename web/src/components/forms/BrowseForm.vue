<template>
  <div class="container-fluid vstack gap-4">
    <div class='fs-3 fw-light'>Choose your table: </div>
    <vue-select v-model="value" :update="value"
    :loading='!(options.length > 0)'
    :close-on-select="true" :selected="onSelect(value)"
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
import { api } from '../../utilities/services'

export default {
    name: 'BrowseForm',
    components: {
      VueSelect,
      CustomTable,
    },
    setup() {
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
      }
    },
    methods: {
      async onSelect(value) {
        if (value) {
          this.results = await api.collections(value).browse().then(_ => {
              if (_) console.log(_)
              return _.data
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