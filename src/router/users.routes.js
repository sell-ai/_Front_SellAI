import Layout from '@/layouts/empty.vue';
import { Login } from '@/views/login/index.js';

const meta = { auth: false };

export default {
    path: '/users',
    component: Layout,
    children: [
        { path: '', redirect: 'login' },
        { path: 'login', name: 'Login', meta, components: {
            empty: Login
        } }
    ]
};