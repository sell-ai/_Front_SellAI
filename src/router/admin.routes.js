import { Menu } from '@/views/admin';

const meta = { auth: true };

export default {
    path: '/admin',
    component: () => import(`@/layouts/default.vue`),
    children: [
        { path: '', redirect: 'intents' },
        { path: 'intents', name: 'Intenciones', component: Menu, meta },
    ]
};