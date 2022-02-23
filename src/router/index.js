import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ViewAdmin from '../views/admin/viewCreate.vue';
import ViewDesign from '../views/admin/viewDesign.vue';
import Example from '../views/Example.vue';
import Login from '../views/login/login.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/view',
    name: 'ViewAdmin',
    component: ViewAdmin,
  },
  {
    path: '/viewD',
    name: 'ViewDesign',
    component: ViewDesign,
  },
  {
    path: '/example',
    name: 'Example',
    component: Example,
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
