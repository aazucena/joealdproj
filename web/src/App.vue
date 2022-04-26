<template>
  <main>
      <router-link to="/"></router-link>
      <div class="container-fluid d-fluid justify-content-center vh-100 p-5">
        <router-view/>
      </div>
  </main>
</template>
<style lang="scss"> @import '@/styles/_variables.scss';</style>
<script>
  export default {
    components: {
    },
  }
</script>
