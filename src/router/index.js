import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import ListProduct from '../views/articulos/list.vue';
import ListCategory from '../views/articulos/categorias.vue';
import ListBrand from '../views/articulos/marcas.vue';
import ListMoneda from '../views/articulos/monedas.vue';
import ListSituaciones from '../views/stock/situaciones.vue';
import ListMovimientos from '../views/stock/movimientos.vue';
import ListPagos from '../views/pagos/list.vue';
import ListVentas from '../views/ventas/list.vue';
import AiCarga from '../views/ai/cargar.vue';
import PathNotFound from '../layouts/notfound.vue';

import Cookies from 'js-cookie'

const meta = { auth: true }
const routes = [
  {
    path: '/',
    component: () => import(`@/layouts/default.vue`),
    meta,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta,
      },
      {
        path: 'about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta,
      },
      {
        path: 'articulos',
        name: 'Articulos',
        component: ListProduct,
        meta,
      },
      {
        path: 'categorias',
        name: 'Categorias',
        component: ListCategory,
        meta,
      },
      {
        path: 'marcas',
        name: 'Marcas',
        component: ListBrand,
        meta,
      },
      {
        path: 'moneda',
        name: 'Moneda',
        component: ListMoneda,
        meta,
      },
      {
        path: 'situaciones',
        name: 'Situaciones',
        component: ListSituaciones,
        meta,
      },
      {
        path: 'movimientos',
        name: 'Movimientos',
        component: ListMovimientos,
        meta,
      },
      {
        path: 'formaspagos',
        name: 'FormasPagos',
        component: ListPagos,
        meta,
      },
      {
        path: 'ventas',
        name: 'Ventas',
        component: ListVentas,
        meta,
      },
      {
        path: 'ai',
        name: 'AI',
        component: AiCarga,
        meta,
      },
      { path: '/:pathMatch(.*)*', component: PathNotFound },
    ]
  },
  {
    component: () => import(`@/layouts/empty.vue`),
    path: '/',
    children: [
      {
        path: '/login',
        name: 'Login',
        components: {
          empty: () => import(`@/views/login/login.vue`)
        },
        meta: {
          auth: false
        },
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
    document.title = `${ process.env.VUE_APP_TITLE } - ${ to.name }`;
    if (to.matched.some(r => r.meta.auth)) {
        const token = Cookies.get('token');
        if (token && token !== 'undefined' && token.length > 0) {
            next()
        } else {
            next({ name: 'Login' })
        }
    } else {
        next()
    }
})

export default router;
