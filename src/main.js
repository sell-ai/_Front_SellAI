import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import PrimeVue from 'primevue/config';
import './plugins/themes';
import './index.css';
import 'typeface-cairo';
import './plugins/yupi18';

axios.defaults.baseURL = 'https://localhost:7132/api/';

createApp(App).use(store).use(router).use(PrimeVue).mount('#app');
