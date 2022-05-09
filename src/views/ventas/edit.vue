<template>
  <Toast />
  <div v-if="loading">
    <h5>Cargando...</h5>
    <Skeleton class="mb-2"></Skeleton>
    <Skeleton width="10rem" class="mb-2"></Skeleton>
    <Skeleton width="5rem" class="mb-2"></Skeleton>
    <Skeleton height="2rem" class="mb-2"></Skeleton>
    <Skeleton width="10rem" height="4rem"></Skeleton>
  </div>
  <div v-else class="p-4 bg-white rounded-lg border border-gray-200 shadow-md">
    <form class="w-full">
      <Panel header="Encabezado" :toggleable="true" class="w-full">
        <div class="grid grid-cols-6 gap-2">
          
          <div class="col-span-3 sm:col-span-6">
            <label for="cliente" class="block text-sm font-medium text-gray-700">Cliente</label>
            <AutoComplete v-model="data.comp.cliente" :suggestions="data.filteredCustomers" @complete="searchCustomers($event)" :dropdown="true" field="nombre" forceSelection class="mt-1 w-full rounded-md">
              <template #item="slotProps">
                <div class="flex flex-row">
                  <span :class="{'bg-red-100': !slotProps.item.activo, 'text-red-800': !slotProps.item.activo, 'bg-green-100': slotProps.item.activo, 'text-green-800': slotProps.item.activo}" class="text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                    <i v-if="slotProps.item.activo" class="pi pi-check"></i>
                    <i v-else class="pi pi-times"></i>
                  </span>
                  <div class="ml-2">{{slotProps.item.nombre}}</div>
                </div>
              </template>
            </AutoComplete>
            <InlineMessage v-if="!!data.errors.cliente">{{ data.errors.cliente }}</InlineMessage>
          </div>

          <div class="col-span-3 sm:col-span-6">
            <label for="comprobante" class="block text-sm font-medium text-gray-700">N° Comprobante</label>
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <Dropdown v-model="data.comp.tipoComprobante" :options="data.types" optionLabel="nombre" optionValue="codigo" />
              </span>
              <InputMask mask="99999999" v-model="data.comp.nroComprobante" placeholder="99999999" />
            </div>
            <InlineMessage v-if="!!data.errors.cliente">{{ data.errors.cliente }}</InlineMessage>
          </div>

          <div class="col-span-3">
            <label for="fecha" class="block text-sm font-medium text-gray-700">Fecha</label>
            <Calendar name="fecha" v-model="data.comp.fecha"  dateFormat="dd/mm/yy" :showIcon="true" :maxDate="maxDate" />
          </div>

          <div class="col-span-3">
            <label for="vencimiento" class="block text-sm font-medium text-gray-700">Vencimiento</label>
            <Calendar name="vencimiento" v-model="data.comp.vencimiento"  dateFormat="dd/mm/yy" :showIcon="true" :minDate="maxDate" />
          </div>

        </div>
      </Panel>

      <Panel header="Detalle" :toggleable="true" class="w-full mt-2">
        <div class="card">
          <Toolbar class="mb-4">
            <template #start>
              <span class="p-float-label">
                <AutoComplete v-model="data.product.producto" :suggestions="data.filteredProducts" @complete="searchProducts($event)" :dropdown="true" field="nombre" forceSelection class="mt-1 w-full rounded-md">
                  <template #item="slotProps">
                    <div class="flex flex-row">
                      <span :class="{'bg-red-100': !slotProps.item.activo, 'text-red-800': !slotProps.item.activo, 'bg-green-100': slotProps.item.activo, 'text-green-800': slotProps.item.activo}" class="text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                        <i v-if="slotProps.item.activo" class="pi pi-check"></i>
                        <i v-else class="pi pi-times"></i>
                      </span>
                      <div class="ml-2">{{slotProps.item.nombre}}</div>
                    </div>
                  </template>
                </AutoComplete>
                <label for="autocomplete">Producto o Servicio</label>
              </span>
              <span class="p-float-label">
                <InputNumber name="cantidad" v-model="data.product.cantidad" mode="decimal" :minFractionDigits="2" :min="0" />
                <label for="cantidad" class="block text-sm font-medium text-gray-700">Cantidad</label>
              </span>
            </template>

            <template #end>
                <Button label="Agregar" icon="pi pi-check" class="p-button-sm mr-2" @click="addProduct($event)" />
            </template>
          </Toolbar>

          <DataTable ref="dt" :value="data.comp.detalle" dataKey="id" :filters="filterDT" editMode="cell" showGridlines 
            responsiveLayout="scroll" @cell-edit-complete="editProduct">
            <template #header>
              <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                <h5 class="mb-2 md:m-0 p-as-md-center">Carga de Productos y/o Servicios</h5>
                  <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filterDT['global'].value" placeholder="Buscar..." />
                  </span>
              </div>
            </template>
            <Column header="Opciones" :exportable="false" style="min-width:8rem">
                <template #body="slotProps">
                    <Button icon="pi pi-trash" class="p-button-sm p-button-rounded p-button-text p-button-warning" @click="deleteProduct(slotProps.data)" v-tooltip.bottom="'Borrar'" />
                </template>
            </Column>
            <Column header="Códigos" :sortable="true" style="min-width:6rem">
              <template #body="slotProps">
                <span v-for="item in slotProps.data.articulo.codigos" :key="item" class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                  {{item}}
                </span>
              </template>
            </Column>
            <Column field="articulo.nombre" header="Nombre" :sortable="true" style="min-width:16rem"></Column>
            <Column field="cantidad" header="Cantidad" :sortable="true" style="min-width:6rem">
              <template #editor="{ data, field }">
                <InputNumber v-model="data[field]" mode="decimal" :minFractionDigits="2" autofocus :min="0"/>
              </template>
            </Column>
            <Column field="descuento" header="Descuento" style="min-width:6rem">
              <template #editor="{ data, field }">
                <InputNumber v-model="data[field]" mode="decimal" :minFractionDigits="2" autofocus suffix=" %" :min="0" :max="100"/>
              </template>
            </Column>
            <Column field="precioUnitario" header="Precio Unitario" :sortable="true" style="min-width:8rem">
                <template #body="slotProps">
                    {{formatCurrency(slotProps.data.price)}}
                </template>
            </Column>
            <Column field="precioTotal" header="Total" :sortable="true" style="min-width:8rem">
                <template #body="slotProps">
                    {{formatCurrency(slotProps.data.price)}}
                </template>
            </Column>
          </DataTable>
        </div>
      </Panel>
      <div class="flex flex-wrap -mx-3 mb-2 mt-4">
        <div class="w-full px-3">
          <button @click="Save" type="button" :disabled="loading"
            class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
            <svg v-show="loading" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
            <i class="pi pi-save" /> Grabar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { ref, reactive, onMounted } from 'vue';
  import WService from '@/plugins/ws';
  
  import Panel from 'primevue/panel';
  import AutoComplete from 'primevue/autocomplete';
  import Dropdown from 'primevue/dropdown';
  import InputMask from 'primevue/inputmask';
  import Calendar from 'primevue/calendar';
  import Toolbar from 'primevue/toolbar';
  import Button from 'primevue/button';
  import InputText from 'primevue/inputtext';
  import InputNumber from 'primevue/inputnumber';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';

  import Tooltip from 'primevue/tooltip';
  import InlineMessage from 'primevue/inlinemessage';
  import Skeleton from 'primevue/skeleton';
  import Toast from 'primevue/toast';
  import { useToast } from "primevue/usetoast";
  import { FilterMatchMode } from 'primevue/api';
  
  export default {
    emits: ['closeModal'],
    components: {
      Panel, AutoComplete, Dropdown, InputMask, Calendar, Toolbar, Button, InputText, InputNumber,
      DataTable, Column, 
      InlineMessage, Skeleton, Toast
    },
    setup(props, { emit }) {
      const wService = ref(new WService());
      const toast = useToast();
      const loading = ref(true); //indica si esta en proceso de carga.
      const maxDate = ref(new Date());
      const dt = ref();
      const data = reactive({
        comp: {
          cliente: null,
          tipoComprobante: '',
          nroComprobante: '',
          fecha: new Date(),
          vencimiento: null,
          detalle: [],
        },
        types: [
            {nombre: 'Factura A', codigo: 'FA'},
            {nombre: 'Factura B', codigo: 'FB'},
            {nombre: 'Factura C', codigo: 'FC'},
            {nombre: 'Presupuesto', codigo: 'PP'},
            {nombre: 'Presupuesto Compuesto', codigo: 'PC'}
        ],
        filteredCustomers: [],
        customers: [],
        filteredProducts: [],
        products: [],
        product: {
          producto: null,
          cantidad: 1,
        },
        errors: {},
      });
      const filterDT = ref({ 'global': {value: null, matchMode: FilterMatchMode.CONTAINS},});

      //----------- Metodos
      onMounted(() => {
        loading.value = false;
        toast.add({severity: 'warn', summary: '¡Atención!', detail:'Carga completa...', life: 3500});
      });

      const Save = () => {
        loading.value = true;
      };

      const searchCustomers = (event) => {
          setTimeout(() => {
              if (data.customers && data.customers.length == 0) {
                wService.value.getMethod('person/').then(info => {
                  data.customers = info;
                  filters(event.query, 'filteredCustomers', 'customers');
                });
              }
              else {
                filters(event.query, 'filteredCustomers', 'customers');
              }
          }, 250);
      };

      const searchProducts = (event) => {
        setTimeout(() => {
            if (data.products && data.products.length == 0) {
              wService.value.getMethod('product/').then(info => {
                data.products = info;
                filters(event.query, 'filteredProducts', 'products');
              });
            }
            else {
              filters(event.query, 'filteredProducts', 'products');
            }
        }, 250);
      };

      const addProduct = () => {
        let newReg = {
              articulo: {
                codigos: data.product.producto.codigos,
                nombre: data.product.producto.nombre,
              },
              cantidad: data.product.cantidad,
              descuento: 0,
              precioUnitario: 0,
              precioTotal: 0,
            }
        data.comp.detalle.push(newReg);
        data.product.producto = null;
        data.product.cantidad = 1;
      };

      const editProduct = (event) => {
          let { data, newValue, field } = event;
          data[field] = newValue;
      };

      const deleteProduct = () => {
        
      };

      //Busca lo escrito del autocomplete
      const filters = (value, fil, dat) => {
        if (!value.trim().length) {
              data[fil] = [...data[dat]];
          }
          else {
              data[fil] = data[dat].filter((item) => {
                  return item.nombre.toLowerCase().startsWith(value.toLowerCase());
              });
          }
      }

      const formatCurrency = (value) => {
        if(value)
          return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        return;
      };

      const closeModal = () => {
          //llama al metodo del padre, con 3 parametros.
          emit("closeModal", false)
      }

      return {
        loading, maxDate, dt, data, filterDT,

        Save, searchCustomers, searchProducts, addProduct, editProduct, deleteProduct, formatCurrency, closeModal,
      };
    },
    directives: {
      'tooltip': Tooltip
    },
  }
</script>