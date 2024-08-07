<template>
  <section>
    <div class="container">
      <div class="center-input">
        <FloatLabel>
          <InputText id="numeroReserva" v-model="nReserva" />
          <label for="numeroReserva">Numero de reserva</label>
        </FloatLabel>
        <Button @click="buscarRetiroPorNReserva" severity="danger" raised label="Buscar reserva" />
      </div>
      <div v-if="mostrarTabla">
        <h2>Reserva</h2>
        <DataTable class="table" :value="datos">
          <Column field="placa" header="Placa"></Column>
          <Column field="modelo" header="Modelo"></Column>
          <Column field="estado" header="Estado"></Column>
          <Column field="fecha" header="Fecha"></Column>
          <Column field="reservadoPor" header="Reservado por"></Column>
          <Column header="Acciones">
            <template #body="slotProps">
              <Button @click="confirmarRetiro(slotProps.data)" v-if="slotProps.data.estado === 'Disponible'" class="custom-button"
                      raised label="Retirar auto" />
              <p v-else-if="slotProps.data.estado === 'No Disponible'" class="error-message">Auto actualmente retirado</p>
            </template>
          </Column>
        </DataTable>
      </div>
      <div v-else>
        <p v-if="busquedaFallida" class="error-message"></p>
        <p v-else class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
  </section>

  <!-- Dialog mensaje de búsqueda sin resultados -->
  <Dialog v-model="displayDialogBusqueda" :visible="displayDialogBusqueda" header="Mensaje"
    :style="{ 'background-color': 'rgba(0, 0, 0, 0.5)', 'backdrop-filter': 'blur(8px)' }">
    <p>No existen reservas con el número ingresado.</p>
    <div class="dialog-footer">
      <Button @click="displayDialogBusqueda = false" label="Cerrar" class="p-button-danger" />
    </div>
  </Dialog>

  <!-- Dialog mensaje de reserva exitosa -->
  <Dialog v-model="displayDialogReserva" :visible="displayDialogReserva" header="Mensaje"
    :style="{ 'background-color': 'rgba(0, 0, 0, 0.5)', 'backdrop-filter': 'blur(8px)' }">
    <p>Reserva exitosa.</p>
    <div class="dialog-footer">
      <Button @click="displayDialogReserva = false" label="Cerrar" class="p-button-danger" />
    </div>
  </Dialog>
</template>

<script>
import { actualizarRetiroFachada, consultarReservaFachada } from '@/clients/clienteEmpleado';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Dialog from 'primevue/dialog';

import NavBarEmpleadoVue from '@/components/NavBarEmpleado.vue';

export default {
  components: {
    DataTable,
    NavBarEmpleadoVue,
    Column,
    Button,
    InputText,
    FloatLabel,
    Dialog
  },
  props: {
    valor: {
      type: String,
      required: true
    }
  },
  created() {
    console.log(this.valor)
    this.nReserva = this.valor
  },
  data() {
    return {
      nReserva: '',
      datos: [],
      mostrarTabla: false,
      busquedaFallida: false,
      errorMessage: '',
      displayDialogBusqueda: false,
      displayDialogReserva: false
    };
  },
  methods: {
    async buscarRetiroPorNReserva() {
      this.mostrarTabla = false;
      this.busquedaFallida = false;
      this.errorMessage = '';

      try {
        const resultadoConsulta = await consultarReservaFachada(this.nReserva);
        console.log(resultadoConsulta);

        const data = [
          {
            placa: resultadoConsulta.placa,
            modelo: resultadoConsulta.modelo,
            estado: resultadoConsulta.estado,
            fecha: resultadoConsulta.fecha,
            reservadoPor: resultadoConsulta.reservadoPor
          }
        ];
        this.datos = data;
        this.mostrarTabla = true;
        this.displayDialogBusqueda = false; // Ocultar el dialog de búsqueda sin resultados
      } catch (error) {
        this.busquedaFallida = true;
        this.errorMessage = 'Error al buscar la reserva. Inténtalo de nuevo.';
        console.error(error);
        this.displayDialogBusqueda = true; // Mostrar el dialog de búsqueda sin resultados
      }
    },
    async confirmarRetiro(dato) {
      this.errorMessage = '';

      try {
        if (dato.estado === 'Disponible') {
          await actualizarRetiroFachada(this.nReserva);
          this.mostrarMensajeDialog('reservaExitosa');
          this.datos = this.datos.map(d => d.placa === dato.placa ? { ...d, estado: 'No Disponible' } : d);
          console.log('Auto retirado exitosamente');
        } else {
          this.mostrarMensajeDialog('noDisponible');
        }
      } catch (error) {
        this.errorMessage = 'Error al retirar el auto. Inténtalo de nuevo.';
        console.error(error);
      }
    },
    mostrarMensajeDialog(tipo) {
      if (tipo === 'reservaExitosa') {
        this.displayDialogReserva = true;
      } else if (tipo === 'noDisponible') {
        this.displayDialogReserva = false; 
        this.displayDialogBusqueda = false; 
      }
    }
  }
};
</script>

<style scoped>
.error-message {
  color: rgb(190, 190, 190);
}

.dialog-footer {
  text-align: right;
  margin-top: 20px;
}

.custom-button {
  background-color: #ff0000; 
  color: #ffffff; 
  border: none; 
  padding: 10px 20px; 
  border-radius: 5px; 
  cursor: pointer; 
}

.custom-button:hover {
  background-color: #cc0000; 
}
</style>