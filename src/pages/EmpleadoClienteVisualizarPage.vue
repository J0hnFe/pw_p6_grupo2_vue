<template>
  <NavBarEmpleadoVue />

  <section>
    <div class="container">


      <div>
        <h1>Datos del cliente</h1>
        <DataTable :value="lista">
          <Column field="nombre" header="Nombre"></Column>
          <Column field="apellido" header="Apellido"></Column>
          <Column field="cedula" header="Cedula"></Column>
          <Column field="fNacimiento" header="Fecha Nacimiento"></Column>
          <Column field="genero" header="Genero"></Column>
          <Column field="registro" header="Registro"></Column>
        </DataTable>


      </div>
    </div>
  </section>
</template>

<script>
import NavBarEmpleadoVue from '@/components/NavBarEmpleado.vue';
import { consultarEmpleadoClienteCedulaFachada } from "../clients/clienteEmpleado.js";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
export default {
  name: "EmpleadoClienteVisualizarPage",
  components: {
    NavBarEmpleadoVue, DataTable, Column
  },
  created() {
    this.visualizar(this.$route.params.cedula);
  },
  data() {
    return {
      cedula: null,
      nombre: null,
      apellido: null,
      fNacimiento: null,
      genero: null,
      registro: null,
      lista: []
    };
  },
  methods: {
    async visualizar(id) {
      const data = await consultarEmpleadoClienteCedulaFachada(id);

      console.log(data);
      const datosCliente = [
        {
          nombre: data.nombre,
          apellido: data.apellido,
          cedula: data.numeroCedula,
          fNacimiento: data.fechaNacimiento,
          genero: data.genero,
          registro: data.registro
        }
      ];
      this.lista = datosCliente
    },
  },
};
</script>

<style></style>