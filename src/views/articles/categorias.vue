<template>
    <Listado :title="titulo" :columns="columnas" :wServices="wService" :editFields="campoEditar" :nameMethod="methodName">
    </Listado>
</template>

<script>
    import { ref } from 'vue';
    
    import Listado from '@/components/forms/list.vue'
    import WService from '@/plugins/ws';

    export default {
        components: {
            Listado
        },
        setup(){
            const wService = ref(WService);
            const titulo = ref('Categorias');
            const methodName = ref('category/');
            const columnas = ref([
                {field: 'nombre', header: 'Nombre', sort: true, export: true, style: '' },
                {field: 'descripcion', header: 'Descripcion', sort: true, export: true, style: '' },
                {field: 'sinonimos', header: 'Sinonimos', sort: true, export: true, style: '' },
                {field: 'activo', header: 'Activo', sort: true, export: true, style: '', type: 'bool' },
            ]);
            const campoEditar = ref([
                {name: 'nombre', label: 'Nombre', type: 'text', required: true, focus: true, class: 'col-span-2'},
                {name: 'descripcion', label: 'Descripcion', type: 'area', class: 'col-span-2'},
                {name: 'sinonimos', label: 'Sinonimos', type: 'chips', class: 'col-span-2'},
                {name: 'activo', label: 'Activo', type: 'bool', class: 'pl-4'},
            ]);

            return {
                wService, titulo, methodName, columnas, campoEditar
            }
        }
    }
</script>