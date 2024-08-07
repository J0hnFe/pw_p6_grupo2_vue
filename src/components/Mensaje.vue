<template>
  <div class="contenedor">
    <h1>{{ titulo }}</h1>
    <h4>{{ informacion }}</h4>
    <button @click="presionarBoton">
      <p>{{ nombreBoton }}</p>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    titulo: {
      type: String,
      default: "titulo",
    },
    informacion: {
      type: String,
      default: "informacion",
    },
    nombreBoton: {
      type: String,
      default: "Aceptar",
    },
  },
  data() {
    return {};
  },
  methods: {
    presionarBoton() {
      this.$emit("eventoMensaje")
    }
  }
};
</script>

<style scoped>
.contenedor {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  padding-inline: 50px;
  background-color: #ffffff;
  border: solid 1px black;

}

button {
  border-radius: 5px;
  padding: 0px 10px 0px 10px;
  margin: 10px;
  background-color: rgb(194, 38, 38);
  border: solid 1px black;
}
</style>