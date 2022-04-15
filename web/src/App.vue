<template>
  <main>
    <!-- <ThemeProvider :breakpoints="sizes"> -->
      <router-link to="/"></router-link>
      <div class="container-fluid d-fluid justify-content-center vh-100 p-5">
        <router-view/>
      </div>
    <!-- </ThemeProvider> -->
  </main>
</template>
<style lang="scss"> @import '@/styles/_variables.scss';</style>
<script>
  import { /*ThemeProvider*/ } from 'react-bootstrap'
  export default {
    // props: {
    //   breakpoints: {
    //     type: Array
    //   }
    // },
    // data() {
    //   return {
    //     sizes: ["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]
    //   }
    // },
    components: {
      //ThemeProvider,
    },
  }
</script>
