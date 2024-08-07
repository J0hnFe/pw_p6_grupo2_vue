<template>
  <div>
    <NavBarEmpleadoVue />
    <h1>Buscar vehículo por Marca</h1>
    <section>
      <div class="container">
        <FloatLabel>
          <InputText id="marca" v-model="marcaid" @keydown.enter="consultarPorMarca" />
          <label for="marca">Marca</label>
        </FloatLabel>
        <div class="boton">
          <Button @click="consultarPorMarca" severity="danger" raised label="Buscar" />
        </div>

        <div v-if="mensajeVacio">
          <p>No existen coincidencias</p>
        </div>

        <div v-if="mostrar">
          <table class="tabla">
            <thead>
              <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Placa</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="vehiculo in data" :key="vehiculo.id">
                <td>{{ vehiculo.marca }}</td>
                <td>{{ vehiculo.modelo }}</td>
                <td>{{ vehiculo.placa }}</td>
                <td>
                  <Button @click="goVisualizar(vehiculo.placa)" severity="Plain" plain text raised label="Visualizar" />
                  <Button @click="goActualizar(vehiculo)" severity="secondary" text raised label="Actualizar" />
                  <Button @click="confirmarEliminarVehiculo(vehiculo)" icon="pi pi-trash" severity="danger" text raised />
                </td>
              </tr>
            </tbody>
          </table>
        </div>


        <Dialog v-model="mostrarDialogEliminar" :visible="mostrarDialogEliminar" header="Eliminar Vehículo" :modal="true"
          @update:visible="ocultarDialogEliminar">
          <p>¿Está seguro de eliminar este vehículo?</p>
          <div class="p-d-flex p-jc-between">
            <Button @click="cancelarEliminar" label="Cancelar" />
            <Button @click="eliminarVehiculo" label="Eliminar" class="p-button-danger" />
          </div>
        </Dialog>

        <Dialog v-model="mostrarDialogEliminado" :visible="mostrarDialogEliminado" header="Vehículo Eliminado"
          :modal="true" @update:visible="ocultarDialogEliminado">
          <p>El vehículo ha sido eliminado correctamente.</p>
        </Dialog>

        <Dialog v-model="mostrarDialogErrorEliminar" :visible="mostrarDialogErrorEliminar" header="Error al Eliminar Vehículo"
          :modal="true" @update:visible="ocultarDialogErrorEliminar">
          <p>{{ mensajeErrorEliminar }}</p>
        </Dialog>
      </div>
    </section>
  </div>
</template>

<script>
import {
  consultarEmpleadoVehiculoFachada,
  eliminarEmpleadoVehiculoFachada,
} from "../clients/clienteEmpleado.js";
import FloatLabel from 'primevue/floatlabel';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import NavBarEmpleadoVue from '@/components/NavBarEmpleado.vue';
import Dialog from 'primevue/dialog';

export default {
  components: {
    FloatLabel, InputText, Button, NavBarEmpleadoVue, Dialog
  },
  name: "EmpleadoVehiculoBusquedaPage",
  data() {
    return {
      marcaid: null,
      data: [],
      mostrar: false,
      mensajeVacio: false,
      mostrarDialogEliminar: false,
      mostrarDialogEliminado: false,
      mostrarDialogErrorEliminar: false,
      mensajeErrorEliminar: '',
      vehiculoAEliminar: null
    };
  },
  methods: {
    async consultarPorMarca() {
      this.data = await consultarEmpleadoVehiculoFachada(this.marcaid);
      if (this.data.length != 0) {
        this.mostrar = true;
      } else {
        this.mensajeVacio = true;
        setTimeout(() => {
          this.mensajeVacio = false;
        }, 3000);
      }
    },
    goVisualizar(placa) {
      this.$router.push({ name: "VisualizarVehiculo", params: { placa } });
    },
    goActualizar(vehiculo) {
      localStorage.setItem('vehiculoParaActualizar', JSON.stringify(vehiculo));
      this.$router.push({ name: "ActualizarVehiculo", params: { id: vehiculo.id } });
    },
    confirmarEliminarVehiculo(vehiculo) {
      this.vehiculoAEliminar = vehiculo;
      this.mostrarDialogEliminar = true;
    },
    async eliminarVehiculo() {
      try {
        await eliminarEmpleadoVehiculoFachada(this.vehiculoAEliminar.id);
        this.mostrarDialogEliminar = false;
        this.mostrarDialogEliminado = true;
        setTimeout(() => {
          this.mostrarDialogEliminado = false;
          this.consultarPorMarca();
        }, 2000);
      } catch (error) {
        if (error.message === 'El vehículo está reservado, no se puede eliminar') {
          this.mensajeErrorEliminar = error.message;
        } else {
          this.mensajeErrorEliminar = 'Ocurrió un error al eliminar el vehículo.';
        }
        this.mostrarDialogEliminar = false;
        this.mostrarDialogErrorEliminar = true;
      }
    },
    cancelarEliminar() {
      this.mostrarDialogEliminar = false;
    },
    ocultarDialogEliminar() {
      this.mostrarDialogEliminar = false;
    },
    ocultarDialogErrorEliminar() {
      this.mostrarDialogErrorEliminar = false;
    },
  },
};
</script>

<style>
.tabla {
  margin-top: 20px;
}
</style>