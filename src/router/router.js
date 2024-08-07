import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../pages/PaginaInicio.vue')
  },
  {
    path: '/empleados/reportes',
    component: () => import('../pages/ReportePage.vue')
  },
  {
    path: '/empleados',
    component: () => import('../pages/EmpleadoPage.vue')
  },
  {
    path: '/empleados/clientes/registro',
    component: () => import('../pages/EmpleadoClienteRegistroPage.vue')
  },
  {
    path: '/empleados/clientes/busqueda',
    component: () => import('../pages/EmpleadoClienteBusquedaPage.vue')
  },
  {
    path: '/empleados/clientes/visualizar/:cedula',
    name: 'VisualizarCliente',
    component: () => import('../pages/EmpleadoClienteVisualizarPage.vue')
  },
  {
    path: '/empleados/clientes/actualizar/:id',
    name: 'ActualizarCliente',
    component: () => import('../pages/EmpleadoClienteActualizarPage.vue')
  },
  {
    path: '/empleados/vehiculo/ingreso',
    component: () => import('../pages/EmpleadoVehiculoIngresoPage.vue')
  },
  {
    path: '/empleados/vehiculo/busqueda',
    component: () => import('../pages/EmpleadoVehiculoBusquedaPage.vue')
  },
  {
    path: '/empleados/vehiculo/visualizar/:placa',
    name: 'VisualizarVehiculo',
    component: () => import('../pages/EmpleadoVehiculoVisualizarPage.vue')
  },
  {
    path: '/empleados/vehiculo/actualizar/:id',
    name: 'ActualizarVehiculo',
    component: () => import('../pages/EmpleadoVehiculoActualizarPage.vue'),
    props: true
  },
  {
    path: '/empleado/reserva/retiro',
    component: () => import('../pages/EmpleadoRetirarPage.vue')
  },
  {
    path: '/registro',
    component: () => import('../pages/ClienteRegistro.vue')
  },
  {
    path: '/actualizar',
    component: () => import('../pages/ClienteActualizar.vue')
  },
  {
    path: '/renta',
    component: () => import('../pages/ClienteRentar.vue')
  },
  {
    path: '/clientes',
    component: () => import('../pages/Clientes.vue')
  },
  {
    path: '/rentar',
    component: () => import('../pages/VehiculoRentar.vue')
  },
  {
    path: '/empleados/rentar',
    component: () => import('../pages/EmpleadoRentar.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../pages/NoFoundPage.vue')
  },
  {
    path: '/cliente/reserva',
    component: () => import('../pages/ClienteReserva.vue')
  }
];

// Configurar router
const router = createRouter({ history: createWebHashHistory(), routes });

// Exportar la configuración:
export default router;