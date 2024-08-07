<template>
  <div>
    <NavBarEmpleadoVue />
    <h1>Buscar cliente por Apellido</h1>
    <section>
      <div class="container">
        <FloatLabel>
          <InputText id="apellido" v-model="apellidoid" @keydown.enter="consultarPorApellido" />
          <label for="apellido">Apellido</label>
        </FloatLabel>
        <div class="boton">
          <Button @click="consultarPorApellido" severity="danger" raised label="Buscar" />
        </div>
 
        <div v-if="mensajeVacio">
          <p for="">No existen coincidencias</p>
        </div>
 
        <div v-if="mostrar">
          <table class="tabla">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Cedula</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cliente in data" :key="cliente.id">
                <td>{{ cliente.nombre }}</td>
                <td>{{ cliente.apellido }}</td>
                <td>{{ cliente.numeroCedula }}</td>
                <td>
                  <Button @click="goVisualizar(cliente.numeroCedula)" severity="Plain" plain text raised label="Visualizar" />
                  <Button @click="goActualizar(cliente)" severity="secondary" text raised label="Actualizar" />
                  <Button @click="confirmarEliminarCliente(cliente)" icon="pi pi-trash" severity="danger" text raised />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Dialog v-model="mostrarDialogEliminar" :visible="mostrarDialogEliminar" header="Eliminar Cliente" :modal="true"
          @update:visible="ocultarDialogEliminar">
          <p>¿Está seguro de eliminar este cliente?</p>
          <div class="p-d-flex p-jc-between">
            <Button @click="cancelarEliminar" label="Cancelar" />
            <Button @click="eliminarCliente" label="Eliminar" class="p-button-danger" />
          </div>
        </Dialog>

        <Dialog v-model="mostrarDialogEliminado" :visible="mostrarDialogEliminado" header="Cliente Eliminado"
          :modal="true" @update:visible="ocultarDialogEliminado">
          <p>El cliente ha sido eliminado correctamente.</p>
        </Dialog>

        <Dialog v-model="mostrarDialogError" :visible="mostrarDialogError" header="Error"
          :modal="true" @update:visible="ocultarDialogError">
          <p>{{ mensajeError }}</p>
        </Dialog>
      </div>
    </section>
  </div>
</template>
 
<script>
import {
  consultarEmpleadoClienteFachada,
  eliminarEmpleadoClienteFachada,
} from "../clients/clienteEmpleado.js";
import FloatLabel from 'primevue/floatlabel';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import NavBarEmpleadoVue from '@/components/NavBarEmpleado.vue';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
 
export default {
  components: {
    FloatLabel, InputText, Button, NavBarEmpleadoVue, Column, DataTable, Dialog
  },
  name: "EmpleadoClienteBusquedaPage",
  data() {
    return {
      apellidoid: null,
      data: [],
      mostrar: false,
      mensajeVacio: false,
      mostrarDialogEliminar: false,
      mostrarDialogEliminado: false,
      mostrarDialogError: false,
      clienteAEliminar: null,
      mensajeError: ''
    };
  },
  methods: {
  async consultarPorApellido() {
    this.data = await consultarEmpleadoClienteFachada(this.apellidoid);
    if (this.data.length != 0) {
      this.mostrar = true;
    } else {
      this.mensajeVacio = true;
      setTimeout(() => {
        this.mensajeVacio = false;
      }, 3000);
    }
  },
  goVisualizar(cedula) {
    this.$router.push({ name: "VisualizarCliente", params: { cedula } });
  },
  goActualizar(cliente) {
    localStorage.setItem('clienteParaActualizar', JSON.stringify(cliente));
    this.$router.push({ name: "ActualizarCliente", params: { id: cliente.id } });
  },
  confirmarEliminarCliente(cliente) {
    this.clienteAEliminar = cliente;
    this.mostrarDialogEliminar = true;
  },
  async eliminarCliente() {
    try {
      await eliminarEmpleadoClienteFachada(this.clienteAEliminar.id);
      this.mostrarDialogEliminar = false;
      this.mostrarDialogEliminado = true;
      setTimeout(() => {
        this.mostrarDialogEliminado = false;
        this.consultarPorApellido();
      }, 2000);
    } catch (error) {
      if (error.message === 'No se puede eliminar Cliente con reserva.') {
        this.mostrarDialogEliminar = false;
        this.mensajeError = error.message;
        this.mostrarDialogError = true;
      } else {
        console.error('Error al eliminar el cliente:', error);
      }
    }
  },
  cancelarEliminar() {
    this.mostrarDialogEliminar = false;
  },
  ocultarDialogEliminar() {
    this.mostrarDialogEliminar = false;
  },
  ocultarDialogEliminado() {
    this.mostrarDialogEliminado = false;
  },
  ocultarDialogError() {
    this.mostrarDialogError = false;
  },
},
};
</script>
 
<style>
.tabla {
  margin-top: 20px;
}
</style>