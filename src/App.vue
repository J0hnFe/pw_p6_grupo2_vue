<template>
  <!-- <EmpleadoPage/> -->
  <div class="main-container">
    <router-view />

    <Footer />
  </div>
</template>

<script>
import PaginaInicio from './pages/PaginaInicio.vue'
import Footer from './components/Footer.vue'
import EmpleadoPage from './pages/EmpleadoPage.vue'
import Cliente from './pages/Clientes.vue'

import NavBarInicioVue from './components/NavBarInicio.vue'
export default {
  name: 'App',
  components: {
    PaginaInicio,
    Footer, NavBarInicioVue, EmpleadoPage
  }
}
</script>

<style></style>
