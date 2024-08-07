<template>
  <NavBarEmpleado />
  <h1>Rentar Vehículo</h1>
  <section>
    <div class="container">
      <div class="arriba">

        <label class="label" for="marca">Marca</label>
        <Dropdown v-model="marca" :options="marcaOptions" optionLabel="label" placeholder="Selecciona una marca" />
        <FloatLabel>
          <InputText id="modelo" v-model="modelo" />
          <label for="modelo">Modelo</label>
        </FloatLabel>

        <Button @click="buscar" severity="danger" raised label="Buscar" />

      </div>
      <div class="tabla" v-if="existeBusqueda">
        <table>
          <thead>
            <tr>
              <th>Placa</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Estado</th>
              <th>Precio Diario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="vehiculo in listadoVehiculos" :key="vehiculo.id">
              <td>{{ vehiculo.placa }}</td>
              <td>{{ vehiculo.marca }}</td>
              <td>{{ vehiculo.modelo }}</td>
              <td>{{ vehiculo.estado }}</td>
              <td>{{ vehiculo.renta }}</td>
              <td>


                <router-link :to="{
                  path: '/rentarGlobal',
                  query: {
                    id: vehiculo.id,
                    placa: vehiculo.placa,
                    estado: vehiculo.estado,
                    marca: vehiculo.marca,
                    modelo: vehiculo.modelo,
                  },
                }">Rentar</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </section>
</template>

<script>
import { consultarVehiculoPorMarcaYModeloFachada } from "@/clients/clienteCliente";
import FloatLabel from 'primevue/floatlabel';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

import NavBarVue from '@/components/NavBar.vue';
import NavBarEmpleado from '@/components/NavBarEmpleado.vue';
export default {
  components: {
    FloatLabel,
    Button, InputText, Dropdown, NavBarVue, NavBarEmpleado

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
      id: null,
      existeBusqueda: false,
      listadoVehiculos: [],
      marca: null,
      modelo: null,
    };
  },
  methods: {
    async buscar() {

      this.existeBusqueda = true;
      this.listadoVehiculos = await consultarVehiculoPorMarcaYModeloFachada(
        this.marca.label,
        this.modelo
      );
    },
  },
};
</script>

<style scoped></style>