<template>
  <header>
    <NavBar />
    <router-view />
  </header>
  <img src="../assets/logo_clientes.png" alt="">
  <section>
  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
  components: {
    NavBar,
  }
}
</script>

<style></style>