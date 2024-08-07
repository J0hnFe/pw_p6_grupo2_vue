<template>
  <NavBarInicioVue />
  <router-view />

  <div class="inicio">

    <div @click="clientes" class="clientes">
      <img src="../assets/logo_clientes.png" alt="">
      <div class="texto-superpuesto">
        <p>Clientes</p>
      </div>
    </div>

    <div @click="empleado" class="empleados">
      <img src="../assets/logo_empleados.png" alt="Error al caragar la imagen">
      <div class="texto-superpuesto">
        <p>Empleados</p>
      </div>
    </div>

  </div>
  <h5>¡Encuentra el auto de tus sueños hoy mismo con nuestras ofertas irresistibles!</h5>

  <img class="foot" src="../assets/auto_bg_2.jpg" alt="">
</template>

<script>
import NavBarInicioVue from '../components/NavBarInicio.vue';

export default {
  name: "inicio",
  components: {
    NavBarInicioVue
  },
  methods: {
    clientes() {
      this.$router.replace('/clientes');
    },
    empleado() {
      this.$router.replace('/empleados');
    }
  }
};
</script>

<style>
.inicio {
  display: flex;
}

.clientes,
.empleados {
  width: 50%;
  position: relative;
  overflow: hidden;
}

.texto-superpuesto {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(7, 7, 7, 0.194);
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.texto-superpuesto p {
  font-size: 7vmin;
  font-weight: bold;
  text-align: center;
  margin: 20px;
  padding: 0;
}

.clientes:hover .texto-superpuesto,
.empleados:hover .texto-superpuesto {
  opacity: 1;
}

.clientes:hover img,
.empleados:hover img {
  transform: scale(1.1);
  cursor: pointer;
}

.foot {
  width: 100%;
}
</style>
