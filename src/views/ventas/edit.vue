<template>
  <ConfirmDialog />
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
    <Panel header="Encabezado" :toggleable="true" class="w-full">
      <template #icons>
        <span>{{data.selectedDeposit}}</span>
        <button class="p-panel-header-icon p-link mr-2" @click="toggleDeposit">
          <span class="pi pi-cog"></span>
        </button>
        <OverlayPanel ref="opDeposit" appendTo="body" :showCloseIcon="true" style="width: 450px" :breakpoints="{'960px': '75vw'}">
          <Listbox v-model="data.selectedDeposit" :options="data.deposits" :filter="true" optionLabel="nombre" optionValue="id" listStyle="max-height: 450px" class="w-full" filterPlaceholder="Buscar">
          </Listbox>
        </OverlayPanel>
      </template>
      <div class="grid grid-cols-6 gap-2">
        
        <div class="col-span-6">
          <label for="cliente" class="block text-sm font-medium text-gray-700">Cliente</label>
          <AutoComplete v-model="data.comp.cliente" :suggestions="data.filteredCustomers" @complete="searchCustomers($event)" @itemSelect="changeTypeVoucher($event)" :dropdown="true" field="fullName" forceSelection class="mt-1 w-full rounded-md">
            <template #item="slotProps">
              <div class="flex flex-row">
                <span :class="{'bg-red-100': !slotProps.item.activo, 'text-red-800': !slotProps.item.activo, 'bg-green-100': slotProps.item.activo, 'text-green-800': slotProps.item.activo}" class="text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                  <i v-if="slotProps.item.activo" class="pi pi-check"></i>
                  <i v-else class="pi pi-times"></i>
                </span>
                <div class="ml-2">{{slotProps.item.fullName}}</div>
              </div>
            </template>
          </AutoComplete>
          <InlineMessage v-if="!!data.errors.cliente">{{ data.errors.cliente }}</InlineMessage>
        </div>

        <div class="col-span-6 md:col-span-2">
          <label for="comprobante" class="block text-sm font-medium text-gray-700">Tipo Comprobante</label>
          <Dropdown v-model="data.comp.tipoComprobante" :options="data.types" optionLabel="nombre" optionValue="codigo" />
          <InlineMessage v-if="!!data.errors.cliente">{{ data.errors.tipoComprobante }}</InlineMessage>
        </div>
        <div class="col-span-6 md:col-span-2">
          <label for="fecha" class="block text-sm font-medium text-gray-700">Fecha</label>
          <Calendar name="fecha" v-model="data.comp.fecha"  dateFormat="dd/mm/yy" :showIcon="true" :maxDate="maxDate" />
        </div>

        <div class="col-span-6 md:col-span-2">
          <label for="vencimiento" class="block text-sm font-medium text-gray-700">Vencimiento</label>
          <Calendar name="vencimiento" v-model="data.comp.vencimiento"  dateFormat="dd/mm/yy" :showIcon="true" :minDate="maxDate" />
        </div>

      </div>
    </Panel>

    <Panel header="Detalle" :toggleable="true" class="w-full mt-2">
      <div class="card">
        <div class="grid grid-cols-6 gap-1">
          <div class="col-span-6 mb-6 md:mb-1 md:col-span-2">
            <Skeleton v-if="load" width="20rem" height="3rem" borderRadius="16px"></Skeleton>
            <span v-else class="p-float-label">
              <AutoComplete v-model="data.product.producto" :delay="1000" :suggestions="data.filteredProducts" @complete="searchProducts($event)"
                 :dropdown="true" field="nombre" forceSelection class="mt-1 w-full rounded-md">
                <template #item="slotProps">
                  <div class="flex p-2">
                    <span :class="{'bg-red-100': !slotProps.item.activo, 'text-red-800': !slotProps.item.activo, 'bg-green-100': slotProps.item.activo, 'text-green-800': slotProps.item.activo}" class="text-xs font-semibold mr-2 px-2.5 py-0.5 max-h-5 rounded">
                      <i v-if="slotProps.item.activo" class="pi pi-check"></i>
                      <i v-else class="pi pi-times"></i>
                    </span>
                    <div class="ml-2">{{slotProps.item.nombre}}</div>
                    <div class="ml-8">
                      <p v-for="stock in slotProps.item.subNombre" :key="stock">
                        <span 
                        class="bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-900">{{stock}}</span>
                      </p>
                    </div>
                  </div>
                </template>
              </AutoComplete>
              <label for="autocomplete">Producto o Servicio</label>
            </span>
          </div>

          <div class="col-span-6 mb-4 md:mb-0 md:col-span-2">
            <Skeleton v-if="load" width="16rem" height="3rem" borderRadius="16px"></Skeleton>
            <span v-else class="p-float-label">
              <InputNumber name="cantidad" v-model="data.product.cantidad" mode="decimal" :minFractionDigits="2" :min="0" />
              <label for="cantidad" class="block text-sm font-medium text-gray-700">Cantidad</label>
            </span>
          </div>

          <div class="col-span-6 mb-4 md:mb-0 md:col-span-2">
            <Skeleton v-if="load" width="8rem" height="3rem" borderRadius="16px"></Skeleton>
            <Button v-else label="Agregar" icon="pi pi-check" class="p-button-sm mr-2" @click="addProduct($event)" />
          </div>
        </div>

        <DataTable ref="dt" :value="data.comp.detalle" dataKey="id" :filters="filterDT" editMode="cell" showGridlines 
          responsiveLayout="stack" @cell-edit-complete="editProduct">
          <template #header>
            <div class="table-header grid grid-cols-6 gap-1">
              <div class="col-span-6 md:col-span-3">
                <h5>Productos y/o Servicios</h5>
              </div>
              <div class="col-span-6 md:col-span-3">
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText v-model="filterDT['global'].value" placeholder="Buscar..." />
                </span>
              </div>
            </div>
          </template>
          <Column header="Opciones" :exportable="false" style="min-width:6rem">
              <template #body="slotProps">
                <Skeleton v-if="load"></Skeleton>
                <div v-else>
                  <div class="grid grid-cols-2">
                    <Button icon="pi pi-trash" class="p-button-sm p-button-rounded p-button-text p-button-warning" @click="deleteProduct($event)" v-tooltip.bottom="'Borrar'" />
                    <Button icon="pi pi-book" class="p-button-sm p-button-rounded p-button-text p-button-info" @click="toggleOverGrid($event, slotProps.data.articulo.id)" v-tooltip.bottom="'Stock'" />
                  </div>
                  <OverlayPanel :ref="el => functionRefs(el, slotProps.data.articulo.id)" appendTo="body" :showCloseIcon="true" style="width: 450px" :breakpoints="{'960px': '75vw'}">
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" class="px-6 py-3">
                              Deposito
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Cantidad
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="art in slotProps.data.articulo.stockDeposito" :key="art.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td class="px-6 py-4">
                              {{art.nombre}}
                            </td>
                            <td class="px-6 py-4">
                              {{art.stock}}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                  </div>
                  </OverlayPanel>
                </div>
              </template>
          </Column>
          <Column header="Códigos" :sortable="true" style="min-width:6rem">
            <template #body="slotProps">
              <Skeleton v-if="load"></Skeleton>
              <span v-else v-for="item in slotProps.data.articulo.codigos" :key="item" class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                {{item}}
              </span>
            </template>
          </Column>
          <Column field="articulo.nombre" header="Nombre" :sortable="true" style="min-width:16rem">
            <template #body="slotProps">
              <Skeleton v-if="load"></Skeleton>
              <span v-else>{{slotProps.data.articulo.nombre}}</span>
            </template>
          </Column>
          <Column field="cantidad" header="Cantidad" :sortable="true" style="min-width:4rem">
            <template #body="slotProps">
              <Skeleton v-if="load"></Skeleton>
              <span v-else>{{slotProps.data.cantidad}}</span>
            </template>
            <template #editor="{ data, field }">
              <Skeleton v-if="load"></Skeleton>
              <InputNumber v-else v-model="data[field]" mode="decimal" :maxFractionDigits="2" autofocus :min="1" showButtons buttonLayout="horizontal" :step="1" class="focogrilla"
                  decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"/>
            </template>
          </Column>
          <Column field="descuento" header="% Bonif." style="min-width:4rem">
            <template #body="slotProps">
              <Skeleton v-if="load"></Skeleton>
              <span v-else>{{slotProps.data.descuento}}</span>
            </template>
            <template #editor="{ data, field }">
              <InputNumber v-model="data[field]" mode="decimal" :maxFractionDigits="2" suffix=" %" :min="0" :max="100"/>
            </template>
          </Column>
          <Column field="precioUniSinImp" header="Precio Uni. Exento" :sortable="true" style="min-width:6rem">
              <template #body="slotProps">
                <Skeleton v-if="load"></Skeleton>
                <span v-else>{{formatCurrency(slotProps.data.precioUniSinImp)}}</span>
              </template>
          </Column>
          <Column field="precioUnitario" header="Precio Unitario" :sortable="true" style="min-width:6rem">
              <template #body="slotProps">
                <Skeleton v-if="load"></Skeleton>
                <span v-else>{{formatCurrency(slotProps.data.precioUnitario)}}</span>
              </template>
          </Column>
          <Column field="precioDescuento" header="Imp.Bonif." :sortable="true" style="min-width:6rem">
              <template #body="slotProps">
                <Skeleton v-if="load"></Skeleton>
                <span v-else>{{formatCurrency(slotProps.data.precioDescuento)}}</span>
              </template>
          </Column>
          <Column field="precioTotal" header="Total" :sortable="true" style="min-width:8rem">
              <template #body="slotProps">
                <Skeleton v-if="load"></Skeleton>
                <span v-else>{{formatCurrency(slotProps.data.precioTotal)}}</span>
              </template>
          </Column>
        </DataTable>

        <div class="col-span-6">
          <div class="w-full text-gray-900 bg-white border border-blue-400 rounded-lg ">
              <div class="sm:flex sm:items-center sm:justify-between w-full px-4 py-2 text-sm border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                  <div class="font-bold">Subtotal:</div>
                  <div class="sm:flex"> $ {{ data.comp.subTotal }}</div>
              </div>
              <div class="sm:flex sm:items-center sm:justify-between w-full px-4 py-2 text-sm border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                  <div class="font-bold">Bonificación:</div>
                  <div class="sm:flex"> $ {{ data.comp.descuentos }}</div>
              </div>
              <div class="sm:flex sm:items-center sm:justify-between w-full px-4 py-2 text-sm border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                  <div class="font-bold">Impuestos:</div>
                  <div class="sm:flex">
                    <ul>
                      <li class="text-xs font-thin" v-for="item in data.impuestos" :key="item">
                        {{item.nombre}}: <span class="text-red-900">$ {{item.valor}}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="sm:flex"> $ {{ data.comp.impuestos }}</div>
              </div>
              <div class="sm:flex sm:items-center sm:justify-between w-full px-4 py-2 text-sm bg-indigo-100 border-b border-indigo-500 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                  <div class="font-bold">TOTAL:</div>
                  <div class="sm:flex"> $ {{ data.comp.total }}</div>
              </div>
          </div>
        </div>

      </div>
    </Panel>

    <Panel header="Formas de Pago 💵" :toggleable="true" class="w-full mt-2 panel-green">
      <DataTable :value="data.formasdePago" editMode="row" dataKey="id" v-model:editingRows="editingRows" @row-edit-save="onRowEditSave" responsiveLayout="stack">
        <Column field="nombre" header="Nombre" :sortable="true" style="min-width:16rem"></Column>
        <Column field="cuotas" header="Cuotas" style="width:20%">
          <template #editor="{ data, field }">
            <InputNumber v-model="data[field]" suffix=" cuotas" :min="1" />
          </template>
        </Column>
        <Column field="interes" header="Interes" style="width:20%"></Column>
        <Column field="valor" header="Valor" style="width:20%">
          <template #editor="{ data, field }">
            <InputNumber v-model="data[field]" autofocus :min="0" :maxFractionDigits="2" mode="decimal" />
          </template>
        </Column>
        <Column :rowEditor="true" style="width:10%; min-width:8rem" bodyStyle="text-align:center"></Column>
      </DataTable>

      <div class="col-span-6">
        <div class="w-full text-gray-900 bg-white border border-green-400 rounded-lg ">
            <div class="sm:flex sm:items-center sm:justify-between w-full px-4 py-2 text-sm border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                <div class="font-bold">Interes:</div>
                <div class="sm:flex"> $ {{ interesComputed }}</div>
            </div>
            <div class="sm:flex sm:items-center sm:justify-between w-full px-4 py-2 text-sm border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                <div class="font-bold">Diferencia:</div>
                <div class="sm:flex"> $ {{ diferenciaComputed }}</div>
            </div>
            <div class="sm:flex sm:items-center sm:justify-between w-full px-4 py-2 text-sm bg-indigo-100 border-b border-indigo-500 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                <div class="font-bold">TOTAL:</div>
                <div class="sm:flex"> $ {{ totalComputed }}</div>
            </div>
        </div>
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
  </div>
</template>

<script>
  import { ref, reactive, onMounted, watch, computed } from 'vue';
  import Cookies from 'js-cookie';
  import WService from '@/plugins/ws';
  
  import Panel from 'primevue/panel';
  import AutoComplete from 'primevue/autocomplete';
  import Dropdown from 'primevue/dropdown';
  import Calendar from 'primevue/calendar';
  import Button from 'primevue/button';
  import InputText from 'primevue/inputtext';
  import InputNumber from 'primevue/inputnumber';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Listbox from 'primevue/listbox';

  import OverlayPanel from 'primevue/overlaypanel';
  import Tooltip from 'primevue/tooltip';
  import InlineMessage from 'primevue/inlinemessage';
  import Skeleton from 'primevue/skeleton';
  import Toast from 'primevue/toast';
  import { useToast } from "primevue/usetoast";
  import ConfirmDialog from 'primevue/confirmdialog';
  import { useConfirm } from "primevue/useconfirm";
  import { FilterMatchMode } from 'primevue/api';
import { Document } from 'postcss';
  
  export default {
    emits: ['closeModal'],
    components: {
      Panel, AutoComplete, Dropdown, Calendar, Button, InputText, InputNumber,
      DataTable, Column, Listbox, OverlayPanel,
      InlineMessage, Skeleton, Toast, ConfirmDialog,
    },
    setup(props, { emit }) {
      const wService = ref(new WService());
      const toast = useToast();
      const confirmModal = useConfirm();
      const opDeposit = ref();
      const loading = ref(true); //indica si esta en proceso de carga.
      const load = ref(false); //cuando usa API.
      const maxDate = ref(new Date());
      const dt = ref();
      const overMenu = ref([]);
      const data = reactive({
        comp: {
          cliente: null,
          tipoComprobante: '',
          nroComprobante: '',
          fecha: new Date(),
          vencimiento: null,
          detalle: [],
          subTotal: 0,
          descuentos: 0,
          impuestos: 0,
          total: 0,
        },
        types: [
            {nombre: 'Factura A', codigo: 'FA'},
            {nombre: 'Factura B', codigo: 'FB'},
            {nombre: 'Factura C', codigo: 'FC'},
            {nombre: 'Presupuesto', codigo: 'PP'},
            {nombre: 'Presupuesto Compuesto', codigo: 'PC'}
        ],
        filteredCustomers: [],
        filteredProducts: [],
        product: {
          producto: null,
          cantidad: null,
        },
        impuestos: [],
        formasdePago: [],
        deposits: [],
        selectedDeposit: Cookies.get('deposit'),
        errors: {},
      });
      const filterDT = ref({ 'global': {value: null, matchMode: FilterMatchMode.CONTAINS},});
      const editingRows = ref([]);

      //----------- Metodos
      onMounted(() => {     
        wService.value.getMethod('situacion/bill').then(inf => data.deposits = inf);
        wService.value.getMethod('formadePago/active').then(inf => {
          inf.forEach(item => {
            let newReg = {
              id: item.id,
              nombre: item.nombre,
              cuotas: 1,
              interes: 0,
              valor: 0
            };
            data.formasdePago.push(newReg);
          })
          loading.value = false;
        });
      });

      const Save = () => {
        loading.value = true;
      };

      const searchCustomers = (event) => {
        setTimeout(() => {
          if (event.query.length > 0) {
            wService.value.getMethod('person/filter/' + event.query).then(info => {
              data.filteredCustomers = info;
            });
          }
          else {
            wService.value.getMethod('person/gettop/15').then(info => {
              data.filteredCustomers = info;
            });
          }
        }, 250);
      };

      const changeTypeVoucher = (event) => {
        if (event.value !== undefined && event.value.situacionTributaria !== undefined && data.comp.tipoComprobante == '') {
          switch (event.value.situacionTributaria) {
            case 0:
            case 3:
            case 4:
              data.comp.tipoComprobante = 'FB';
              break;
            case 1:
              data.comp.tipoComprobante = 'FA';
              break;
            default:
              data.comp.tipoComprobante = 'FC';
              break;
          }

          
        }
      }

      const searchProducts = (event) => {
        setTimeout(() => {
          let cantidad = 15;
          let filter = event.query;
          wService.value.getMethod('product/stock/' + cantidad + '/' + filter).then(info => {
              data.filteredProducts = info;
            });
        }, 250);
      };

      //Valida el producto a traves de api
      const validateStock = async (producto, cantidad) => {
        let deposito = producto.stockDeposito;

        if (producto.tipoArticulo === 'Servicio')
          return "Servicio";

        if (deposito !== undefined && deposito.length > 0 && producto.tipoArticulo !== 'Servicio') {
          //Sino es servicio y tiene deposito busco si tiene stock.
          let myPromise = new Promise(function(resolve) {
            wService.value.getMethod('product/stock/' + producto.id +'/'+ data.selectedDeposit + '/' + cantidad)
            .then(res => {
              data.product.producto = res;
              resolve(res.situacionDeposito);
            })
            .catch(ex => {
              console.log(ex);
              resolve("Error");
            });
          });
          return await myPromise;
        }
        else {
          return "confirmSinStock";
        }
       
      };

      //Agregar producto a la tabla
      const addProduct = async (event) => {
        if (data.product.producto === null) {
          event.preventDefault();
          return;
        }

        if (data.comp.detalle.some(s => s.articulo.id === data.product.producto.id)) {
          toast.add({severity: 'warn', summary: '¡Atención!', detail:'Este producto ya se encuentra agregado', life: 3500});
          return;
        }
        load.value = true;

        if (!data.product.cantidad) data.product.cantidad = 1;

        let resVal = await validateStock(data.product.producto, data.product.cantidad);
        let msg = "";
        switch (resVal) {
          case "Servicio":
          case "Error":
            load.value = false;
            return;
          case "Si":
            addNewReg();
            load.value = false;
            return;
          case "No":
          case "confirmSinStock":
            msg = 'Este producto no tiene stock. Desea continuar?';
            break;
          case "Combinar":
            msg = 'Deposito no tiene stock suficiente. Desea combiar?';
            break;
        }

        confirmModal.require({
            message: msg,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              load.value = false;
              addNewReg();
            },
            reject: () => {
              load.value = false;
              toast.add({severity:'error', summary:'Rechazado', detail:'Producto rechazado!', life: 3000});
            }
        });
      };

      const addNewReg = () => {
        if (!data.product.cantidad) data.product.cantidad = 1;
        const cantidad = parseFloat((data.product.cantidad).toFixed(2));
        
        const pvp = parseFloat((data.product.producto.pvp).toFixed(2));
        const subTotal = parseFloat((pvp * cantidad).toFixed(2));

        let newReg = {
          articulo: {
            id: data.product.producto.id,
            codigos: data.product.producto.codigos,
            nombre: data.product.producto.nombre,
            stockDeposito: data.product.producto.stockDeposito
          },
          cantidad: cantidad,
          descuento: 0,
          pvp: pvp,
          impuestos: data.product.producto.impuestos,
          precioUniSinImp: data.product.producto.precioSinImpuestos,
          precioUnitario: pvp,
          precioDescuento: 0,
          precioTotal: subTotal,
        }
        data.comp.detalle.push(newReg);
        data.product.producto = null;
        data.product.cantidad = null;
      };

      const editProduct = async (event) => {
        load.value = true;
        let { data, newValue, field } = event;
        if (field == 'cantidad') {
          let resVal = await validateStock(data.articulo, newValue);
          let msg = "";
          switch (resVal) {
            case "Servicio":
            case "Error":
              load.value = false;
              return;
            case "Si":
              data[field] = newValue;
              changeTotal(data);
              load.value = false;
              return;
            case "No":
            case "confirmSinStock":
              msg = 'Este producto no tiene stock. Desea continuar?';
              break;
            case "Combinar":
              msg = 'Deposito no tiene stock suficiente. Desea combiar?';
              break;
          }
          if (msg !== "") {
            load.value = false;
            confirmModal.require({
              message: msg,
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
                data[field] = newValue;
                changeTotal(data);
              },
              reject: () => {
                  toast.add({severity:'error', summary:'Rechazado', detail:'Producto rechazado!', life: 3000});
              }
            });
          }
          
        }
        else {
          data[field] = newValue;
          changeTotal(data);
          load.value = false;
        }
      };

      const changeTotal = (data) => {
          data["precioTotal"] = parseFloat((data["precioUnitario"] * data["cantidad"]).toFixed(2));
          const descuento = parseFloat((data["precioTotal"] * data["descuento"] / 100).toFixed(2));
          data["precioTotal"] = formatCurrency(parseFloat((data["precioTotal"] - descuento).toFixed(2)));
      };

      const deleteProduct = (event) => {
        confirmPop.require({
          target: event.currentTarget,
          message: 'Desea eliminar?',
          icon: 'pi pi-info-circle',
          acceptClass: 'p-button-danger',
          accept: () => {
            toast.add({severity:'info', summary:'Confirmed', detail:'You have accepted', life: 3000});
          },
          reject: () => {
            toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
          }
        });
        
      };

      const functionRefs = (el, id) => {
        overMenu.value[id] = el;
      }

      const toggleOverGrid = (event, id) => {
        overMenu.value[id].toggle(event);
      };

      const formatCurrency = (value) => {
        if(value)
          return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        return;
      };

      const closeModal = () => {
          //llama al metodo del padre, con 3 parametros.
          emit("closeModal", false)
      }

      const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < data.impuestos.length; i++) {
            if (data.impuestos[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
      }

      const toggleDeposit = (event) => {
        opDeposit.value.toggle(event);
      }

      const onRowEditSave = (event) => {
        let { newData, index } = event;

        data.formasdePago[index] = newData;
      };

      //----------- Computed
      const interesComputed = computed(() => {
        let totalInteres = 0;
        data.formasdePago.forEach(f => {
          totalInteres += f.interes;
        })
        return totalInteres;
      })

      const diferenciaComputed = computed(() => {
        let total = 0;
        data.formasdePago.forEach(f => {
          total += f.valor;
        })
        return parseFloat((total - data.comp.total).toFixed(2));
      })

      const totalComputed = computed(() => {
        let total = 0;
        data.formasdePago.forEach(f => {
          total += f.valor;
        })
        return total;
      })

      //----------- Watchers
      watch(data.comp.detalle, async (newDetalle) => {
        let total = 0, subtotal = 0, descuentos = 0, impuestos = 0, impuestoxIndex = [];
        data.impuestos = [];
        newDetalle.forEach(obj => {
          const totalItem = obj["precioUnitario"] * obj["cantidad"];
          const totalsinImpuesto = obj["precioUniSinImp"] * obj["cantidad"];
          total += totalItem;
          subtotal += totalsinImpuesto;
          obj.impuestos.forEach(imp => {
            const taxes = parseFloat((totalsinImpuesto * (1 + imp.valor / 100) - totalsinImpuesto).toFixed(2));
            const index = findIndexById(imp.id)
            if (index === -1) {
              const newImp = {
                nombre: imp.nombre,
                valor: taxes,
                id: imp.id
              }
              data.impuestos.push(newImp);
            }
            else {
              impuestoxIndex.push({index: index, taxes: taxes});
            }
            impuestos += taxes;
          })
          const bonificacion = parseFloat(((totalItem * obj["descuento"]) / 100).toFixed(2));
          descuentos += bonificacion;
          obj["precioDescuento"] = bonificacion * -1;
        })

        impuestoxIndex.forEach(i => {
          data.impuestos[i.index].valor += i.taxes;
        })
        data.comp.subTotal = subtotal.toFixed(2);
        data.comp.descuentos = (descuentos * -1).toFixed(2);
        data.comp.impuestos = impuestos.toFixed(2);
        data.comp.total = (total - descuentos).toFixed(2);
      })

      return {
        opDeposit, loading, load, maxDate, dt, data, filterDT, editingRows,

        interesComputed, diferenciaComputed, totalComputed,

        Save, searchCustomers, changeTypeVoucher, searchProducts, addProduct, editProduct, 
        deleteProduct, functionRefs, toggleOverGrid, formatCurrency, closeModal, 
        onRowEditSave, toggleDeposit,
      };
    },
    directives: {
      'tooltip': Tooltip
    },
  }
</script>