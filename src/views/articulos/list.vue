<template>
    <Toast />
    <div>
        <div class="card">
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="Nuevo" icon="pi pi-plus" class="p-button-success mr-2" @click="setModal(true, true)" />
                    <Button label="Borrar" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected(true)" :disabled="!selectedProducts || !selectedProducts.length" />
                </template>

                <template #end>
                    <Button label="Exportar" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id" :paginator="true" :rows="10" :filters="filters"
                class="p-datatable-sm" showGridlines :loading="loading"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}" responsiveLayout="scroll">
                <template #header>
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
						<h5 class="mb-2 md:m-0 p-as-md-center">Listado de artículos</h5>
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
                        <div v-else-if="col.type == 'array'" v-for="ar in slotProp.data[col.field]" :key="ar" class="text-sm font-medium text-gray-900">
                            <span v-html="highlightMatches(ar)"></span>
                        </div>
                        <div v-else-if="col.type == 'currency'">
                            {{formatCurrency(slotProp.data[col.field])}}
                        </div>
                        <div v-else class="text-sm font-medium text-gray-900">
                            <span v-if="col.object" v-html="highlightMatches(slotProp.data[col.field][col.object])"></span>
                            <span v-else v-html="highlightMatches(slotProp.data[col.field])"></span>
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

        <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="¡Atención!" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="duplicate">¿Desea <span class="text-indigo-400">duplicar</span> el siguiente: <b>{{ product.nombre }}</b>?</span>
                <span v-else>¿Desea eliminar el siguiente producto: <b>{{ product.nombre }}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false"/>
                <Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteOrDuplicateProduct" :disabled="loading" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="¿Desea eliminar todos los seleccionados?" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">¿Estas seguro que desea eliminar los productos seleccionados?</span>
                <span class="block">Cantidad: {{selectedProducts.length}}</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="confirmDeleteSelected(false)"/>
                <Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts" :disabled="loading" />
            </template>
        </Dialog>

        <Dialog header="Artículo" v-model:visible="productDialog" :breakpoints="{'960px': '75vw'}" :style="{width: '50vw'}" :maximizable="true" :modal="true">
            <EditProduct @closeModal="setModal" :info="product" />
        </Dialog>
	</div>
</template>

<script>
import {  ref, onMounted } from 'vue'
import { FilterMatchMode } from 'primevue/api';

import DataTable from 'primevue/datatable';
import Toolbar from 'primevue/toolbar';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import EditProduct from './edit'
import WService from '@/plugins/ws';

export default {
    components: {
        DataTable, Toolbar, Column, Dialog, Button, Menu, InputText,
        EditProduct, Toast
    },
    setup() {
        onMounted(() => {
            intialLoad();
        })
        const getProduct = "product/";
        const toast = useToast();
        const wService = ref(new WService());
        const loading = ref(false);
        const duplicate = ref(false); //indica si se va a duplicar item de la grilla.
        const columnsData = ref([
            {field: 'codigos', header: 'Codigos', sort: true, export: true, style: 'min-width:12rem', type: 'array' },
            {field: 'nombre', header: 'Nombre', sort: true, export: true, style: 'min-width:16rem' },
            {field: 'marca', object: 'nombre', header: 'Marca', sort: true, export: true, style: 'min-width:10rem' },
            {field: 'categoria', object: 'nombre', header: 'Categoria', sort: true, export: true, style: 'min-width:10rem' },
            {field: 'pvp', header: 'Precio', sort: true, export: true, style: 'min-width:8rem', type: 'currency' },
            {field: 'stock', header: 'Stock', sort: true, export: true, style: 'min-width:12rem' },
        ]);
        const menu = ref([]); //referencia la menu de la grilla
        const dt = ref(); //referencia a la tabla.
        const products = ref();
        const productDialog = ref(false);
        const deleteProductDialog = ref(false);
        const deleteProductsDialog = ref(false);
        const product = ref({});
        const selectedProducts = ref();
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
                            setModal(true)
                        }
                    },
                    {
                        label: 'Duplicar',
                        icon: 'pi pi-copy',
                        command: () => {
                            deleteProductDialog.value = true;
                            duplicate.value = true;
                        }
                    },
                    {
                        label: 'separador',
                        separator: true
                    },
                    {
                        label: 'Borrar',
                        icon: 'pi pi-trash',
                        command: () => {
                            deleteProductDialog.value = true;
                        }
                    },
                ]
            },
        ]);

        const intialLoad = () => {
            loading.value = true;
            wService.value.getMethod(getProduct).then(data => {
                products.value = data;
                loading.value = false;
            }).catch(ex => {
                loading.value = false;
                console.log("Error Mounted: ", ex);
            });
        }

        const functionRefs = (el, id) => {
            menu.value[id] = el;
        }

        //Con la busqueda lo carga en negrita
        const highlightMatches = (text) => {
            if (!filters.value["global"].value) return text;
            const matchExists = text.toLowerCase().includes(filters.value["global"].value.toLowerCase());
            if (!matchExists) return text;

            const re = new RegExp(filters.value["global"].value, 'ig');
            return text.replace(re, matchedText => `<span class="text-red-400">${matchedText}</span>`);
        }

         const formatCurrency = (value) => {
            if(value)
				return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
			return "0".toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        };

        const confirmDeleteSelected = () => {
            deleteProductsDialog.value = true;
        };

        //abre el modal para editar.
        const setModal = (open, newReg, pushValue) => {
            if (newReg)
                product.value = {};
            if (!open && pushValue.id !== undefined && pushValue.id !== "" && newReg)
                products.value.push(pushValue);
            productDialog.value = open;
        }

        const toggleMenuGrid = (event, data) => {
            menu.value[data.id].toggle(event);
            product.value = data;
        };

        const exportCSV = () => {
            dt.value.exportCSV();
        };

        const deleteSelectedProducts = () => {
            loading.value = true;
            const newModel = products.value.filter(val => selectedProducts.value.includes(val));
            let Ids = "";
            newModel.forEach(v => Ids += v.id + "," );
            Ids = Ids.slice(0, -1);
            wService.value.deleteMethod(getProduct, Ids).then(() => {
                products.value = products.value.filter(val => !selectedProducts.value.includes(val));
                deleteProductsDialog.value = false;
                selectedProducts.value = null;
                loading.value = false;
            }).catch(() => {
                toast.add({severity: 'warn', summary: '¡Atención!', detail:'No se logro eliminar los items seleccionados', life: 3500});
                loading.value = false;
                deleteProductsDialog.value = false;
            });
        };

        //elimina o duplica por el menú de la grilla
        const deleteOrDuplicateProduct = () => {
            loading.value = true;
            if (duplicate.value) {
                duplicate.value = false;
                let dataDeepClone = JSON.parse(JSON.stringify(product.value));
                dataDeepClone.id = "";
                const toSave = JSON.stringify(dataDeepClone);
                wService.value.postMethod(getProduct, toSave, "").then((res) => {
                    products.value.push(res.value);
                    loading.value = false;
                    deleteProductDialog.value = false;
                }).catch(() => {
                    toast.add({severity: 'warn', summary: '¡Atención!', detail:'No se logro duplicar', life: 3000});
                    loading.value = false;
                    deleteProductDialog.value = false;
                });
            }
            else {
                wService.value.deleteMethod(getProduct, product.value.id).then(() => {
                    const indexDelete = products.value.findIndex(v => v.id === product.value.id);
                    products.value.splice(indexDelete, 1);
                    deleteProductDialog.value = false;
                    loading.value = false;
                }).catch((ex) => {
                    toast.add({severity: 'warn', summary: '¡Atención!', detail:'No se logro eliminar', life: 3000});
                    loading.value = false;
                    deleteProductDialog.value = false;
                    console.log("Error al grabar: ", ex);
                });
            }
        }

        return {
            loading, duplicate, columnsData, menu, dt, products,
            productDialog, deleteProductDialog, deleteProductsDialog,
            product, selectedProducts, filters, itemsMenu,

            intialLoad, functionRefs, highlightMatches, formatCurrency, confirmDeleteSelected, 
            setModal, toggleMenuGrid, exportCSV, deleteSelectedProducts, deleteOrDuplicateProduct,
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