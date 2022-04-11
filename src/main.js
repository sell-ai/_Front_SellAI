import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import './plugins/themes';
import './index.css';
import 'typeface-cairo';
import './plugins/yupi18';

axios.defaults.baseURL = 'https://localhost:7132/api/';

createApp(App).use(store).use(router).use(PrimeVue, {
    locale: {
        startsWith: 'Comenzar con',
        contains: 'Contiene',
        notContains: 'No contiene',
        endsWith: 'Termina con',
        equals: 'Iguales',
        notEquals: 'No iguales',
        noFilter: 'No Filtrar',
        lt: 'Menor que',
        lte: 'Menor o igual a',
        gt: 'Mayor que',
        gte: 'Mayor o igual a',
        dateIs: 'Fecha es',
        dateIsNot: 'Fecha no es',
        dateBefore: 'Fecha antes de',
        dateAfter: 'Fecha despues de',
        clear: 'Limpiar',
        apply: 'Aplicar',
        matchAll: 'Coincidir con todo',
        matchAny: 'Coincidir con cualquiera',
        addRule: 'Agregar regla',
        removeRule: 'Remover regla',
        accept: 'Si',
        reject: 'No',
        choose: 'Elegir',
        upload: 'Subir',
        cancel: 'Cancelar',
        dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        dayNamesMin: ["Do","Lu","Ma","Mi","Ju","Vi","Sa"],
        monthNames: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
        monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun","Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        today: 'Hoy',
        weekHeader: 'Wk',
        firstDayOfWeek: 1,
        dateFormat: 'dd/mm/yy',
        weak: 'Débil',
        medium: 'Medio',
        strong: 'Fuerte',
        passwordPrompt: 'Ingrese contraseña',
        emptyFilterMessage: 'No se han encontrado resultados',
        emptyMessage: 'Sin opciones disponibles'
    }
}).use(ToastService).mount('#app');
