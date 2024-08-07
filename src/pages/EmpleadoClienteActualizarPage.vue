<template>
  <div>
    <NavBarEmpleadoVue />
    <h1>Actualizar Cliente</h1>
    <section>
      <div class="container">
        <div v-if="cliente">
          <FormularioGenerico type="text" etiqueta="Cédula" v-model="cliente.numeroCedula" />

          <FormularioGenerico type="text" etiqueta="Nombre" v-model="cliente.nombre" />

          <FormularioGenerico type="text" etiqueta="Apellido" v-model="cliente.apellido" />

          <label class="label" for="fechaNacimiento">Fecha de Nacimiento</label>
          <InputText id="fechaNacimiento" v-model="cliente.fechaNacimiento" type="date" />

          <FloatLabel>
            <label class="label" for="genero">Género</label>
            <Dropdown v-model="cliente.genero" :options="generoOptions" optionLabel="label"
              placeholder="Selecciona un género" />
          </FloatLabel>

          <Button @click="actualizar" severity="danger" raised label="Actualizar" />

          <Dialog v-model="mostrarDialogDatosIncompletos" header="Error" :visible="mostrarDialogDatosIncompletos"
            @hide="ocultarDialogDatosIncompletos">
            <p>Todos los campos son obligatorios. Por favor, complete todos los campos.</p>
          </Dialog>

          <Dialog v-model="mostrarDialogCorrecto" header="Éxito" :visible="mostrarDialogCorrecto"
            @hide="ocultarDialogCorrecto">
            <p>La actualización se realizó correctamente.</p>
          </Dialog>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import FormularioGenerico from "../components/FormularioGenerico.vue";
import { actualizarEmpleadoClienteFachada } from "../clients/clienteEmpleado.js";
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import FloatLabel from 'primevue/floatlabel';
import NavBarEmpleadoVue from '@/components/NavBarEmpleado.vue';
import Dialog from 'primevue/dialog';

export default {
  name: "EmpleadoClienteActualizarPage",
  components: {
    FormularioGenerico,
    NavBarEmpleadoVue,
    InputText,
    Dropdown,
    Button,
    FloatLabel,
    Dialog
  },
  data() {
    return {
      generoOptions: [
        { label: 'Masculino', value: 'masculino' },
        { label: 'Femenino', value: 'femenino' },
        { label: 'Otro', value: 'otro' }
      ],
      cliente: this.$route.params.cliente || {
        numeroCedula: null,
        nombre: null,
        apellido: null,
        fechaNacimiento: null,
        genero: null
      },
      mostrarDialogDatosIncompletos: false,
      mostrarDialogCorrecto: false,
    };
  },

  
 data() {
  return {
    generoOptions: [
      { label: 'Masculino', value: 'masculino' },
      { label: 'Femenino', value: 'femenino' },
      { label: 'Otro', value: 'otro' }
    ],
    cliente: JSON.parse(localStorage.getItem('clienteParaActualizar')) || {
      numeroCedula: null,
      nombre: null,
      apellido: null,
      fechaNacimiento: null,
      genero: null
    },
    mostrarDialogDatosIncompletos: false,
    mostrarDialogCorrecto: false,
  };
},
methods: {
  async actualizar() {
    // Verificar si todos los campos están llenos
    if (
      this.cliente.numeroCedula &&
      this.cliente.nombre &&
      this.cliente.apellido &&
      this.cliente.genero &&
      this.cliente.fechaNacimiento
    ) {
      const clienteBody = {
        nombre: this.cliente.nombre,
        apellido: this.cliente.apellido,
        genero: this.cliente.genero.label,
        fechaNacimiento: this.cliente.fechaNacimiento,
        numeroCedula: this.cliente.numeroCedula,
      };

      const cedulaParaBuscar = clienteBody.numeroCedula;
      await actualizarEmpleadoClienteFachada(
        this.$route.params.id,
        clienteBody
      );

      this.mostrarDialogCorrecto = true;
      setTimeout(() => {
        this.mostrarDialogCorrecto = false;
        this.$router.push({
          name: "VisualizarCliente",
          params: { cedula: cedulaParaBuscar },
        });
      }, 2500);

      this.limpiarCampos();
    } else {
      this.mostrarDialogDatosIncompletos = true;
      setTimeout(() => {
        this.mostrarDialogDatosIncompletos = false;
      }, 3000);
    }
  },

  limpiarCampos() {
    this.cliente = {
      numeroCedula: null,
      nombre: null,
      apellido: null,
      fechaNacimiento: null,
      genero: null
    };
  },

  ocultarDialogDatosIncompletos() {
    this.mostrarDialogDatosIncompletos = false;
  },

  ocultarDialogCorrecto() {
    this.mostrarDialogCorrecto = false;
  },
},
};
</script>

<style scoped>
</style>