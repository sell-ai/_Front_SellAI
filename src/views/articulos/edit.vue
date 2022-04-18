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
  <div v-else>
    <div>
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Identificador</h3>
            <p class="mt-1 text-sm text-gray-600">Información que hace referencia a la identificación del producto o servicio.</p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="nombre-name" class="block text-sm font-medium text-gray-700"> Codigos <span class="text-xs text-red-500">*</span></label>
                  <Chips v-model="data.art.codigos" class="mt-1 w-full rounded-md" :class="{'p-invalid': !!data.errors.codigos}" @blur="validate('codigos')" v-focus>
                  </Chips>
                  <p class="block text-xs font-medium text-gray-500">
                    Presione enter por cada código
                  </p>
                  <InlineMessage v-if="!!data.errors.codigos">{{ data.errors.codigos }}</InlineMessage>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="nombre-name" class="block text-sm font-medium text-gray-700"> Nombre <span class="text-xs text-red-500">*</span></label>
                  <input v-model="data.art.nombre" @blur="validate('nombre')" type="text" name="nombre-name" id="serie-name" autocomplete="nombre-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  <InlineMessage v-if="!!data.errors.nombre">{{ data.errors.nombre }}</InlineMessage>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="categoria" class="block text-sm font-medium text-gray-700">Categoria <span class="text-xs text-red-500">*</span></label>
                  <AutoComplete name="categoria" v-model="data.art.categoria" :suggestions="data.filteredCategorias" @complete="searchCategoria($event)" :dropdown="true" field="nombre" forceSelection
                    class="mt-1 w-full rounded-md">
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
                  <InlineMessage v-if="!!data.errors.categoria">{{ data.errors.categoria }}</InlineMessage>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="marca" class="block text-sm font-medium text-gray-700">Marca <span class="text-xs text-red-500">*</span></label>
                  <AutoComplete name="marca" v-model="data.art.marca" :suggestions="data.filteredBrand" @complete="searchBrand($event)" :dropdown="true" field="nombre" forceSelection
                    class="mt-1 w-full rounded-md">
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
                  <InlineMessage v-if="!!data.errors.marca">{{ data.errors.marca }}</InlineMessage>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="serie-name" class="block text-sm font-medium text-gray-700">Serie</label>
                  <input v-model="data.art.serie" type="text" name="serie-name" id="serie-name" autocomplete="serie-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div>

              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-4">
                  <label for="article-website" class="block text-sm font-medium text-gray-700"> Sitio Web </label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> URL: </span>
                    <input v-model="data.art.url" type="text" name="article-website" id="article-website" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com" />
                  </div>
                </div>
                <div class="col-span-3 sm:col-span-2">
                  <label for="garantia" class="block text-sm font-medium text-gray-700"> Garantia </label>
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <input v-model="data.art.garantia" type="text" name="garantia" id="garantia" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"  />
                    <div class="absolute inset-y-0 right-0 flex items-center">
                      <label for="tiempo" class="sr-only"> Tiempo </label>
                      <select v-model="data.art.tipoGarantia" id="tiempo" name="tiempo" class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
                        <option>Meses</option>
                        <option>Días</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="proveedor" class="block text-sm font-medium text-gray-700">Proveedor <span class="text-xs text-red-500">*</span></label>
                  <AutoComplete name="proveedor" v-model="data.art.proveedor" :suggestions="data.filteredProv" @complete="searchProveedor($event)" :dropdown="true" field="nombre" forceSelection
                    class="mt-1 w-full rounded-md">
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
                  <InlineMessage v-if="!!data.errors.proveedor">{{ data.errors.proveedor }}</InlineMessage>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hidden sm:block" aria-hidden="true">
      <div class="py-5">
        <div class="border-t border-gray-200" />
      </div>
    </div>

    <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Precio y Costos</h3>
            <p class="mt-1 text-sm text-gray-600">Se define el precio de venta y costo.</p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">

                <div class="col-span-6">
                  <label for="cotiza-a" class="block text-sm font-medium text-gray-700">Moneda a cotizar</label>
                  <Dropdown name="cotiza-a" class="mt-1 w-full" v-model="moneda" :options="data.monedas" optionLabel="nombre" :filter="true" placeholder="Moneda a cotizar">
                    <template #value="slotProps">
                        <div class="country-item country-item-value" v-if="slotProps.value">
                            <div>{{slotProps.value.nombre}} ({{slotProps.value.codigo}} {{slotProps.value.valor}})</div>
                        </div>
                        <span v-else>
                            {{slotProps.placeholder}}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div class="country-item">
                            <div>{{slotProps.option.nombre}} ($ {{slotProps.option.valor}})</div>
                        </div>
                    </template>
                  </Dropdown>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="precio-costo" class="block text-sm font-medium text-gray-700">Precio de costo</label>
                  <InputNumber v-model="data.art.costo" mode="currency" currency="ARS" locale="es-AR" name="precio-costo" class="mt-1 w-full" />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="margen-costo" class="block text-sm font-medium text-gray-700">Margen</label>
                  <InputNumber class="mt-1 w-full" name="margen-costo" v-model="data.art.margen" suffix="%" />
                </div>

                <div class="col-span-6">
                  <label for="taxes" class="block text-sm font-medium text-gray-700">Impuestos</label>
                  <MultiSelect name="taxes" v-model="data.art.impuestos" :options="data.taxes" optionLabel="nombre" placeholder="Impuestos a incluir" :filter="true" class="mt-1 multiselect-custom w-full" />
                </div>

                <div class="col-span-6">
                  <div class="w-full text-gray-900 bg-white border border-gray-200 rounded-lg ">
                      <div class="sm:flex sm:items-center sm:justify-between w-full px-4 py-2 text-sm border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                          <div class="font-bold">Subtotal:</div>
                          <div class="sm:flex"> $ {{subTotal}}</div>
                      </div>
                      <div class="sm:flex sm:items-center sm:justify-between w-full px-4 py-2 text-sm border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                          <div class="font-bold">Impuestos:</div>
                          <div class="sm:flex"> $ {{impuestos}}</div>
                      </div>
                      <div class="sm:flex sm:items-center sm:justify-between w-full px-4 py-2 text-sm bg-indigo-100 border-b border-indigo-500 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                          <div class="font-bold">TOTAL:</div>
                          <div class="sm:flex"> $ {{subTotal + impuestos}}</div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hidden sm:block" aria-hidden="true">
      <div class="py-5">
        <div class="border-t border-gray-200" />
      </div>
    </div>

    <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Existencias</h3>
            <p class="mt-1 text-sm text-gray-600">Se define el stock mínimo y la forma de medir.</p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div class="col-span-6 sm:col-span-3">
                  <label for="tipo-articulo" class="block text-sm font-medium text-gray-700">Tipo de Artículo</label>
                  <select name="tipo-articulo" v-model="data.art.tipoArticulo" autocomplete="tipo-articulo" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option>Servicio</option>
                    <option>Producto Simple</option>
                    <option>Producto Compuesto</option>
                  </select>
              </div>
              <div class="col-span-6 sm:col-span-3">
                  <div class="grid grid-cols-6 gap-2 flex">
                    <div class="col-span-5 flex-grow inline-block">
                      <label for="tipo-articulo" class="block text-sm font-medium text-gray-700">Unidad</label>
                      <select v-model="data.art.unidad.cadaUno" name="tipo-articulo" autocomplete="tipo-articulo" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option v-for="item in data.performance" :key="item.codigo" :value="item.codigo">{{ item.nombre }}</option>
                      </select>
                      <p class="mt-2 text-xs text-gray-500">{{rendimiento}}</p>
                    </div>
                    <div class="col-span-1 flex-none inline-block mt-8">
                      <button @click="toggle" class="w-auto flex text-xs font-medium bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded-full">
                        ...
                      </button>
                      <OverlayPanel ref="op" appendTo="body" :showCloseIcon="true" id="overlay_panel" style="width: 450px" :breakpoints="{'960px': '75vw'}">
                        <div class="flex p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
                          <svg class="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                          <div>
                            <span class="font-medium">Nota</span> Si el artículo se compra y se vende en diferentes unidades, por ejemplo los artículos que se venden fraccionados, puede proporcionar esa información aquí:
                          </div>
                        </div>
                        <div class="grid grid-cols-6 gap-2">
                          <div class="col-span-6">
                            <label for="compra-articulo" class="block text-sm font-medium text-gray-700">El artículo se compra en</label>
                            <select v-model="data.art.unidad.buyin" name="compra-articulo" autocomplete="tipo-articulo" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                              <option v-for="item in data.performance" :key="item.codigo" :value="item.codigo">{{ item.nombre }}</option>
                            </select>
                          </div>
                          <div class="col-span-6">
                            <label for="rinde-articulo" class="block text-sm font-medium text-gray-700">Cada uno/a rinde</label>
                            <InputNumber name="rinde-articulo" v-model="data.art.unidad.valor" mode="decimal" :minFractionDigits="2" :maxFractionDigits="5" class="mt-1 block w-full" />
                          </div>
                          <div class="col-span-6">
                            <label for="cada-articulo" class="block text-sm font-medium text-gray-700">c/u</label>
                            <select v-model="data.art.unidad.cadaUno" name="cada-articulo" autocomplete="tipo-articulo" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                              <option v-for="item in data.performance" :key="item.codigo" :value="item.codigo">{{ item.nombre }}</option>
                            </select>
                          </div>
                        </div>
                      </OverlayPanel>
                    </div>
                  </div>
              </div>
              <div class="col-span-">

              </div>
              <div class="col-span-6 sm:col-span-3">
                  <label for="tipo-articulo" class="block text-sm font-medium text-gray-700">Seguimiento</label>
                  <select v-model="data.art.seguimiento" name="tipo-articulo" autocomplete="tipo-articulo" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option>Predeterminado</option>
                    <option>Ninguno</option>
                    <option>Por numero de serie</option>
                    <option>Por varaciones</option>
                  </select>
              </div>

              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-3 sm:col-span-6">
                  <label for="stock-min" class="block text-sm font-medium text-gray-700"> Punto de reposición </label>
                  <InputNumber name="stock-min" v-model="data.art.stockMinimo" mode="decimal" :min="0" stockminimo :minFractionDigits="2" class="mt-1 w-full" />
                </div>
                <div class="col-span-3 sm:col-span-6">
                  <label for="stock-max" class="block text-sm font-medium text-gray-700"> Stock Máximo </label>
                  <InputNumber name="stock-max" v-model="data.art.stockMaximo" mode="decimal" :min="0" stockminimo :minFractionDigits="2" class="mt-1 w-full" />
                </div>
              </div>

              <div class="grid grid-cols-3 gap-6">
                <!-- Code block starts -->
                <div class="col-span-6">
                  <div class="flex items-center justify-center px-4">
                      <div role="alert" id="alert" class="transition duration-150 ease-in-out w-full lg:w-11/12 mx-auto bg-white dark:bg-gray-800 shadow rounded flex flex-col py-4 md:py-0 items-center md:flex-row justify-between">
                          <div class="flex flex-col items-center md:flex-row">
                              <div class="mr-3 p-4 bg-yellow-400 rounded md:rounded-tr-none md:rounded-br-none text-white">
                                  <InformationCircleIcon class="w-5 h-5" aria-hidden="true" />
                              </div>
                              <p class="mr-2 text-base font-bold text-gray-800 dark:text-gray-100 mt-2 md:my-0">Stock</p>
                              <div class="h-1 w-1 bg-gray-300 dark:bg-gray-700 rounded-full mr-2 hidden xl:block"></div>
                              <p class="text-sm lg:text-base dark:text-gray-400 text-gray-600 lg:pt-1 xl:pt-0 sm:mb-0 mb-2 text-center sm:text-left">{{data.stock}}</p>
                          </div>
                          <div class="flex xl:items-center lg:items-center sm:justify-end justify-center pr-4">
                              <button class="focus:outline-none focus:text-indigo-400 hover:text-indigo-400 text-sm mr-4 font-bold cursor-pointer text-indigo-700 dark:text-indigo-600">Detalle</button>
                          </div>
                      </div>
                  </div>
                </div>
                <!-- Code block ends -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Divider />

    <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
      <button @click="Save" type="button" :disabled="load"
        class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
        <svg v-show="load" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
        </svg>
        <i class="pi pi-save" /> Grabar
      </button>
    </div>
  </div>
  
</template>

<script>
  import { reactive, ref, onMounted, computed } from 'vue';
  import { InformationCircleIcon } from '@heroicons/vue/solid'
  import WService from './services/ws';
  import AutoComplete from 'primevue/autocomplete';
  import Chips from 'primevue/chips';
  import Dropdown from 'primevue/dropdown';
  import InputNumber from 'primevue/inputnumber';
  import MultiSelect from 'primevue/multiselect';
  import OverlayPanel from 'primevue/overlaypanel';
  import Divider from 'primevue/divider';
  import Toast from 'primevue/toast';
  import { useToast } from "primevue/usetoast";
  import InlineMessage from 'primevue/inlinemessage';
  import Skeleton from 'primevue/skeleton';

  import { object, string, array } from "yup";
    
  export default {
    props: {
      info: Object,
    },
    emits: ['closeModal'],
    components: {
      InformationCircleIcon,
      AutoComplete,
      Chips,
      Dropdown,
      InputNumber,
      MultiSelect,
      OverlayPanel,
      Divider,
      Toast,
      InlineMessage,
      Skeleton,
    },
    setup(props, { emit }) {
        const toast = useToast();
        const wService = ref(new WService());
        const newReg = ref(true); //si es editar o nuevo
        const loading = ref(true);
        const load = ref(false);
        const op = ref();
        const moneda = ref();
        const data = reactive({
            art: {
              id: '',
              codigos: [],
              nombre: '',
              categoria: null,
              marca: null,
              serie: '',
              url: '',
              descripcion: '',
              tipoGarantia: 'Meses',
              garantia: 0,
              proveedor: null,
              costo: 0,
              moneda: {},
              margen: 0,
              impuestos: [],
              pvp: 0,
              stockMinimo: 0,
              stockMaximo: 0,
              stock: 0,
              tipoArticulo: 'Producto Simple',
              unidad: {
                buyin: 1,
                valor: 1,
                cadaUno: 1
              },
              seguimiento: 'Predeterminado',
              bucket: {}
            },
            categorias: [],
            filteredCategorias: [],
            marcas: [],
            filteredBrand: [],
            proveedor: [],
            filteredProv: [],
            monedas: [],
            taxes: null,
            performance: null,
            errors: {}
        });

        onMounted(() => {
            wService.value.getMoneda().then(inf => {
              inf.forEach(j => {
                data.monedas.push(j);
                if (j.predeterminada)
                  moneda.value = j;
              })
            });
            wService.value.getTaxes().then(inf => data.taxes = inf);
            wService.value.getPerformance().then(inf => {
              data.performance = inf.value;
              loading.value = false;
            });
            //verifico si es nuevo o editar
            if (props.info.id) { 
              data.art = props.info;
              newReg.value = false;
            }
        })

        const validate = (field) => {
          schemaSave.validateAt(field, data.art).then(() => {
              data.errors[field] = "";
            }).catch(err => {
              data.errors[field] = err.message;
            });
        };
        
        const schemaSave = object().shape({
          codigos: array(string().required().nullable()).min(1, 'El campo códigos debe tener al menos 1 elemento'),
          nombre: string().required("El campo nombre debe completarse"),
          categoria: object().required("Debe seleccionar categoría").nullable(),
          marca: object().required("Debe seleccionar marca").nullable(),
          proveedor: object().required("Debe seleccionar proveedor").nullable(),
        });

        const Save = () => {
          load.value = true;
          schemaSave.validate(data.art, { abortEarly: false }).then(() => {
            data.art.pvp = subTotal.value + impuestos.value; //suma el pvp
            data.art.moneda = {
              nominal: moneda.value.valor,
              simbolo: moneda.value.simbolo,
              lugar: moneda.value.lugar,
              desde:moneda.value.desde
            }
            const toSave = JSON.stringify(data.art);
            wService.value.postArticulo(toSave, data.art.id).then(res => {
              load.value = false;
              closeModal(res.value);
            }).catch(error => {
              load.value = false;
              if (error.response) {
                console.log("Error Response", error.response.data);
                for(const [value] of Object.entries(error.response.data.errors)){
                  console.log(error.response.data.errors[value][0]);
                }
              } else if (error.request) {
                console.log("Error Request", error.request);
                console.log("Error Message", error.request.message);
              } else {
                console.log(error.toJSON());
              }
            });
          }).catch(err => {
            toast.add({severity:'warn', summary: 'Atención!', detail:'Verifique los campos para poder grabar', life: 3000});
            load.value = false;
            err.inner.forEach(error => {
              data.errors[error.path] = error.message;
            });
          });
        };

        //Método del autocomplete
        const searchCategoria = (event) => {
            setTimeout(() => {
                if (data.categorias && data.categorias.length == 0) {
                  wService.value.getCategorias().then(info => {
                    data.categorias = info;
                    filters(event.query, 'filteredCategorias', 'categorias');
                  });
                }
                else {
                  filters(event.query, 'filteredCategorias', 'categorias');
                }
            }, 250);
        };

        //Método del autocomplete
        const searchBrand = (event) => {
            setTimeout(() => {
                if (data.marcas && data.marcas.length == 0) {
                  wService.value.getBrand().then(info => {
                    data.marcas = info;
                    filters(event.query, 'filteredBrand', 'marcas');
                  });
                }
                else {
                  filters(event.query, 'filteredBrand', 'marcas');
                }
            }, 250);
        };

        //Método del autocomplete
        const searchProveedor = (event) => {
            setTimeout(() => {
                if (data.proveedor && data.proveedor.length == 0) {
                  wService.value.getProveedor().then(info => {
                    data.proveedor = info;
                    filters(event.query, 'filteredProv', 'proveedor');
                  });
                }
                else {
                  filters(event.query, 'filteredProv', 'proveedor');
                }
            }, 250);
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

        //Para mostrar el overpanel
        const toggle = (event) => {
            op.value.toggle(event);
        };

        //Calcula subtotal
        const subTotal = computed(() => {
          let monedaLocal = data.art.costo;
          if (moneda.value) {
            monedaLocal = moneda.value.valor * data.art.costo;
          }
          const margen = monedaLocal * data.art.margen / 100;
          return monedaLocal + margen;
        })

        //Calculo Impuestos
        const impuestos = computed(() => {
          let totalImpuesto = 0;
          if (data.art.impuestos)
            data.art.impuestos.forEach(imp => {
              const subImp = subTotal.value * imp.valor / 100;
              totalImpuesto += subImp;
            })

          return totalImpuesto;
        })

        //Muestra el rendimiento de las unidades
        const rendimiento = computed(() => {
          if (data.performance && data.performance.length > 0) {
            const buyName = data.performance.find(x => x.codigo === data.art.unidad.buyin);
            const cadaName = data.performance.find(x => x.codigo === data.art.unidad.cadaUno);
            return "Cada " + buyName.nombre + " es " + data.art.unidad.valor + " " + cadaName.nombre;
          }
          return "Cada Unidad es 1";
        })

        const closeModal = (newVal) => {
          //llama al metodo del padre, con 3 parametros.
          //parm 1: que cierre el modal.
          //parm 2: indica si es nuevo o editar el registro.
          //parm 3: envía el valor del registro con nuevo id.
          emit("closeModal", false, newReg.value, newVal)
        }

        return {
            loading, load, op, moneda, data, 
            
            validate, schemaSave, Save, searchCategoria, searchBrand, 
            searchProveedor, toggle, subTotal, impuestos, rendimiento, 
            closeModal,
        };
    },
    directives: {
      // enables v-focus in template
      focus: {
        mounted: (el) => {
          if (el.getElementsByTagName('INPUT').length > 0) {
            el.getElementsByTagName('INPUT')[0].focus();
          }
          else {
            el.focus();
          }
        }
      }
    }
  }
</script>