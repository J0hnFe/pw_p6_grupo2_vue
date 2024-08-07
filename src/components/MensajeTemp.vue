<template>
  <div class="contenedor">
    <h4>{{ titulo }}</h4>
    <h5>{{ informacion }}</h5>
  </div>
</template>

<script>
export default {
  name: "Mensajetemporal",
  props: {
    titulo: {
      type: String,
      default: "titulo",
    },
    informacion: {
      type: String,
      default: "informacion",
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
  height: 90px;
  width: 150px;
  background-color: rgba(229, 174, 129, 0.288);
  border: 1px solid black;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}
</style>