<template>
  <main>
      <div class="container-fluid d-fluid justify-content-center vh-100 p-5">
        <div class="home vstack gap-2 h-100">
          <router-link to="/" class="fs-1 fw-bolder text-black text-decoration-none ">
            KBV Database UI
          </router-link>
          <hr class='mb-2'>
          <div class="px-5 container-fluid d-flex align-items-start vstack">
            <div class="d-flex align-items-start vstack gap-4">
              <MenuNav/>
              <router-view/>
            </div>
            <FooterBar/>
          </div>
        </div>
      </div>
  </main>
</template>
<style lang="scss"> @import '@/styles/_variables.scss';</style>
<script>
  import FooterBar  from '@/components/FooterBar'
  import MenuNav  from '@/components/MenuNav'
  export default {
    components: {
      FooterBar,
      MenuNav,
    },
  }
</script>
