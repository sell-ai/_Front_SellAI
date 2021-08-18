<template>
  <div>
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0 bg-gray-50">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Contenedores</h3>
          <draggable class="dragArea list-group w-full"
            :list="data.listElement"
            :group="{ name: 'elementDesign', pull: 'clone', put: false }"
            :sort="false" @change="log" :move="checkMove">
            <div v-for="element in data.listElement" :key="element.name">
              <div v-if="element.name !== 'divider'" class="list-group-item bg-indigo-300 m-1 p-3 rounded-md text-center flex justify-between w-full px-4 py-2">
                <svg v-if="element.fontawesome" aria-hidden="true" focusable="false" data-icon="wpforms" role="img" class="h-5 w-5 stroke-current stroke-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path fill="currentColor" :d="element.d" />
                </svg>
                <svg v-else-if="element.only" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path :d="element.d" />
                </svg>
                <svg v-else-if="!element.d2" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" :d="element.d" clip-rule="evenodd" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path :d="element.d" />
                  <path fill-rule="evenodd" :d="element.d2" clip-rule="evenodd" />
                </svg>
                {{ element.name }}
              </div>
              <div v-else class="hidden sm:block" aria-hidden="true">
                <div class="relative mt-6">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300">
                        </div>
                    </div>
                    <div class="relative flex justify-center text-sm leading-5">
                        <span class="px-2 bg-gray-50">
                            Elementos
                        </span>
                    </div>
                </div>
              </div>
            </div>
          </draggable>
        </div>
      </div>

      <div class="mt-5 md:mt-0 md:col-span-2 bg-white">
        <form action="">
          <fieldset>
            <legend class="font-bold text-gray-900">
              Diseño
            </legend>
            <div class="px-4 py-6 sm:px-1">
              <div class="border-4 border-dashed border-gray-200 rounded-lg h-96 overflow-scroll">
                <draggable class="dragArea list-group w-full" id="maindrag"
                  :list="data.formElement" group="elementDesign"
                  @change="log" :move="checkMove">
                  <transition-group type="transition" name="flip-list">
                    <div class="list-group-item bg-gray-300 m-1 p-3 rounded-md"
                      v-for="element in data.formElement" :key="element.name">
                      <com-form v-if="element.id==='form'" :tasks="element">
                      </com-form>
                      <div v-else>
                        {{ element.name }}
                      </div>
                    </div>
                  </transition-group>
                </draggable>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Save
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
import { reactive } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import comForm from './com_form.vue';

export default {
  components: {
    draggable: VueDraggableNext,
    comForm,
  },
  setup() {
    const data = reactive({
      listElement: [
        {
          name: 'Formulario',
          id: 'form',
          d: 'M448 75.2v361.7c0 24.3-19 43.2-43.2 43.2H43.2C19.3 480 0 461.4 0 436.8V75.2C0 51.1 18.8 32 43.2 32h361.7c24 0 43.1 18.8 43.1 43.2zm-37.3 361.6V75.2c0-3-2.6-5.8-5.8-5.8h-9.3L285.3 144 224 94.1 162.8 144 52.5 69.3h-9.3c-3.2 0-5.8 2.8-5.8 5.8v361.7c0 3 2.6 5.8 5.8 5.8h361.7c3.2.1 5.8-2.7 5.8-5.8zM150.2 186v37H76.7v-37h73.5zm0 74.4v37.3H76.7v-37.3h73.5zm11.1-147.3l54-43.7H96.8l64.5 43.7zm210 72.9v37h-196v-37h196zm0 74.4v37.3h-196v-37.3h196zm-84.6-147.3l64.5-43.7H232.8l53.9 43.7zM371.3 335v37.3h-99.4V335h99.4z',
          fontawesome: true,
        },
        {
          name: 'divider',
        },
        {
          name: 'Caja de Texto',
          id: 'textbox',
          d: 'M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z',
        },
        {
          name: 'Caja de Texto Ampliada',
          id: 'textarea',
          d: 'M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z',
        },
        {
          name: 'Fecha',
          id: 'datetime',
          d: 'M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z',
        },
        {
          name: 'Hora',
          id: 'time',
          d: 'M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z',
        },
        {
          name: 'Calendario',
          id: 'calendar',
          d: 'M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z',
        },
        {
          name: 'Moneda',
          id: 'money',
          d: 'M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z',
          d2: 'M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z',
        },
        {
          name: 'Redireccionar',
          id: 'link',
          d: 'M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z',
        },
        {
          name: 'Tabla',
          id: 'table',
          d: 'M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z',
        },
      ],
      formElement: [],
    });

    const log = (event) => {
      const { moved, added } = event;
      if (moved) console.log('moved', moved);
      if (added) console.log('added', added, added.element);
    };

    const checkMove = (event) => {
      const evName = event.draggedContext.element.name;
      const toID = event.to.id;
      return evName !== 'divider' && ((evName === 'Formulario' && toID === 'maindrag') || (toID === 'formdrag' && evName !== 'Formulario'));
    };

    return {
      data,

      log,
      checkMove,
    };
  },
};
</script>
