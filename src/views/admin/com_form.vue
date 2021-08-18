// Component Form
<template>
  <form action="" class="bg-white shadow sm:rounded-md">
    <fieldset>
      <legend class="font-bold text-gray-900">
        Título
      </legend>
      <div class="px-4 py-6 sm:px-1">
        <div class="border-2 border-dashed border-red-100 rounded-lg h-24 overflow-scroll resize-y">
          <draggable id="formdrag" class="dragArea list-group w-full" :list="data.formElement" :group="{ name: 'elementDesign' }">
            <transition-group type="transition" name="fade">
              <div class="list-group-item bg-blue-100 m-1 p-3 rounded-md"
                v-for="el in data.formElement" :key="el.name" :move="checkMove">
                <txt v-if="el.id==='textbox'"><popover @accion="accionPop($event, el)"></popover></txt>
                <div v-else>
                  {{ el.name }}
                </div>
                <slot></slot>
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>
      <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Grabar
        </button>
      </div>
    </fieldset>
  </form>
</template>

<script>
import { reactive } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import txt from '../../components/textbox/txt.vue';
import popover from '../../components/popover/edittools.vue';

export default {
  components: {
    draggable: VueDraggableNext,
    txt,
    popover,
  },
  props: {
    tasks: {
      required: true,
      type: Object,
    },
  },

  setup(props) {
    const data = reactive({
      formElement: [],
      title: '',
      prop: {
        grid: '',
        cols: 3,
        rows: 2,
        gap: 2,
        align: '',
      },
    });

    if (props.tasks.name !== 'Formulario') {
      data.formElement.push(props.tasks);
    }

    const checkMove = (event) => {
      const evName = event.draggedContext.element.name;
      const toID = event.to.id;
      return evName !== 'divider' && ((evName === 'Formulario' && toID === 'maindrag') || (toID === 'formdrag' && evName !== 'Formulario'));
    };

    const accionPop = (action, ele) => {
      console.log(action);
      console.log(ele);
    };

    return {
      data,

      checkMove,
      accionPop,
    };
  },
};
</script>
