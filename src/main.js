import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './index.css';
import 'typeface-cairo';
import './plugins/yupi18';

axios.defaults.baseURL = 'http://localhost:3000/api/';

createApp(App).use(store).use(router).mount('#app');
