<template>
  <div class="home vstack gap-2 h-100">
    <div class="fs-1 fw-bolder">KBV Database UI</div>
    <hr class='mb-2'>
    <MenuNav/>
    <FooterBar/>
  </div>
</template>

<script>
// @ is an alias to /src
import MenuNav  from '@/components/MenuNav'
import FooterBar  from '@/components/FooterBar'
export default {
  name: 'HomeView',
  components: {
    MenuNav,
    FooterBar,
  }
}
</script>
