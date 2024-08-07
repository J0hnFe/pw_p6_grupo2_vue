<template>
  <NavBarEmpleadoVue />

  <h1>Reporte de reservas</h1>
  <section>
    <div class="container">
      <div class="center-input">
        <label class="label" for="fechaInicio">Fecha inicio</label>
        <InputText v-model="fechaInicio" id="fechaInicio" type="date" format="yyyy-MM-ddT00:00:00" />

        <label class="label" for="fechaFin">Fecha fin</label>
        <InputText v-model="fechaFin" id="fechaFin" type="date" />

        <Button @click="reporte" severity="danger" raised label="Buscar reservas" />
      </div>
      <div v-if="mostrarTabla && lista.length > 0">
        <h2>Reservas</h2>
        <DataTable class="tabla" :value="lista">
          <Column field="numeroCedula" header="Numero Cedula"></Column>
          <Column field="apellido" header="Apellido"></Column>
          <Column field="placa" header="Placa"></Column>
          <Column field="marca" header="Marca"></Column>
          <Column field="modelo" header="Modelo"></Column>
          <Column field="numeroReserva" header="Nro. Reserva"></Column>
          <Column field="diasReserva" header="Dias Reserva"></Column>
          <Column field="fechaInicio" header="Inicio"></Column>
          <Column field="fechaFin" header="Fin"></Column>
          <Column field="estado" header="Estado"></Column>
        </DataTable>
      </div>
      <div v-if="mostrarError" class="error-message">
        <p>Error al buscar reservas. Verifique las fechas e intente nuevamente.</p>
      </div>
      <div v-if="fechaInvalida" class="error-message">
        <h3>La fecha de inicio no puede ser posterior a la fecha de fin.</h3>
      </div>
      <div v-if="mostrarTabla && lista.length === 0" class="error-message">
        <p>No se encontraron reservas.</p>
      </div>
    </div>
  </section>
</template>

<script>
import NavBarEmpleadoVue from "@/components/NavBarEmpleado.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

import { reporteReservaFachada } from "@/clients/clienteEmpleado";
export default {
  components: {
    NavBarEmpleadoVue,
    DataTable,
    Column,
    InputText,
    Button,
  },
  data() {
    return {
      fechaInicio: null,
      fechaFin: null,
      lista: [],
      mostrarTabla: false,
      mostrarError: false,
      fechaInvalida: false,
    };
  },
  methods: {
    async reporte() {
      this.mostrarTabla = false;
      this.mostrarError = false;
      this.fechaInvalida = false;

      if (this.fechaInicio && this.fechaFin && this.fechaInicio > this.fechaFin) {
        this.fechaInvalida = true;
        return;
      }

      await this.buscarReservas(this.fechaInicio, this.fechaFin);
    },

    async buscarReservas(fechaInicio, fechaFin) {
      try {
        const data = await reporteReservaFachada(fechaInicio, fechaFin);
        console.log(data);
        this.lista = data;
        this.mostrarTabla = true;
      } catch (error) {
        console.error(error);
        this.mostrarError = true;
        this.lista = [];
        this.mostrarTabla = false;
      }
    },
  },
};
</script>

<style>
.error-message {
  color: rgb(84, 84, 84);
  margin-top: 10px;
}
</style>
