<template>
  <Toast />
  <div v-if="loading" class="custom-skeleton p-4">
      <div class="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-coolGray-900">
        <div class="space-y-2 col-span-full lg:col-span-1">
          <Skeleton width="5rem" class="mb-2"></Skeleton>
          <Skeleton height="2rem" class="mb-2"></Skeleton>
        </div>
        <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
          <div class="col-span-full sm:col-span-4">
            <Skeleton width="5rem" height=".5rem" class="mb-2"></Skeleton>
            <Skeleton class="mb-2"></Skeleton>
          </div>
          <div class="col-span-full sm:col-span-2">
            <Skeleton width="5rem" height=".5rem" class="mb-2"></Skeleton>
            <Skeleton class="mb-2"></Skeleton>
          </div>
          <div class="col-span-full sm:col-span-3">
            <Skeleton width="5rem" height=".5rem" class="mb-2"></Skeleton>
            <Skeleton class="mb-2"></Skeleton>
          </div>
          <div class="col-span-full sm:col-span-3">
            <Skeleton width="5rem" height=".5rem" class="mb-2"></Skeleton>
            <Skeleton class="mb-2"></Skeleton>
          </div>
          <div class="col-span-full">
            <Skeleton width="5rem" height=".5rem" class="mb-2"></Skeleton>
            <Skeleton class="mb-2"></Skeleton>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-coolGray-900">
        <div class="space-y-2 col-span-full lg:col-span-1">
          <Skeleton width="5rem" class="mb-2"></Skeleton>
          <Skeleton height="2rem" class="mb-2"></Skeleton>
        </div>
        <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
          <div class="col-span-full sm:col-span-1">
            <Skeleton width="5rem" height=".5rem" class="mb-2"></Skeleton>
            <Skeleton class="mb-2"></Skeleton>
          </div>
          <div class="col-span-full sm:col-span-1">
            <Skeleton width="5rem" height=".5rem" class="mb-2"></Skeleton>
            <Skeleton class="mb-2"></Skeleton>
          </div>
          <div class="sm:col-span-4"></div>
          <div class="col-span-full sm:col-span-1">
            <Skeleton width="5rem" height=".5rem" class="mb-2"></Skeleton>
            <Skeleton class="mb-2"></Skeleton>
          </div>
          <div class="col-span-full sm:col-span-1">
            <Skeleton width="5rem" height=".5rem" class="mb-2"></Skeleton>
            <Skeleton class="mb-2"></Skeleton>
          </div>
        </div>
      </div>
  </div>
  <section v-else class="p-6 dark:bg-coolGray-800 dark:text-coolGray-50">
    <form novalidate="" action="" class="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
      <BlockUI :blocked="blockedPanel">
        <fieldset class="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-coolGray-900">
          <div class="space-y-2 col-span-full lg:col-span-1">
            <p class="text-lg font-medium leading-6 text-gray-900">Entrada o salida manual de productos</p>
            <p class="text-xs">Va a realizar un movimiento de mercadería de una situación a otra. Es recomendable que haga este movimiento por medio de un comprobante si fuera posible.</p>
          </div>
          <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div class="col-span-full sm:col-span-4">
              <label for="product" class="text-sm">Producto</label>
              <AutoComplete name="product" v-model="formData.producto" :suggestions="products" @complete="searchProd($event)" :dropdown="true" field="nombre" forceSelection
                class="mt-1 w-full rounded-md p-inputtext-filled">
                <template #item="slotProps">
                  <div class="flex flex-row">
                      <span :class="{'bg-red-100': !slotProps.item.activo, 'text-red-800': !slotProps.item.activo, 'bg-green-100': slotProps.item.activo,
                              'text-green-800': slotProps.item.activo}" class="text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                          <i v-if="slotProps.item.activo" class="pi pi-check"></i>
                          <i v-else class="pi pi-times"></i>
                      </span>
                      <div class="ml-2">{{slotProps.item.nombre}}</div>
                  </div>
                </template>
              </AutoComplete>
            </div>
            <div class="col-span-full sm:col-span-2">
              <label for="cantidad" class="text-sm">Cantidad</label>
              <InputNumber v-model="formData.cantidad" mode="decimal" locale="es-AR" :maxFractionDigits="2" showButtons name="cantidad" class="mt-1 w-full" :min="0" />
            </div>
            <div class="col-span-full sm:col-span-3">
              <label for="origen" class="text-sm">Origen</label>
              <Dropdown name="origen" class="mt-1 w-full" v-model="formData.origen" :options="origens" optionLabel="nombre" :filter="true" placeholder="Origen">
                <template #option="slotProps">
                    <div class="flex flex-row">
                        <span :class="{
                            'bg-yellow-100': !slotProps.option.editable, 'text-yellow-800': !slotProps.option.editable,
                            'bg-red-100': !slotProps.option.activo && slotProps.option.editable, 'text-red-800': !slotProps.option.activo && slotProps.option.editable, 
                            'bg-green-100': slotProps.option.activo, 'text-green-800': slotProps.option.activo
                            }" class="text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                          <i v-if="slotProps.option.activo" class="pi pi-check"></i>
                          <i v-else-if="!slotProps.option.editable" class="pi pi-database"></i>
                          <i v-else class="pi pi-times"></i>
                        </span>
                        <div>{{slotProps.option.nombre}}</div>
                    </div>
                </template>
              </Dropdown>
            </div>
            <div class="col-span-full sm:col-span-3">
              <label for="destino" class="text-sm">Destino</label>
              <Dropdown name="destino" class="mt-1 w-full" v-model="formData.destino" :options="origens" optionLabel="nombre" :filter="true" placeholder="Destino">
                <template #option="slotProps">
                    <div class="flex flex-row">
                        <span :class="{
                            'bg-yellow-100': !slotProps.option.editable, 'text-yellow-800': !slotProps.option.editable,
                            'bg-red-100': !slotProps.option.activo && slotProps.option.editable, 'text-red-800': !slotProps.option.activo && slotProps.option.editable, 
                            'bg-green-100': slotProps.option.activo, 'text-green-800': slotProps.option.activo
                            }" class="text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                          <i v-if="slotProps.option.activo" class="pi pi-check"></i>
                          <i v-else-if="!slotProps.option.editable" class="pi pi-database"></i>
                          <i v-else class="pi pi-times"></i>
                        </span>
                        <div>{{slotProps.option.nombre}}</div>
                    </div>
                </template>
              </Dropdown>
            </div>
            <div class="col-span-full">
              <label for="observacion" class="text-sm">Observación</label>
              <InputText name="observacion" type="text" v-model="formData.observacion" class="w-full rounded-md" />
            </div>
          </div>
        </fieldset>
      </BlockUI>
      <fieldset class="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-coolGray-900">
        <div class="space-y-2 col-span-full lg:col-span-1">
          <p class="font-medium">Situación</p>
          <p class="text-xs">Se ve como afecta el movimiento antes de grabar</p>
        </div>
        <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
          <div class="col-span-full sm:col-span-1">
            <label for="org-antes" class="text-sm">Origen Antes</label>
            <input id="org-antes" v-model="origenAntes" type="text" placeholder="" class="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 text-sm" disabled>
          </div>
          <div class="col-span-full sm:col-span-1">
            <label for="org-desp" class="text-sm">Origen Después</label>
            <input id="org-desp" v-model="origenDespues" type="text" placeholder="" class="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 text-sm" disabled>
          </div>
          <div class="sm:col-span-4">
            <Tag class="mr-2" icon="pi pi-info-circle" severity="info" :value="origenName"></Tag>
          </div>
          <div class="col-span-full sm:col-span-1">
            <label for="des-antes" class="text-sm">Destino Antes</label>
            <input id="des-antes" v-model="destinoAntes" type="text" placeholder="" class="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 text-sm" disabled>
          </div>
          <div class="col-span-full sm:col-span-1">
            <label for="des-desp" class="text-sm">Destino Después</label>
            <input id="des-desp" v-model="destinoDespues" type="text" placeholder="" class="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 text-sm" disabled>
          </div>
          <div class="sm:col-span-4">
            <Tag class="mr-2" icon="pi pi-info-circle" severity="info" :value="destinoName"></Tag>
          </div>
          <div class="col-span-full">
            <div class="relative flex py-5 items-center">
              <div class="flex-grow border-t border-gray-400"></div>
              <div class="flex-shrink mx-4 text-gray-400">
                <button @click="Save" type="button" :disabled="blockedPanel"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-indigo-900 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500">
                  <svg v-show="blockedPanel" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                  </svg>
                  <i class="pi pi-save" /> Grabar
                </button>
              </div>
              <div class="flex-grow border-t border-gray-400"></div>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  </section>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import * as yup from "yup";

import AutoComplete from 'primevue/autocomplete';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Tag from 'primevue/tag';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import Skeleton from 'primevue/skeleton';
import BlockUI from 'primevue/blockui';
import WService from '@/plugins/ws';

export default {
  components: {
    AutoComplete, Dropdown, InputNumber, InputText, Tag, Toast, Skeleton, BlockUI
  },
  setup() {
    const wService = ref(new WService());
    const toast = useToast();
    const loading = ref(true);
    const formData = reactive({
      producto: null,
      cantidad: 0,
      origen: null,
      destino: null,
      observacion: ''
    })
    const products = ref();
    const origens = ref();
    const blockedPanel = ref(false);
    const searchProd = (event) => {
        setTimeout(() => {
          let searchtype = "product/gettopproduct/10"
          let buscar = false;
          if (event.query !== "" && event.query.length > 1) {
            buscar = true;
            searchtype = "product/filterproduct/" + event.query;
          }
          else if (event.query === "") {
            buscar = true;
          }
          if (buscar)
            wService.value.getMethod(searchtype).then(info => {
              products.value = info;
            }).catch(() => {
              toast.add({severity: 'warn', summary: 'Atención!', detail: 'Error al recuperar datos del servidor (Producto)', life: 3000});
            });
        }, 250);
    };

    const schemaSave = yup.object().shape({
      producto: yup.object().required("Debe seleccionar producto").nullable(),
      origen: yup.object().required("Debe seleccionar Origen").nullable(),
      destino: yup.object().required("Debe seleccionar Destino").nullable().notOneOf([yup.ref('origen'), null], "Destino no puede ser mismo que origen"),
    });

    const Save = () => {
      blockedPanel.value = true;
      schemaSave.validate(formData, { abortEarly: false }).then(() => {
          const toSave = JSON.stringify(formData);
          wService.value.postMethod('product/movs/', toSave, formData.producto.id).then(info => {
            if (info) {
              toast.add({severity: 'info', summary: 'OK!', detail: 'Se grabo el movimiento'});
              formData.producto = null;
              formData.cantidad = 0;
              formData.origen = null;
              formData.destino = null;
              formData.observacion = '';
            }
            else
              toast.add({severity: 'error', summary: 'Error!', detail: 'Error al grabar el movimiento', life: 10000});  
            blockedPanel.value = false;
          }).catch(err => {
            blockedPanel.value = false;
            console.log(err);
            toast.add({severity: 'error', summary: 'Error!', detail: 'Error al grabar el movimiento'});
          });
      }).catch((err)=> {
        blockedPanel.value = false;
        if (err && err.inner)
          err.inner.forEach(error => {
            toast.add({severity: 'warn', summary: error.path, detail: error.message, life: 3000});
          });
        else
          toast.add({severity: 'warn', summary: 'Atención!', detail: 'Verifique los campos', life: 3000});
      })
    }

    onMounted(() => {
      loadSitu();
    });

    const loadSitu = () => {
      wService.value.getMethod('situacion/extra/').then(info => {
        origens.value = info;
        loading.value = false;
      }).catch(err => {
        loading.value = false;
        console.log(err);
        toast.add({severity: 'error', summary: 'Atención!', detail: 'Error al recuperar datos del servidor', life: 3000});
      });
    }

    const origenName = computed(() => {
      if (formData.origen)
        return formData.origen.nombre;
      return '';
    });

    const destinoName = computed(() => {
      if (formData.destino)
        return formData.destino.nombre;
      return '';
    });

    const origenAntes = computed(() => {
      if (formData.producto && formData.producto.stockDeposito && formData.origen) {
        const prodFind = formData.producto.stockDeposito.find(f => f.id == formData.origen.id)
        if (prodFind && prodFind.cuentaStock)
          return prodFind.stock;
      }
      return 0;
    })
    
    const origenDespues = computed(() => {
      const cant = formData.cantidad * -1;
      if (formData.producto && formData.producto.stockDeposito && formData.origen) {
        const prodFind = formData.producto.stockDeposito.find(f => f.id == formData.origen.id);
        if (prodFind && prodFind.cuentaStock)
          return prodFind.stock + cant;
      }
      else if (formData.origen && formData.origen.cuentaStock) {
        return cant;
      }
      return 0;
    })

    const destinoAntes = computed(() => {
      if (formData.producto && formData.producto.stockDeposito && formData.destino) {
        const prodFind = formData.producto.stockDeposito.find(f => f.id == formData.destino.id)
        if (prodFind && formData.destino && formData.destino.cuentaStock)
          return prodFind.stock;
      }
      return 0;
    })

    const destinoDespues = computed(() => {
      if (formData.producto && formData.producto.stockDeposito && formData.destino) {
        const prodFind = formData.producto.stockDeposito.find(f => f.id == formData.destino.id)
        if (prodFind && prodFind.cuentaStock)
          return prodFind.stock + formData.cantidad;
      }
      if (formData.destino && formData.destino.cuentaStock && formData.cantidad) {
        return formData.cantidad;
      }
      return 0;
    })

    return {
      formData, products, origens, origenAntes, origenDespues,
      destinoAntes, destinoDespues, loading, blockedPanel,
      origenName, destinoName,

      searchProd, Save,
    }

  }
}
</script>