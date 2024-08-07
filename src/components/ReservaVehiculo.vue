<template>
  <section>
    <div class="container">
      <div v-if="!reservaRealizada">
        <div class="contenedor">
          <FloatLabel>
            <InputText id="placa" v-model="placa" />
            <label for="placa">Placa</label>
          </FloatLabel>
          <FloatLabel>
            <InputText id="cedula" v-model="cedula" />
            <label for="cedula">Cédula</label>
          </FloatLabel>

          <label class="label" for="fechaInicio">Fecha Inicio</label>
          <InputText id="fechaInicio" v-model="fechaInicio" type="date" :min="fechaMinima"
            @input="validarFechaInicio" />

          <label class="label" for="fechaFin">Fecha Fin</label>
          <InputText id="fechaFin" v-model="fechaFin" type="date" :min="fechaInicio" @input="validarFechaFin" />

          <Button @click="presionarBoton" severity="danger" raised label="Verificar Disponibilidad" />
        </div>

        <div class="mensajes" v-if="imprimirMenjajes">
          <div>
            <div v-if="vehiculoDisponible" class="mensajeOk">
              <h3>Vehículo Disponible</h3>
              <h5>Es posible rentar el vehículo</h5>
              <h4>El valor total a pagar es:</h4>
              <h3>$ {{ valorTotal }}</h3>

              <FloatLabel>
                <InputText id="tarjeta" type="number" v-model="tarjeta" />
                <label for="tarjeta">Ingrese su Número Tarjeta de Crédito</label>
              </FloatLabel>

              <Button @click="reservar" severity="danger" raised label="Reservar" />
            </div>
            <div v-else class="mensajeBad">
              <h3>Vehículo No Disponible</h3>
              <h5>No es posible rentar el vehículo en las fechas solicitadas.</h5>
              <h3>El vehículo no se encontrará disponible las siguientes fechas</h3>
              <template v-if="
                Array.isArray(fechasDeshabilitadas) &&
                fechasDeshabilitadas.length > 0
              ">
                <ul>
                  <li v-for="fecha in fechasUnicas" :key="fecha">
                    {{ fecha }}
                  </li>
                </ul>
              </template>
              <template v-else>
                <h2>No hay fechas disponibles</h2>
              </template>
              <h5>Por favor, cambie las fechas e intente nuevamente.</h5>

              <Button @click="cambiarFechas" severity="danger" raised label="Cambiar fechas" />
            </div>
          </div>
        </div>
      </div>

      <div ref="pdfContent" v-else class="reservaCorrecta">
        <h1>Vehículo Reservado con éxito</h1>
        <h2>Estimado usuario, se ha generado el número de reserva:</h2>
        <h2>{{ numeroReserva }}</h2>

        <h4>Para el vehículo:</h4>
        <p>
          <span><strong>Marca:</strong> {{ marca }}</span><br />
          <span><strong>Modelo:</strong> {{ modelo }}</span><br />
          <span><strong>Placa:</strong> {{ placa }}</span>
        </p>
        <h4>El periodo de vigencia de la renta es:</h4>
        <p>
          <span><strong>Fecha de Inicio:</strong> {{ fechaInicio }}</span><br />
          <span><strong>Fecha de Fin:</strong> {{ fechaFin }}</span>
        </p>
      </div>
      <div class="botonesReserva">
        <Button v-if="generacion" @click="regresarPaginaPrincipal" severity="danger" raised label="Aceptar" />
      </div>
    </div>
  </section>
</template>

<script>

import {
  consultarClientePorCIFachada,
  consultarValorTotalFachada,
  guardarRentaFachada,
  consultarReservaPorPlacaFachada,
  consultarfechasRentasPorVehiculoFachada,
} from "@/clients/clienteCliente";
import FloatLabel from "primevue/floatlabel";

import Button from "primevue/button";
import InputText from "primevue/inputtext";

import NavBarInicioVue from "@/components/NavBarInicio.vue";
export default {
  components: {
    InputText,
    FloatLabel,
    Button,
    NavBarInicioVue,
  },
  props: {},
  data() {
    return {
      placa: this.$route.query.placa,
      cedula: "",
      fechaInicio: "",
      fechaFin: "",
      estado: this.$route.query.estado,
      marca: this.$route.query.marca,
      modelo: this.$route.query.modelo,
      imprimirMenjajes: false,
      vehiculoDisponible: false,
      reservaRealizada: false,
      tarjeta: null,
      valorTotal: 100,
      numeroReserva: null,
      fechaDisponibilidad: null,
      formulario: false,
      fechaMinima: this.getFechaMinima(),
      fechasDeshabilitadas: [],
      fechasNoValidas: [],
      miLista: null,
      generacion: false,
    };
  },
  created() {
    this.ejemplo();
    console.log(this.fechasDeshabilitadas);
  },

  mounted() {

  },
  computed: {
    fechasUnicas() {
      if (!Array.isArray(this.fechasDeshabilitadas)) return [];
      console.log(this.fechaDisponibilidad);
      const conjuntoFechas = new Set(this.fechasDeshabilitadas);
      return Array.from(conjuntoFechas);
    },
  },
  methods: {
    async ejemplo() {
      this.fechasNoValidas = await consultarfechasRentasPorVehiculoFachada(
        this.$route.query.placa
      );
      this.fechasDeshabilitadas = await consultarfechasRentasPorVehiculoFachada(
        this.$route.query.placa
      );
    },
    formatearFecha(fecha) {
      const fechaObj = new Date(fecha);
      const dia =
        fechaObj.getDate() < 10 ? `0${fechaObj.getDate()}` : fechaObj.getDate();
      const mes =
        fechaObj.getMonth() + 1 < 10
          ? `0${fechaObj.getMonth() + 1}`
          : fechaObj.getMonth() + 1;
      const año = fechaObj.getFullYear();
      return `${dia} - ${mes} - ${año}`;
    },
    regresarPaginaPrincipal() {
      this.$emit("envioReserva", this.numeroReserva)
    },
    async presionarBoton() {
      if (!this.placa || !this.cedula || !this.fechaInicio || !this.fechaFin) {
        alert(
          "Por favor, completa todos los campos antes de verificar la disponibilidad."
        );
      } else if (this.fechaFin < this.fechaInicio) {
        alert(
          "¡Error de fecha!\nCambia las fechas para rentar un vehículo"
        );
        this.cambiarFechas();
      } else {
        await this.buscarCedula();
        await this.fechasDisponibilidad();
        if (this.formulario) {
          const fechasEntreInicioYFin = this.obtenerFechasEntreInicioYFin();
          const fechasDeshabilitadas = this.fechasDeshabilitadas.map(
            (fecha) => new Date(fecha)
          );

          const coincidencia = fechasEntreInicioYFin.some((fecha) =>
            fechasDeshabilitadas.some(
              (deshabilitada) => fecha.getTime() === deshabilitada.getTime()
            )
          );

          if (!coincidencia) {
            this.vehiculoDisponible = true;
            const cotizacion = {
              placa: this.placa,
              fechaInicio: this.fechaInicio,
              fechaFin: this.fechaFin,
            };
            this.valorTotal = await consultarValorTotalFachada(cotizacion);
          } else {
            this.vehiculoDisponible = false;
            const res = await consultarReservaPorPlacaFachada(this.placa);
            console.log(res);
            this.fechaDisponibilidad = res.fechaFin;
          }
          this.imprimirMenjajes = true;
        } else {
          alert(
            "Se produjo un error al buscar la cédula. Por favor, ingrese una cédula válida."
          );
        }
      }
    },
    obtenerFechasEntreInicioYFin() {
      const fechas = [];
      const inicio = new Date(this.fechaInicio);
      const fin = new Date(this.fechaFin);
      const unDia = 24 * 60 * 60 * 1000; // milisegundos diarios

      for (
        let fecha = inicio;
        fecha <= fin;
        fecha.setDate(fecha.getDate() + 1)
      ) {
        fechas.push(new Date(fecha));
      }
      return fechas;
    },
    async fechasDisponibilidad() {
      const listaFechas = await consultarfechasRentasPorVehiculoFachada(
        this.placa
      );
      console.log(listaFechas);
    },
    async buscarCedula() {
      try {
        const c = await consultarClientePorCIFachada(this.cedula);
        console.log(c);
        if (c !== null) {
          this.formulario = true;
        } else {
          this.formulario = false;
          alert("Cédula no encontrada, por favor inténtelo de nuevo.");
        }
      } catch (error) {
        alert(
          "Se produjo un error al buscar la cédula. Por favor, ingrese una cédula válida."
        );
      }
    },
    cambiarFechas() {
      this.fechaInicio = null;
      this.fechaFin = null;
      this.imprimirMenjajes = false;
    },
    async reservar() {
      const renta = {
        placa: this.placa,
        cedula: this.cedula,
        tarjeta: this.tarjeta,
        fechaInicio: this.fechaInicio,
        fechaFin: this.fechaFin,
      };

      const reserva = await guardarRentaFachada(renta);
      console.log(reserva);
      console.log(reserva.numeroReserva);
      this.numeroReserva = reserva.numeroReserva;
      this.reservaRealizada = true;
      this.generacion = true;
    },
    getFechaMinima() {
      const hoy = new Date();
      const mes =
        hoy.getMonth() + 1 < 10 ? `0${hoy.getMonth() + 1}` : hoy.getMonth() + 1;
      const dia = hoy.getDate() < 10 ? `0${hoy.getDate()}` : hoy.getDate();
      return `${hoy.getFullYear()}-${mes}-${dia}`;
    },

    validarFechaInicio() {
      this.validarFecha(this.fechaInicio);
    },

    validarFechaFin() {
      this.validarFecha(this.fechaFin);
    },

    validarFecha(fecha) {
      if (fecha) {
        const fechaSeleccionada = new Date(fecha);

        // Verificar si la fecha es válida
        if (
          isNaN(fechaSeleccionada.getTime()) ||
          this.fechasNoValidas.includes(fecha)
        ) {
          alert("Fecha no válida. Por favor, selecciona una fecha válida.");
        }
      }
    },
  },
};
</script>

<style scoped></style>