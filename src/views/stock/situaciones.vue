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
            const titulo = ref('Situaciones');
            const methodName = ref('situacion/');
            const columnas = ref([
                {field: 'sucursal', subfield: 'nombre', header: 'Sucursal', sort: true, export: true, style: '' },
                {field: 'nombre', header: 'Nombre', sort: true, export: true, style: '', focus: true },
                {field: 'descripcion', header: 'Descripción', sort: true, export: true, style: '' },
                {field: 'cuentaStock', header: 'Cuenta Stock', sort: true, export: true, style: '', type: 'bool' },
                {field: 'facturable', header: 'Facturable', sort: true, export: true, style: '', type: 'bool' },
                {field: 'activo', header: 'Activo', sort: true, export: true, style: '', type: 'bool' },
            ]);
            const campoEditar = ref([
                { name: 'nombre', label: 'Nombre', type: 'text', required: true, focus: true},
                { name: 'descripcion', label: 'Descripción', type: 'area'},
                { name: 'cuentaStock', label: 'Cuenta Stock', type: 'bool'},
                { name: 'facturable', label: 'Facturable', type: 'bool'},
                { name: 'activo', label: 'Activo', type: 'bool'},
                { name: 'sucursal', label: 'Sucursal', type: 'object', fields: [
                   { name: 'nombre', label: 'Nombre', type: 'text', required: true },
                   { name: 'location', label: 'Ubicación', type: 'geo' },
                   { name: 'address', label: 'Dirección', type: 'text' },
                 ] 
                }
            ]);

            return {
                wService, titulo, methodName, columnas, campoEditar
            }
        }
    }
</script>