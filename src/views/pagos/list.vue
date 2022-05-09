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
            const titulo = ref('Formas de Pago');
            const methodName = ref('formadePago/');
            const columnas = ref([
                {field: 'nombre', header: 'Nombre', sort: true, export: true, style: '', focus: true },
                {field: 'activo', header: 'Activo', sort: true, export: true, style: '', type: 'bool' },
            ]);
            const campoEditar = ref([
                { name: 'nombre', label: 'Nombre', type: 'text', required: true, focus: true},
                {name: 'activo', label: 'Activo', type: 'bool'},
            ]);

            return {
                wService, titulo, methodName, columnas, campoEditar
            }
        }
    }
</script>