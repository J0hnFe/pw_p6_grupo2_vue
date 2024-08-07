<template>
  <NavBarEmpleadoVue />
  <h1>Registro cliente</h1>
  <section>
    <div class="container">

      <div v-if="!mostrarMensaje">

        <FormularioGenerico type="text" etiqueta="Cédula" v-model="cedula" />

        <FormularioGenerico type="text" etiqueta="Nombre" v-model="nombre" />

        <FormularioGenerico type="text" etiqueta="Apellido" v-model="apellido" />
        <label class="label" for="fechaNacimiento">Fecha de Nacimiento</label>
        <InputText id="fechaNacimiento" v-model="fNacimiento" type="date" />

        <FloatLabel>
          <label class="label" for="genero">Genero</label>
          <Dropdown id="genero" v-model="genero" :options="generoOptions" optionLabel="label"
            placeholder="Selecciona un género" />
          <div>

          </div>
        </FloatLabel>

        <Button @click="insertar" severity="danger" raised label="Ingresar cliente" />

      </div>

      <div v-else class="mensaje">
        <div v-if="registroExitoso">
          <Mensaje titulo="Registrado con Éxito" informacion="Se Ingreso el cliente" @eventoMensaje="regresarEstado" />
        </div>
        <div v-else>
          <Mensaje titulo="Error al registrarse" informacion="Ocurrió un error al registrarse"
            @eventoMensaje="regresarEstado" />
        </div>
      </div>
      <div v-if="errorcedula">

        <p>Cedula ya existente en la base de datos</p>

      </div>
    </div>
  </section>
</template>

<script>

import FormularioGenerico from "../components/FormularioGenerico.vue";
import Mensaje from "@/components/Mensaje.vue";
import { insertarEmpleadoClienteFachada } from "../clients/clienteEmpleado.js";
import MensajeTemp from "@/components/MensajeTemp.vue";

import NavBarEmpleadoVue from '@/components/NavBarEmpleado.vue';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
export default {
  name: "EmpleadoClienteRegistroPage",
  components: {
    FormularioGenerico,
    Mensaje,
    MensajeTemp,
    NavBarEmpleadoVue, InputText,
    Dropdown, Button
  },
  data() {
    return {
      generoOptions: [
        { label: 'Masculino' },
        { label: 'Femenino' },
        { label: 'Otro' }
      ],
      cedula: null,
      nombre: null,
      apellido: null,
      fNacimiento: null,
      genero: null,
      mostrarMensaje: false,
      registroExitoso: true,
      errorcedula: false
    };
  },
  methods: {
    async insertar() {
      const clienteBody = {
        nombre: this.nombre,
        apellido: this.apellido,
        genero: this.genero ? this.genero.label : null,
        fechaNacimiento: this.fNacimiento,
        numeroCedula: this.cedula,
      };

      console.log("Cliente Recibido ", clienteBody);
      console.log("ClienteRegistro: ", clienteBody.numeroCedula);

      try {
        const respuesta = await insertarEmpleadoClienteFachada(clienteBody);
        console.log(respuesta);
        if (respuesta === 1) {
          console.log("se ingreso un vehiculo");
          this.mostrarMensaje = true;
          this.registroExitoso = true;
        } else if (respuesta === 2) {
          console.log("Error al registrar cliente: cedula ya existente");
          this.errorcedula = true; 

          setTimeout(() => {
            this.errorcedula = false;
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

      this.nombre = null;
      this.apellido = null;
      this.genero = null;
      this.fNacimiento = null;
      this.cedula = null;
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