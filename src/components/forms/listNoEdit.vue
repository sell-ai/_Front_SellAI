<template>
    <Toast />
    <div>
        <div class="card">
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="Nuevo" icon="pi pi-plus" class="p-button-success mr-2" @click="closeModal(true, true)" />
                    <Button label="Borrar" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected(true)" :disabled="!selectedDatas || !selectedDatas.length" />
                </template>

                <template #end>
                    <Button label="Exportar" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="dataModel" v-model:selection="selectedDatas" dataKey="id" :paginator="true" :rows="10" :filters="filters"
                class="p-datatable-sm" showGridlines :loading="loading"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}" responsiveLayout="scroll">
                <template #header>
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
						<h5 class="mb-2 md:m-0 p-as-md-center">Listado de {{ titulo }}</h5>
						<span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                        </span>
					</div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column v-for="col of columnsData" :field="col.field" :header="col.header" :key="col.field" :sortable="col.sort" :style="col.style" :exportable="col.export">
                    <template #body="slotProp">
                        <span v-if="col.type == 'bool'" 
                            :class="{'bg-red-100': !slotProp.data[col.field], 'text-red-800': !slotProp.data[col.field], 'bg-green-100': slotProp.data[col.field],
                                'text-green-800': slotProp.data[col.field]}"
                            class="text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                            <i v-if="slotProp.data[col.field]" class="pi pi-check"></i>
                            <i v-else class="pi pi-times"></i>
                        </span>
                        <span v-else-if="col.type == 'date'" v-html="formatDate(slotProp.data[col.field], col.format, col.field)">
                        </span>
                        <div v-else class="text-sm font-medium text-gray-900" v-html="highlightMatches(slotProp.data[col.field])">
                        </div>
                    </template>
                </Column>
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-angle-down" class="p-button-text" type="button" label="Opciones" @click="toggleMenuGrid($event, slotProps.data)" aria-haspopup="true" :aria-controls="'overlay_submenu_'  + slotProps.data.id"/>
                        <Menu :id="'overlay_submenu_'  + slotProps.data.id" :ref="el => functionRefs(el, slotProps.data.id)" :model="itemsMenu" :popup="true" />
                    </template>
                </Column>
                <template #paginatorstart>
                    <Button type="button" icon="pi pi-refresh" class="p-button-text" @click="intialLoad" />
                </template>
            </DataTable>
        </div>

        <Dialog v-model:visible="deleteDataDialog" :style="{width: '450px'}" header="¡Atención!" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="duplicate">¿Desea <span class="text-indigo-400">duplicar</span> el siguiente: <b>{{ dataOnly.nombre }}</b>?</span>
                <span v-else>¿Desea eliminar el siguiente {{ titulo }}: <b>{{ dataOnly.nombre }}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteDataDialog = false"/>
                <Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteAndDuplicateData" :disabled="loading" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteDatasDialog" :style="{width: '450px'}" header="¿Desea eliminar todos los seleccionados?" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="dataOnly">¿Estas seguro que desea eliminar los {{ titulo }} seleccionados?</span>
                <span class="block">Cantidad: {{selectedDatas.length}}</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="confirmDeleteSelected(false)"/>
                <Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteSelectedDatas" :disabled="loading" />
            </template>
        </Dialog>      
	</div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from 'primevue/api';
import moment from 'moment';

import DataTable from 'primevue/datatable';
import Toolbar from 'primevue/toolbar';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";

export default {
    components: {
        DataTable, Toolbar, Column, Dialog, Button, Menu, InputText, Toast,
    },
    props: {
        title: {
            type: String,
            required: true
        },
        columns: {
            type: Array,
            required: true
        },
        wServices: {
            type: Function,
            required: true
        },
        nameMethod: {
            type: String,
            required: true
        },
        editFields: {
            type: Array,
        },
    },
    emits: ['showModal'],
    setup(props, { emit }) {
        onMounted(() => {
            //trae datos del formulario.
            intialLoad();
        })
        const forstrDate = "DD/MM/YYYY";
        const toast = useToast();
        const refWs = ref(props.wServices);
        const methodName = ref(props.nameMethod);
        const wsProp = new props.wServices();
        const titulo = ref(props.title); //titulo de la vista.
        const duplicate = ref(false); //indica si se va a duplicar item de la grilla.
        const loading = ref(true); //Cargando general
        const menu = ref([]); //referencia la menu de la grilla
        const dt = ref(); //referencia a la tabla.
        const dataModel = ref(); //Datos de la tabla
        const columnsData = ref(props.columns) //Datos de la columnas
        const fieldsEdit = ref(props.editFields);
        const deleteDataDialog = ref(false); //Para mostrar desactivar un solo dato
        const deleteDatasDialog = ref(false); //Para mostrar desactivar varios datos
        const dataOnly = ref({}); //Cuando selecciono un dato
        const selectedDatas = ref(); //Datos que seleccione
        const filters = ref({
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        });

        const itemsMenu = ref([
            {
                label: 'Opciones',
                items: [
                    {
                        label: 'Editar',
                        icon: 'pi pi-pencil',
                        command: () => {
                            //setModal(true);
                        }
                    },
                    {
                        label: 'Duplicar',
                        icon: 'pi pi-copy',
                        command: () => {
                            deleteDataDialog.value = true;
                            duplicate.value = true;
                        }
                    },
                    {
                        label: 'separador',
                        separator: true
                    },
                    {
                        label: 'Eliminar',
                        icon: 'pi pi-trash',
                        command: () => {
                            deleteDataDialog.value = true;
                        }
                    },
                ]
            },
        ]);

        const intialLoad = () => {
            loading.value = true;
            wsProp.getMethod(props.nameMethod).then(data => {
                dataModel.value = data
                loading.value = false;
            }).catch(ex => {
                loading.value = false;
                console.log("Error Inital: ", ex);
            });
        }

        const functionRefs = (el, id) => {
            menu.value[id] = el;
        }

        //Con la busqueda lo carga en color rojo
        const highlightMatches = (text) => {
            if (!filters.value["global"].value) return text;
            const matchExists = text.toLowerCase().includes(filters.value["global"].value.toLowerCase());
            if (!matchExists) return text;

            const re = new RegExp(filters.value["global"].value, 'ig');
            return text.replace(re, matchedText => `<span class="text-red-400">${matchedText}</span>`);
        }

        const formatDate = (value, format) => {
            if (value) {
                if (!format)
                    format = forstrDate;
                moment.locale("es");
                return moment(value).format(format);
            }
            return;
        };

         const formatCurrency = value => {
            if(value)
				return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
			return;
        };

        //abre el modal para eliminar varios items.
        const confirmDeleteSelected = (value) => {
            deleteDatasDialog.value = value;
        };
        
        //Abre el menu en la tabla
        const toggleMenuGrid = (event, data) => {
            menu.value[data.id].toggle(event);
            dataOnly.value = data;
        };

        //Exporta a csv
        const exportCSV = () => {
            dt.value.exportCSV();
        };

        //elimina todos items seleccionados
        const deleteSelectedDatas = () => {
            loading.value = true;
            const newModel = dataModel.value.filter(val => selectedDatas.value.includes(val));
            let Ids = "";
            newModel.forEach(v => Ids += v.id + "," );
            Ids = Ids.slice(0, -1);
            wsProp.deleteMethod(props.nameMethod, Ids).then(() => {
                dataModel.value = dataModel.value.filter(val => !selectedDatas.value.includes(val));
                deleteDatasDialog.value = false;
                selectedDatas.value = null;
                loading.value = false;
            }).catch(() => {
                toast.add({severity: 'warn', summary: '¡Atención!', detail:'No se logro eliminar los items seleccionados', life: 3500});
                loading.value = false;
                deleteDatasDialog.value = false;
            });
        };

        //elimina o duplica por el menú de la grilla
        const deleteAndDuplicateData = () => {
            loading.value = true;
            if (duplicate.value) {
                duplicate.value = false;
                let dataDeepClone = JSON.parse(JSON.stringify(dataOnly.value));
                dataDeepClone.id = "";
                const toSave = JSON.stringify(dataDeepClone);
                wsProp.postMethod(props.nameMethod, toSave, "").then((res) => {
                    dataModel.value.push(res.value);
                    loading.value = false;
                    deleteDataDialog.value = false;
                }).catch(() => {
                    toast.add({severity: 'warn', summary: '¡Atención!', detail:'No se logro duplicar', life: 3000});
                    loading.value = false;
                    deleteDataDialog.value = false;
                });
            }
            else {
                wsProp.deleteMethod(props.nameMethod, dataOnly.value.id).then(() => {
                    const indexDelete = dataModel.value.findIndex(v => v.id === dataOnly.value.id);
                    dataModel.value.splice(indexDelete, 1);
                    deleteDataDialog.value = false;
                    loading.value = false;
                }).catch(() => {
                    toast.add({severity: 'warn', summary: '¡Atención!', detail:'No se logro eliminar', life: 3000});
                    loading.value = false;
                    deleteDataDialog.value = false;
                });
            }
        }

        const closeModal = (show, newReg) => {
          //llama al metodo del padre, con 3 parametros.
          emit("showModal", show, newReg);
      }

        return {
            refWs, methodName, wsProp, titulo, duplicate, loading, menu, dt, dataModel, columnsData, 
            fieldsEdit, deleteDataDialog, deleteDatasDialog, dataOnly, selectedDatas, 
            filters, itemsMenu, 
            
            intialLoad, functionRefs, highlightMatches, formatDate, formatCurrency, confirmDeleteSelected, 
            toggleMenuGrid, exportCSV, deleteSelectedDatas, deleteAndDuplicateData, closeModal,
        };
    },
};
</script>

<style scoped>
    .table-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        @media screen and (max-width: 960px) {
            align-items: start;
        }
    }

    .p-button {
        font-size: 0.75rem;
    }


    .product-image {
        width: 50px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }

    .p-dialog .product-image {
        width: 50px;
        margin: 0 auto 2rem auto;
        display: block;
    }
    .p-paginator .p-dropdown {
        height: 2rem;
    }

    .confirmation-content {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    @media screen and (max-width: 960px) {
        ::v-deep(.p-toolbar) {
            flex-wrap: wrap;
        }
    }
</style>