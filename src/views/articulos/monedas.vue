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
            const titulo = ref('Monedas');
            const methodName = ref('moneda/');
            const columnas = ref([
                {field: 'nombre', header: 'Nombre', sort: true, export: true, style: '', focus: true },
                {field: 'descripcion', header: 'Descripción', sort: true, export: false, style: '' },
                {field: 'valor', header: 'Valor', sort: true, export: true, style: '' },
                {field: 'codigo', header: 'Código', sort: true, export: true, style: '' },
                {field: 'simbolo', header: 'Simbolo', sort: true, export: true, style: '' },
                {field: 'lugar', header: 'Lugar', sort: true, export: true, style: '' },
                {field: 'desde', header: 'Fecha', sort: true, export: true, style: '', type: 'date' },
                {field: 'predeterminada', header: 'Pred.', sort: false, export: false, style: '' , type: 'bool' },
                {field: 'activo', header: 'Activo', sort: true, export: true, style: '', type: 'bool' },
            ]);
            const campoEditar = ref([
                { name: 'nombre', label: 'Nombre', type: 'text', required: true, focus: true},
                { name: 'descripcion', label: 'Descripción', type: 'area'},
                { name: 'valor', label: 'valor', type: 'currency'},
                { name: 'codigo', label: 'Código', type: 'select', select: {
                        options: [
                            { value: 'ARG'},
                            { value: 'USD'},
                            { value: 'EUR'},
                            { value: 'BRL'},
                            { value: 'CLP'},
                        ],
                        label: 'value',
                        value: 'value',
                        default: 'ARG'
                    }
                },
                { name: 'simbolo', label: 'Simbolo', type: 'select', select: {
                        options: [
                            { value: '$'},
                            { value: '€'},
                            { value: 'R$'},
                        ],
                        label: 'value',
                        value: 'value',
                        default: '$'
                    }
                },
                {name: 'lugar', label: 'Local', type: 'select', select: {
                        options: [
                            { value: 'es-AR'},
                            { value: 'en-US'},
                            { value: 'en-IE'},
                            { value: 'pt_BR'},
                            { value: 'es_CL'},
                        ],
                        label: 'value',
                        value: 'value',
                        default: 'es-AR'
                    }
                },
                {name: 'desde', label: 'Fecha', type: 'date'},
                {name: 'predeterminada', label: 'Predeterminada', type: 'bool'},
                {name: 'activo', label: 'Activo', type: 'bool'},
            ]);

            return {
                wService, titulo, methodName, columnas, campoEditar
            }
        }
    }
</script>