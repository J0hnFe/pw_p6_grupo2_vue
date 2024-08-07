<template>
  <NavBarVue />
  <h1>Reservar</h1>
  <ReservaVehiculoVue @envioReserva="metodo($event)" />
</template>

<script>
import ReservaVehiculoVue from '@/components/ReservaVehiculo.vue'
import ClienteRentarVue from './ClienteRentar.vue'
import NavBarVue from '@/components/NavBar.vue'
export default {
  components: {
    ReservaVehiculoVue, NavBarVue, ClienteRentarVue
  },
  data() {
    return {
      reserva: null,
    }
  },
  methods: {
    metodo(nre) {
      this.reserva = nre;

      console.log(this.reserva)

      if (this.reserva != null) {
        this.$router.push("/clientes");
      }

    }
  }
}
</script>

<style></style>