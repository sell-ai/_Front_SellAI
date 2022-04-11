<template>
    <div>
        <div class="card">
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="Nuevo" icon="pi pi-plus" class="p-button-success mr-2" @click="setModal(true, 0)" />
                    <Button label="Borrar" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                </template>

                <template #end>
                    <Button label="Exportar" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id" :paginator="true" :rows="10" :filters="filters"
                class="p-datatable-sm" showGridlines :loading="loading"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} productos" responsiveLayout="scroll">
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
                <Column field="codigos" header="Codigos" :sortable="true" style="min-width:12rem">
                    <template #body="slotProps">
                        <div v-for="codigo in slotProps.data.codigos" :key="codigo" class="text-sm font-medium text-gray-900">
                            <span v-html="highlightMatches(codigo)"></span>
                        </div>
                    </template>
                </Column>
                <Column field="nombre" header="Nombre" :sortable="true" style="min-width:16rem">
                    <template #body="slotProps">
                        <div class="text-sm font-medium text-gray-900" v-html="highlightMatches(slotProps.data.nombre)">
                        </div>
                    </template>
                </Column>
                <Column field="marca" header="Marca" :sortable="true" style="min-width:10rem">
                    <template #body="slotProps">
                        <div class="text-sm font-medium text-gray-900" v-html="highlightMatches(slotProps.data.marca.nombre)">
                        </div>
                    </template>
                </Column>
                <Column field="pvp" header="Precio" :sortable="true" style="min-width:8rem">
                    <template #body="slotProps">
                        {{formatCurrency(slotProps.data.precio)}}
                    </template>
                </Column>
                <Column field="categoria" header="Categoria" :sortable="true" style="min-width:10rem">
                    <template #body="slotProps">
                        <div class="text-sm font-medium text-gray-900" v-html="highlightMatches(slotProps.data.categoria.nombre)">
                        </div>
                    </template>
                </Column>
                <Column field="stock" header="Stock" :sortable="true" style="min-width:12rem"></Column>
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-angle-down" class="p-button-text" type="button" label="Opciones" @click="toggleMenuGrid($event, slotProps.data)" aria-haspopup="true" aria-controls="overlay_submenu"/>
                        <Menu id="overlay_submenu" ref="menu" :model="itemsMenu" :popup="true" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="¿Confirmar?" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">Desea eliminar el siguiente producto: <b>{{product.nombre}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false"/>
                <Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="¿Confirmar?" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">¿Estas seguro que desea eliminar los productos seleccionados?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false"/>
                <Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts" />
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
import EditProduct from './edit'
import WService from './services/ws';

export default {
    components: {
        DataTable, Toolbar, Column, Dialog, Button, Menu, InputText,
        EditProduct,
    },
    setup() {
        onMounted(() => {
            wService.value.getProducts().then(data => products.value = data);
        })
        const wService = ref(new WService());
        const loading = ref(false);
        const menu = ref(); //referencia la menu de la grilla
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
                            setModal(true, product.value.id)
                        }
                    },
                    {
                        label: 'Duplicar',
                        icon: 'pi pi-copy',
                        command: (event) => {
                            console.log(event);
                            //products.value = products.value.filter(val => val.id !== product.value.id);
                        }
                    },
                    {
                        label: 'separador',
                        separator: true
                    },
                    {
                        label: 'Desactivar',
                        icon: 'pi pi-trash',
                        command: () => {
                            
                        }
                    },
                ]
            },
        ]);

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
			return;
        };

        const confirmDeleteSelected = () => {
            deleteProductsDialog.value = true;
        };

        const setModal = (value, id) => {
            if (id === 0)
                product.value = {};
            productDialog.value = value;
        }

        const toggleMenuGrid = (event, data) => {
            menu.value.toggle(event);
            product.value = data;
        };

        const exportCSV = () => {
            dt.value.exportCSV();
        };

        const deleteSelectedProducts = () => {
            products.value = products.value.filter(val => !selectedProducts.value.includes(val));
            deleteProductsDialog.value = false;
            selectedProducts.value = null;
            //
        };

        return {
            loading,
            product,
            products,
            productDialog,
            deleteProductDialog,
            deleteProductsDialog,
            selectedProducts,
            menu,
            dt,
            filters,
            itemsMenu,

            highlightMatches,
            formatCurrency,
            confirmDeleteSelected,
            setModal,
            toggleMenuGrid,
            exportCSV,
            deleteSelectedProducts,
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