<template>
  <NavBarEmpleadoVue />
  <router-view />
  
  <h1>Empleados</h1>

  <div class="img_fondo">
    <img src="@/assets/logo_empleados.png" alt="">

  </div>
  <Footer />
</template>

<script>
import NavBarEmpleadoVue from '@/components/NavBarEmpleado.vue'

export default {
  name: 'EmpleadoPage',
  components: {
    NavBarEmpleadoVue
  },

  data() {
    return {
    }
  }
}
</script>

<style>
.img_fondo img {
  width: 50%;
  height: 50%;
}
</style>