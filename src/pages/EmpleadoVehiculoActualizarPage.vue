<template>
  <div>
    <NavBarEmpleadoVue />
    <h1>Actualizar Vehículo</h1>
    <section>
      <div class="container">
        <div v-if="vehiculo">
          <FormularioGenerico type="text" etiqueta="Placa" v-model="vehiculo.placa" />

          <FormularioGenerico type="text" etiqueta="Modelo" v-model="vehiculo.modelo" />

          <label class="label" for="marca">Marca</label>
          <Dropdown v-model="vehiculo.marca" :options="marcaOptions" optionLabel="label" placeholder="Selecciona una marca" />

          <label class="label" for="anioFabricacion">Año de Fabricación</label>
          <InputText id="anioFabricacion" v-model="vehiculo.anioFabricacion" type="date" />

          <FormularioGenerico type="text" etiqueta="País Fabricación" v-model="vehiculo.paisFabricacion" />

          <FormularioGenerico type="number" etiqueta="Cilindraje" v-model="vehiculo.cilindraje" />

          <FormularioGenerico type="number" etiqueta="Avalúo" v-model="vehiculo.avaluo" />

          <FormularioGenerico type="number" etiqueta="Valor por día" v-model="vehiculo.renta" />

          <Button @click="actualizar" severity="danger" raised label="Actualizar Vehículo" />

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
import { actualizarEmpleadoVehiculoFachada } from "../clients/clienteEmpleado.js";
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import NavBarEmpleadoVue from '@/components/NavBarEmpleado.vue';
import Dialog from 'primevue/dialog';

export default {
  name: "EmpleadoVehiculoActualizarPage",
  components: {
    FormularioGenerico,
    NavBarEmpleadoVue,
    InputText,
    Dropdown,
    Button,
    Dialog
  },
  data() {
    return {
      marcaOptions: [
        { label: 'Toyota', value: 'toyota' },
        { label: 'Honda', value: 'honda' },
        { label: 'Ford', value: 'ford' },
        { label: 'Chevrolet', value: 'chevrolet' },
        { label: 'Audi', value: 'audi' },
        { label: 'Otro', value: 'otro' }
      ],
      vehiculo: JSON.parse(localStorage.getItem('vehiculoParaActualizar')) || {
        placa: null,
        modelo: null,
        marca: null,
        anioFabricacion: null,
        paisFabricacion: null,
        cilindraje: null,
        avaluo: null,
        renta: null
      },
      mostrarDialogDatosIncompletos: false,
      mostrarDialogCorrecto: false,
    };
  },
  methods: {
    async actualizar() {
      // Verificar si todos los campos están llenos
      if (
        this.vehiculo.placa &&
        this.vehiculo.modelo &&
        this.vehiculo.marca &&
        this.vehiculo.anioFabricacion &&
        this.vehiculo.paisFabricacion &&
        this.vehiculo.cilindraje &&
        this.vehiculo.avaluo &&
        this.vehiculo.renta
      ) {
        const vehiculoBody = {
          placa: this.vehiculo.placa,
          modelo: this.vehiculo.modelo,
          marca: this.vehiculo.marca.label,
          anioFabricacion: this.vehiculo.anioFabricacion,
          paisFabricacion: this.vehiculo.paisFabricacion,
          cilindraje: this.vehiculo.cilindraje,
          avaluo: this.vehiculo.avaluo,
          renta: this.vehiculo.renta,
        };

        const placaParaBuscar = vehiculoBody.placa;
        await actualizarEmpleadoVehiculoFachada(
          this.$route.params.id,
          vehiculoBody
        );

        this.mostrarDialogCorrecto = true;
        setTimeout(() => {
          this.mostrarDialogCorrecto = false;
          this.$router.push({
            name: "VisualizarVehiculo",
            params: { placa: placaParaBuscar },
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

    // Limpiar campos después de la actualización
    limpiarCampos() {
      this.vehiculo = {
        placa: null,
        modelo: null,
        marca: null,
        anioFabricacion: null,
        paisFabricacion: null,
        cilindraje: null,
        avaluo: null,
        renta: null
      };
    },

    // Ocultar dialog de datos incompletos
    ocultarDialogDatosIncompletos() {
      this.mostrarDialogDatosIncompletos = false;
    },

    // Ocultar dialog de actualización correcta
    ocultarDialogCorrecto() {
      this.mostrarDialogCorrecto = false;
    },
  },
};
</script>

<style scoped>
/* Estilos opcionales para personalizar los dialogs */
</style>