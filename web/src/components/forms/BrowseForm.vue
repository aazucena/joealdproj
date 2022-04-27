<template>
  <div class="container-fluid">
    <vue-select v-model="value" :options="options" label-by="name" searchable
      value-by="index" class='w-100'
    />
  </div>
</template>

<script>

import VueSelect from 'vue-next-select'
import { ref } from 'vue'

export default {
    name: 'BrowseForm',
    components: {
      VueSelect
    },
    data(){
      return {
        value: ref(null),
        options: ref([])
      }
    },
    async created() {
      try {
        this.options = await this.axios.get(process.env.API_URL ?? 'https://www.dnd5eapi.co/api/monsters')
          .then((response) => {
            var data = response.data
            console.log(data.results)
            return data.results
          })
      } catch (error) {
        console.log(error);
      }
    }
}
</script>

<style>

</style>