<template>
  <NavBarEmpleadoVue />
  <h1>Ingresar Vehículo</h1>
  <section>
    <div class="container">
      <div v-if="!mostrarMensaje">
        <FormularioGenerico type="text" etiqueta="Placa" v-model="placa" />


        <label class="label" for="marca">Marca</label>
        <Dropdown v-model="marca" :options="marcaOptions" optionLabel="label" placeholder="Selecciona una marca" />
        <FormularioGenerico type="text" etiqueta="Modelo" v-model="modelo" />
        <label class="label" for="AñoFabricación">Año de Fabricación</label>
        <InputText id="AñoFabricación" v-model="anio" type="text" />

        <FormularioGenerico type="text" etiqueta="País Fabricación" v-model="pFabricacion" />
        <FormularioGenerico type="number" etiqueta="Cilindraje" v-model="cilindraje" />
        <FormularioGenerico type="number" etiqueta="Avalúo" v-model="avaluo" />
        <FormularioGenerico type="number" etiqueta="Valor por día" v-model="valDia" />

        <div>
          <Button @click="ingreso" severity="danger" raised label="Ingresar vehículo" />
        </div>
      </div>

      <div v-else class="mensaje">
        <div v-if="registroExitoso">
          <Mensaje titulo="Registrado con Éxito" informacion="Se Ingresó el vehículo "
            @eventoMensaje="regresarEstado" />
        </div>
        <div v-else>
          <Mensaje titulo="Error al registrarse" informacion="Ocurrió un error al ingresar vehículo"
            @eventoMensaje="regresarEstado" />
        </div>
      </div>

      <div v-if="errorplaca">
        <MensajeTemp titulo="Error con los datos" informacion="Placa ya existente en la base de datos" />
      </div>
    </div>
  </section>
</template>

<script>
import FormularioGenerico from "../components/FormularioGenerico.vue";
import Mensaje from "@/components/Mensaje.vue";
import MensajeTemp from "@/components/MensajeTemp.vue";
import { insertarEmpleadoVehiculoFachada } from "../clients/clienteEmpleado.js";
import NavBarEmpleadoVue from "@/components/NavBarEmpleado.vue";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import FloatLabel from "primevue/floatlabel";

export default {
  name: "EmpleadoVehiculoIngresoPage",
  components: {
    FormularioGenerico,
    Mensaje,
    MensajeTemp,
    NavBarEmpleadoVue,
    InputText,
    Dropdown,
    Button,
    FloatLabel,
  },
  data() {
    return {
      marcaOptions: [
        { label: "Audi" },
        { label: "BMW" },
        { label: "Chevrolet" },
        { label: "Ford" },
        { label: "Honda" },
        { label: "Hyundai" },
        { label: "Kia" },
        { label: "Mazda" },
        { label: "Mercedes-Benz" },
        { label: "Nissan" },
        { label: "Toyota" },
        { label: "Volkswagen" },
        { label: "Volvo" },
        { label: "Fiat" },
        { label: "Jeep" },
        { label: "Subaru" },
        { label: "Tesla" },
        { label: "Porsche" },
        { label: "Lexus" },
        { label: "Infiniti" },
        { label: "Acura" },
        { label: "Jaguar" },
        { label: "Land Rover" },
        { label: "Mitsubishi" },
        { label: "Suzuki" },
        { label: "Chrysler" },
        { label: "Dodge" },
        { label: "GMC" },
        { label: "Ram" },
        { label: "Buick" },
        { label: "Cadillac" },
        { label: "Lincoln" },
        { label: "Alfa Romeo" },
        { label: "Genesis" },
        { label: "Mini" },
      ],
      Btn: "Guardar",

      placa: null,
      modelo: null,
      marca: null,
      anio: null,
      pFabricacion: null,
      cilindraje: null,
      avaluo: null,
      valDia: null,
      mostrarMensaje: false,
      registroExitoso: true,
      errorplaca: false,
    };
  },
  methods: {
    async ingreso() {
      const vehiculoBody = {
        placa: this.placa,
        modelo: this.modelo,

        marca: this.marca ? this.marca.label : null,
        anioFabricacion: this.anio,
        paisFabricacion: this.pFabricacion,
        cilindraje: this.cilindraje,
        avaluo: this.avaluo,
        renta: this.valDia,
      };

      try {
        const respuesta = await insertarEmpleadoVehiculoFachada(vehiculoBody);

        console.log(respuesta);
        if (respuesta === 1) {
          console.log("se ingreso un vehiculo");
          this.mostrarMensaje = true;
          this.registroExitoso = true;
        } else if (respuesta === 2) {
          console.log("Error al registrar vehiculo: Placa ya existente");
          this.errorplaca = true;

          setTimeout(() => {
            this.errorplaca = false;
          }, 3000);
        } else {
          console.error("Error al registrar cliente: ", respuesta);
          this.mostrarMensaje = true;
          this.registroExitoso = false;
        }
      } catch (error) {
        console.error("Error al registrar cliente: ", error);
        this.mostrarMensaje = true;
        this.registroExitoso = false;
      }

      this.placa = null;
      this.modelo = null;
      this.marca = null;
      this.anio = null;
      this.pFabricacion = null;
      this.cilindraje = null;
      this.avaluo = null;
      this.valDia = null;
    },

    regresarEstado() {
      this.mostrarMensaje = false;
    },
  },
};
</script>

<style scoped>
.mensaje {
  margin-top: 100px;
}
</style>
