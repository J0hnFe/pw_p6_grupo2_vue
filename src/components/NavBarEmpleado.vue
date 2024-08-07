<template>
  <img src="../assets/img1.jpg" class="imagen-header" alt="header">

  <header>

    <Menubar :model="items" class="custom-menubar">
      <template #start>
        <router-link :to="{ path: '/empleados' }" class="menu-link">
          <h3>Empleados</h3>
        </router-link>
      </template>
      <template #end>
        <router-link :to="{ path: '/' }" class="menu-link">
          <img src="../assets/logo_carro.png" alt="Logo" class="logo" style="width: 250px;">
        </router-link>
      </template>
    </Menubar>

  </header>
</template>

<script>

import Menubar from 'primevue/menubar';
export default {

  components: {
    Menubar
  }, data() {
    return {
      items: [
        {
          label: 'Cliente',
          icon: 'pi pi-fw pi-user',

          items: [{
            label: 'Registrar Cliente',

            command: () => {
              this.$router.push('/empleados/clientes/registro');
            }
          }, {
            label: 'Buscar Cliente',

            command: () => {
              this.$router.push('/empleados/clientes/busqueda');
            }

          }
          ]
        },
        {
          label: 'Vehículo',
          icon: 'pi pi-fw pi-car',
          items: [{
            label: 'Nuevo Vehículo',

            command: () => {
              this.$router.push('/empleados/vehiculo/ingreso');
            }
          }, {
            label: 'Buscar Vehículo',
            command: () => {
              this.$router.push('/empleados/vehiculo/busqueda');
            }

          }
          ]

        }, {
          label: 'Reserva',
          icon: 'pi pi-fw pi-shopping-cart',
          items: [{
            label: 'Retiro con reserva',
            command: () => {
              this.$router.push('/empleado/reserva/retiro');
            }
          },
          ]
        }, {
          label: 'Reportes',
          icon: 'pi pi-fw pi-file',

          command: () => {
            this.$router.push('/empleados/reportes');
          }
        }
      ]
    };
  }

}
</script>
<style></style>