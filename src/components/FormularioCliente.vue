<template>
  <h1>{{ titulo }}</h1>
  <div class="center-input">
    <FloatLabel>
      <InputText id="nombre" v-model="nombre" />
      <label for="nombre">Nombre</label>
    </FloatLabel>
    <FloatLabel>
      <InputText id="apellido" v-model="apellido" />
      <label for="apellido">Apellido</label>
    </FloatLabel>
    <FloatLabel>
      <InputText id="numeroCedula" v-model="numeroCedula" :readonly="!cedulaEditable" />
      <label for="numeroCedula">Cédula</label>
    </FloatLabel>
    <label for="fechaNacimiento">Fecha de Nacimiento</label>
    <InputText id="fechaNacimiento" v-model="fechaNacimiento" type="date" />
    <label class="label" for="genero">Genero</label>
    <Dropdown v-model="genero" :options="generoOptions" optionLabel="label" placeholder="Selecciona un género" />
    <Button @click="presionarBoton" severity="danger" raised :label="nombreBoton" />
  </div>
</template>

<script>
import FloatLabel from 'primevue/floatlabel';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

export default {
  components: {
    FloatLabel,
    Button,
    InputText,
    Dropdown,
  },

  props: {
    titulo: {
      type: String,
      default: "titulo",
    },
    nombreBoton: {
      type: String,
      default: "boton",
    },
    cedulaEditable: {
      type: Boolean,
      default: true,
    },

    cliente: {
      type: Object,
    },
  },
  
  data() {
    return {
      generoOptions: [
        { label: 'Masculino', value: 'masculino' },
        { label: 'Femenino', value: 'femenino' },
        { label: 'Otro', value: 'otro' }
      ],
      nombre: null,
      apellido: null,
      numeroCedula: null,
      fechaNacimiento: null,
      genero: null,
      mostrarMensaje: false
    };
  },
  methods: {
    presionarBoton() {
      const cliente = {
        nombre: this.nombre,
        apellido: this.apellido,
        numeroCedula: this.numeroCedula,
        fechaNacimiento: this.fechaNacimiento,
        genero: this.genero ? this.genero.label : null
      };
      this.$emit("eventoBoton", cliente);
    },
  },

  mounted() {
  if (this.cliente) {
    this.nombre = this.cliente.nombre;
    this.apellido = this.cliente.apellido;
    this.numeroCedula = this.cliente.numeroCedula;
    this.fechaNacimiento = this.cliente.fechaNacimiento;
    this.genero = this.cliente.genero;
 
  } else {
    console.error("El objeto cliente no está definido");
  }
}
};
</script>

<style></style>