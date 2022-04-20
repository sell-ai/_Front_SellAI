<template>
  <Toast />
  <section class="p-6 dark:bg-coolGray-800 dark:text-coolGray-50">
    <form novalidate="" action="" class="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
      <fieldset class="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-coolGray-900">
        <div class="space-y-2 col-span-full lg:col-span-1">
          <p class="text-lg font-medium leading-6 text-gray-900">Entrada o salida manual de productos</p>
          <p class="text-xs">Va a realizar un movimiento de mercadería de una situación a otra. Es recomendable que haga este movimiento por medio de un comprobante si fuera posible.</p>
        </div>
        <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
          <div class="col-span-full">
            <label for="tipo-Mov" class="text-sm">Movimiento</label>
            <Dropdown name="tipo-Mov" v-model="selectedMov" :options="tipoMov" optionLabel="name" optionValue="code" placeholder="Seleccione tipo de movimiento" class="w-full rounded-md" />
          </div>
          <div class="col-span-full sm:col-span-4">
            <label for="product" class="text-sm">Producto</label>
            <input name="product" type="text" placeholder="Artículo" class="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-coolGray-700 dark:text-coolGray-900">
          </div>
          <div class="col-span-full sm:col-span-2">
            <label for="cantidad" class="text-sm">Cantidad</label>
            <input id="cantidad" type="number" placeholder="Cantidad" class="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-coolGray-700 dark:text-coolGray-900">
          </div>
          <div class="col-span-full sm:col-span-3">
            <label for="origen" class="text-sm">Origen</label>
            <input id="origen" type="text" placeholder="" class="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-coolGray-700 dark:text-coolGray-900">
          </div>
          <div class="col-span-full sm:col-span-3">
            <label for="destino" class="text-sm">Destino</label>
            <input id="destino" type="text" placeholder="" class="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-coolGray-700 dark:text-coolGray-900">
          </div>
          <div class="col-span-full">
            <label for="observacion" class="text-sm">Observación</label>
            <input id="observacion" type="text" placeholder="" class="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-coolGray-700 dark:text-coolGray-900">
          </div>
        </div>
      </fieldset>
      <fieldset class="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-coolGray-900">
        <div class="space-y-2 col-span-full lg:col-span-1">
          <p class="font-medium">Situación</p>
          <p class="text-xs">Se ve como afecta el movimiento antes de grabar</p>
        </div>
        <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
          <div class="col-span-full sm:col-span-1">
            <label for="username" class="text-sm">Origen Antes</label>
            <input id="username" type="text" placeholder="Username" class="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-coolGray-700 dark:text-coolGray-900">
          </div>
          <div class="col-span-full sm:col-span-1">
            <label for="website" class="text-sm">Origen Después</label>
            <input id="website" type="text" placeholder="https://" class="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-coolGray-700 dark:text-coolGray-900">
          </div>
          <div class="sm:col-span-4"></div>
          <div class="col-span-full sm:col-span-1">
            <label for="username" class="text-sm">Destino Antes</label>
            <input id="username" type="text" placeholder="Username" class="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-coolGray-700 dark:text-coolGray-900">
          </div>
          <div class="col-span-full sm:col-span-1">
            <label for="website" class="text-sm">Destino Después</label>
            <input id="website" type="text" placeholder="https://" class="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-coolGray-700 dark:text-coolGray-900">
          </div>
        </div>
      </fieldset>
    </form>
  </section>
</template>

<script>
import { ref } from 'vue';
import Dropdown from 'primevue/dropdown';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";

export default {
  components: {
    Dropdown, Toast,
  },
  setup() {
    const toast = useToast();
    console.log(toast);
    const selectedMov = ref();

    const tipoMov = ref([
        {name: 'Entrada', code: '1'},
        {name: 'Salida', code: '-1'},
    ]);

    return {
      selectedMov, tipoMov,
    }

  }
}
</script>