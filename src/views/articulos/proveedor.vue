<template>
    <Listado :title="titulo" :columns="columnas" :wServices="wService" :editFields="campoEditar" :nameMethod="methodName">
    </Listado>
</template>

<script>
    import { ref } from 'vue';
    
    import Listado from '@/components/forms/list.vue'
    import WService from './services/wsParam';

    export default {
        components: {
            Listado
        },
        setup(){
            const wService = ref(WService);
            const titulo = ref('Proveedor');
            const methodName = ref('proveedor/');
            const columnas = ref([
                {field: 'nombre', header: 'Nombre', sort: true, export: true, style: '', focus: true },
                {field: 'descripcion', header: 'Descripción', sort: true, export: false, style: '' },
                {field: 'cuit', header: 'CUIT', sort: true, export: false, style: '' },
                {field: 'activo', header: 'Activo', sort: true, export: true, style: '', type: 'bool' },
            ]);
            const campoEditar = ref([
                { name: 'nombre', label: 'Nombre', type: 'text', required: true, focus: true},
                { name: 'descripcion', label: 'Descripción', type: 'area'},
                { name: 'cuit', label: 'CUIT', type: 'mask', mask: "99-99.999.999-9"},
                { name: 'activo', label: 'Activo', type: 'bool'},
            ]);

            return {
                wService, titulo, methodName, columnas, campoEditar
            }
        }
    }
</script>