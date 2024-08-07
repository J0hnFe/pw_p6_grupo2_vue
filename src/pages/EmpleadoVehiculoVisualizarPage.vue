<template>
  <NavBarEmpleadoVue />

  <section>
    <div class="container">
      <div>
        <h1>Información de vehículo</h1>
        <DataTable :value="lista" :rows="10">
          <Column field="marca" header="Marca"></Column>
          <Column field="modelo" header="Modelo"></Column>
          <Column field="placa" header="Placa"></Column>
          <Column field="anioFabricacion" header="Año Fabricación"></Column>
          <Column field="paisFabricacion" header="País Fabricación"></Column>
          <Column field="cilindraje" header="Cilindraje"></Column>
          <Column field="avaluo" header="Avalúo"></Column>

          <Column field="estado" header="Estado"></Column>
        </DataTable>
      </div>
    </div>
  </section>
</template>

<script>
import { consultarEmpleadoVehiculoPlacaFachada } from "../clients/clienteEmpleado.js";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Dialog from 'primevue/dialog';

import NavBarEmpleadoVue from '@/components/NavBarEmpleado.vue';
export default {

  name: "EmpleadoVehiculoVisualizarPage",
  components: {
    DataTable,
    NavBarEmpleadoVue,
    Column,
    Button,
    InputText,
    FloatLabel,
    Dialog
  },
  created() {
    this.visualizar(this.$route.params.placa);
  },
  data() {
    return {
      valPlaca: null,
      valModelo: null,
      valMarca: null,
      valAnioFabricacion: null,
      valPfabricacion: null,
      valCilindraje: null,
      valAvaluo: null,
      valRenta: null,
      valEstado: null,
      lista: []
    };
  },
  methods: {
    async visualizar(id) {
      const data = await consultarEmpleadoVehiculoPlacaFachada(id);
      console.log(data);
      const datosVehiculo = [{
        placa: data.placa,
        modelo: data.modelo,
        marca: data.marca,
        anioFabricacion: data.anioFabricacion,
        paisFabricacion: data.paisFabricacion,
        cilindraje: data.cilindraje,
        avaluo: data.avaluo,
        renta: data.renta,
        valor: data.valor,
        estado: data.estado
      }];
      this.lista = datosVehiculo
    },
  },
};
</script>

<style></style>