import { Home, About } from '@/views';

const meta = { auth: true };

export default {
    path: '/',
    meta,
    component: () => import(`@/layouts/default.vue`),
    children: [
        { path: '', redirect: 'home' },
        { path: 'home', name: 'Home', component: Home, meta: { auth: true, chat: true} },
        { path: 'about', name: 'About', component: About, meta }
    ]
};