<template>

  <NavBarEmpleadoVue />
  <h1>Retirar Vehículo</h1>
  <RetirarVehiculoVue />

</template>

<script>
import RetirarVehiculoVue from '@/components/RetirarVehiculo.vue'

import NavBarEmpleadoVue from '@/components/NavBarEmpleado.vue'
export default {
  components: {
    RetirarVehiculoVue, NavBarEmpleadoVue
  }
}

</script>

<style></style>