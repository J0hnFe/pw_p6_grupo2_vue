
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import router from './router/router'
import './css/styles.css'

// Libreria primevue para íconos
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primevue/resources/primevue.min.css'

createApp(App).use(router).use(PrimeVue, ToastService).mount('#app')
