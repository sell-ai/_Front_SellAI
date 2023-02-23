import { Categorias, Marcas, Monedas } from '@/views/articles';

const meta = { auth: true };

export default {
    path: '/article',
    component: () => import(`@/layouts/default.vue`),
    children: [
        { path: '', redirect: 'category' },
        { path: 'category', name: 'Category', component: Categorias, meta },
        { path: 'brand', name: 'Brand', component: Marcas, meta },
        { path: 'currency', name: 'Currency', component: Monedas, meta }
    ]
};