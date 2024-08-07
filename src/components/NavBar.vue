<template>

  <img src="../assets/img1.jpg" class="imagen-header" alt="header">
  <header>

    <Menubar :model="items" class="custom-menubar">
      <template #start>

        <router-link :to="{ path: '/clientes' }" class="menu-link">
          <h3>Clientes</h3>
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
  name: 'NavBar',

  components: {
    Menubar
  }, data() {
    return {
      items: [
        {
          label: 'Registro',
          icon: 'pi pi-fw pi-users',
          command: () => {
            this.$router.push('/registro');
          }
        },
        {
          label: 'Actualizacion de datos',
          icon: 'pi pi-fw pi-user-edit',
          command: () => {
            this.$router.push('/actualizar');
          }
        }, {
          label: 'Buscar un auto',
          icon: 'pi pi-fw pi-car',
          command: () => {
            this.$router.push('/renta');
          }
        },


      ]
    };
  }
}
</script>

<style></style>