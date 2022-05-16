<template>
    <Listado :title="titulo" :columns="columnas" :wServices="wService" :editFields="campoEditar" :nameMethod="methodName" @showModal="showEdit">
    </Listado>

    <Dialog :header="titulo" v-model:visible="showDialog" :style="{width: '100vw'}" :maximizable="true" :modal="true">
        <EditList @closeModal="showEdit" />
    </Dialog>
</template>

<script>
    import { ref } from 'vue';
    import Dialog from 'primevue/dialog';
    import Listado from '@/components/forms/listNoEdit.vue'
    import EditList from './edit.vue';
    import WService from '@/plugins/ws';

    export default {
        components: {
            Dialog, Listado, EditList
        },
        setup(){
            const wService = ref(WService);
            const titulo = ref('Ventas');
            const showDialog = ref(false);
            const methodName = ref('comprobante/');
            const columnas = ref([
                {field: 'cliente', header: 'Cliente', sort: true, export: true, style: '', focus: true },
                {field: 'fecha', header: 'Fecha', sort: true, export: true, style: '', type: 'date' },
                {field: 'vencimiento', header: 'Vencimiento', sort: true, export: true, style: '', type: 'date' },
                {field: 'nroComprobante', header: 'Comprobante', sort: true, export: true, style: '' },
                {field: 'activo', header: 'Activo', sort: true, export: true, style: '', type: 'bool' },
            ]);
            const campoEditar = ref([
                {name: 'cliente', label: 'Cliente', type: 'text', required: true, focus: true},
                {name: 'fecha', label: 'Fecha', type: 'date'},
                {name: 'vencimiento', label: 'Vencimiento', type: 'date'},
                {name: 'nroComprobante', label: 'Comprobante', type: 'text'},
                {name: 'activo', label: 'Activo', type: 'bool'},
            ]);

            //Metodos
            const showEdit = (show, newReg) => {
                showDialog.value = show;
                console.log(newReg);
            }

            return {
                wService, titulo, methodName, columnas, campoEditar, showDialog,

                showEdit
            }
        }
    }
</script>