import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import ViewAdmin from '../views/admin/viewCreate.vue';
import ViewDesign from '../views/admin/viewDesign.vue';
import Example from '../views/Example.vue';
import ListProduct from '../views/articulos/list.vue';
import ListCategory from '../views/articulos/categorias.vue';
import ListBrand from '../views/articulos/marcas.vue';
import ListMoneda from '../views/articulos/monedas.vue';
import ListProveedor from '../views/articulos/proveedor.vue';

import Cookies from 'js-cookie'

const meta = { auth: true }
const routes = [
  {
    path: '/',
    component: () => import(`@/layouts/default.vue`),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta,
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta,
      },
      {
        path: '/view',
        name: 'ViewAdmin',
        component: ViewAdmin,
        meta,
      },
      {
        path: '/viewD',
        name: 'ViewDesign',
        component: ViewDesign,
        meta,
      },
      {
        path: '/example',
        name: 'Example',
        component: Example,
        meta,
      },
      {
        path: '/articulos',
        name: 'Articulos',
        component: ListProduct,
        meta,
      },
      {
        path: '/categorias',
        name: 'Categorias',
        component: ListCategory,
        meta,
      },
      {
        path: '/marcas',
        name: 'Marcas',
        component: ListBrand,
        meta,
      },
      {
        path: '/moneda',
        name: 'Moneda',
        component: ListMoneda,
        meta,
      },
      {
        path: '/proveedor',
        name: 'Proveedor',
        component: ListProveedor,
        meta,
      },
    ]
  },
  {
    component: () => import(`@/layouts/empty.vue`),
    children: [
      {
        path: '/Login',
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
