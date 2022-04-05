<template>
  <div>
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Identificador</h3>
          <p class="mt-1 text-sm text-gray-600">Información que hace referencia a la identificación del producto o servicio.</p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="nombre-name" class="block text-sm font-medium text-gray-700"> Codigos</label>
                  <Chips v-model="data.art.codigos" class="mt-1 w-full rounded-md">
                  </Chips>
                </div>

              </div>
              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="nombre-name" class="block text-sm font-medium text-gray-700"> Nombre </label>
                  <input v-model="data.art.nombre" type="text" name="nombre-name" id="serie-name" autocomplete="nombre-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div>
              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="categoria" class="block text-sm font-medium text-gray-700">Categoria</label>
                  <AutoComplete name="categoria" v-model="data.art.categoria" :suggestions="data.filteredCategorias" @complete="searchCategoria($event)" :dropdown="true" field="nombre" forceSelection
                    class="mt-1 w-full rounded-md">
                  </AutoComplete>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="marca" class="block text-sm font-medium text-gray-700">Marca</label>
                  <AutoComplete name="marca" v-model="data.art.marca" :suggestions="data.filteredBrand" @complete="searchBrand($event)" :dropdown="true" field="nombre" forceSelection
                    class="mt-1 w-full rounded-md">
                  </AutoComplete>
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
                    <input type="text" name="garantia" id="garantia" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"  />
                    <div class="absolute inset-y-0 right-0 flex items-center">
                      <label for="tiempo" class="sr-only"> Tiempo </label>
                      <select id="tiempo" name="tiempo" class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
                        <option>Meses</option>
                        <option>Días</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="proveedor" class="block text-sm font-medium text-gray-700">Proveedor</label>
                  <AutoComplete name="proveedor" v-model="data.art.proveedor" :suggestions="data.filteredProv" @complete="searchProveedor($event)" :dropdown="true" field="nombre" forceSelection
                    class="mt-1 w-full rounded-md">
                  </AutoComplete>
                </div>
              </div>

            </div>

          </div>
        </form>
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
        <form action="#" method="POST">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">

                <div class="col-span-6">
                  <label for="cotiza-a" class="block text-sm font-medium text-gray-700">Moneda a cotizar</label>
                  <Dropdown name="cotiza-a" class="mt-1 w-full" v-model="data.moneda" :options="data.monedas" optionLabel="nombre" :filter="true" placeholder="Moneda a cotizar">
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
                  <div class="w-full text-gray-900 bg-white border border-gray-200 rounded-lg">
                      <div class="relative inline-flex w-full px-4 py-2 text-sm border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                          <div class="text-left font-medium">Subtotal</div>
                          <div class="text-right"> $20</div>
                      </div>
                      <button type="button" class="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                          <svg class="w-4 h-4 mr-2 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path></svg>
                          Settings
                      </button>
                      <button type="button" class="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                          <svg class="w-4 h-4 mr-2 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clip-rule="evenodd"></path></svg>
                          Messages
                      </button>
                      <button type="button" class="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium rounded-b-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                          <svg class="w-4 h-4 mr-2 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z" clip-rule="evenodd"></path></svg>
                          Download
                      </button>
                  </div>
                </div>

                <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                  <input type="text" name="city" id="city" autocomplete="address-level2" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
                  <input type="text" name="region" id="region" autocomplete="address-level1" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label for="postal-code" class="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
                  <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </form>
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
        <form action="#" method="POST">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div class="col-span-6 sm:col-span-3">
                  <label for="tipo-articulo" class="block text-sm font-medium text-gray-700">Tipo de Artículo</label>
                  <select name="tipo-articulo" autocomplete="tipo-articulo" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option>Servicio</option>
                    <option>Producto Simple</option>
                    <option>Producto Compuesto</option>
                  </select>
              </div>
              <div class="col-span-6 sm:col-span-3">
                  <label for="tipo-articulo" class="block text-sm font-medium text-gray-700">Unidad</label>
                  <select name="tipo-articulo" autocomplete="tipo-articulo" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option>Servicio</option>
                    <option>Producto Simple</option>
                    <option>Producto Compuesto</option>
                  </select>
              </div>
              <div class="col-span-6 sm:col-span-3">
                  <label for="tipo-articulo" class="block text-sm font-medium text-gray-700">Seguimiento</label>
                  <select name="tipo-articulo" autocomplete="tipo-articulo" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option>Predeterminado</option>
                    <option selected>Ninguno</option>
                    <option>Por numero de serie</option>
                    <option>Por varaciones</option>
                  </select>
              </div>

              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-3 sm:col-span-6">
                  <label for="stock-min" class="block text-sm font-medium text-gray-700"> Punto de reposición </label>
                  <InputNumber name="stock-min" v-model="data.art.stockminimo" mode="decimal" :min="0" stockminimo :minFractionDigits="2" class="mt-1 w-full" />
                </div>
                <div class="col-span-3 sm:col-span-6">
                  <label for="stock-max" class="block text-sm font-medium text-gray-700"> Stock Máximo </label>
                  <InputNumber name="stock-max" v-model="data.art.stockmaximo" mode="decimal" :min="0" stockminimo :minFractionDigits="2" class="mt-1 w-full" />
                </div>
              </div>

              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-6">
                  <fieldset>
                    <legend class="text-base font-medium text-gray-900">Stock</legend>
                    <div class="mt-4 space-y-4">
                      <div class="flex items-start">
                        <div class="ml-3 text-sm">
                          <label for="comments" class="font-medium text-gray-700">Actual</label>
                          <p class="text-gray-500">0</p>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { reactive, ref, onMounted } from 'vue';
  import WService from './services/ws';
  import AutoComplete from 'primevue/autocomplete';
  import Chips from 'primevue/chips';
  import Dropdown from 'primevue/dropdown';
  import InputNumber from 'primevue/inputnumber';
  import MultiSelect from 'primevue/multiselect';
  export default {
    components: {
      AutoComplete,
      Chips,
      Dropdown,
      InputNumber,
      MultiSelect,
    },
    setup() {
        const wService = ref(new WService());
        onMounted(() => {
            wService.value.getMoneda().then(inf => {
              inf.forEach(item => {
                const newItem = {
                  nombre: item.nombre,
                  codigo: item.codigo,
                  valor: item.valor,
                }
                data.monedas.push(newItem);
              })
            });

            wService.value.getTaxes().then(inf => data.taxes = inf);
        })
        const data = reactive({
            art: {
              codigos: [],
              nombre: '',
              categoria: '',
              marca: '',
              serie: '',
              url: '',
              descripcion: '',
              proveedor: '',
              costo: 0,
              margen: 0,
              impuestos: [],
              stockminimo: 0,
              stockmaximo: 0
            },
            categorias: [],
            filteredCategorias: [],
            marcas: [],
            filteredBrand: [],
            proveedor: [],
            filteredProv: [],
            monedas: [],
            moneda: null,
            taxes: [],
        });

        //Método del autocomplete
        const searchCategoria = (event) => {
            setTimeout(() => {
                if (data.categorias.length == 0) {
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
                if (data.marcas.length == 0) {
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
                if (data.proveedor.length == 0) {
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

        return {
            data,

            searchCategoria,
            searchBrand,
            searchProveedor,
        };
    },
  }
</script>