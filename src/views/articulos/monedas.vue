<template>
    <Listado :title="titulo" :columns="columnas" :wServices="wService" :editFields="campoEditar"
        :methodGet="getMethod" :methodPost="postMethod" :methodDelete="deleteMethod">
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
            const titulo = ref('Monedas');
            const getMethod = ref('getMonedas');
            const postMethod = ref('postMonedas');
            const deleteMethod = ref('deleteMonedas');
            const columnas = ref([
                {field: 'nombre', header: 'Nombre', sort: true, export: false, style: '' },
                {field: 'descripcion', header: 'Descripcion', sort: true, export: false, style: '' },
                {field: 'activo', header: 'Activo', sort: true, export: true, style: '', type: 'bool' },
            ]);
            const campoEditar = ref([
                {name: 'nombre', label: 'Nombre', type: 'text', required: true, focus: true},
                {name: 'descripcion', label: 'Descripcion', type: 'area'},
                {name: 'activo', label: 'Activo', type: 'bool'},
            ]);

            return {
                wService, titulo, getMethod, postMethod, deleteMethod, columnas, campoEditar
            }
        }
    }
</script>