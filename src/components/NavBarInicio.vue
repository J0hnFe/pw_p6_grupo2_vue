<template>
  <img src="../assets/img1.jpg" class="imagen-header" alt="header">

  <header>
    <Menubar :model="items" class="custom-menubar">
      <template #start>
        <router-link :to="{ path: '/' }" class="menu-link">
          <img src="../assets/logo_carro.png" alt="Logo" class="logo" style="width: 250px;">
        </router-link>
      </template>

      <template #end>
        <h3>Rent a car</h3>
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
  },

  data() {
    return {
    };
  }
}
</script>

<style>
h2 {
  margin: 50px;
  font-size: 8vmin;
}
</style>
