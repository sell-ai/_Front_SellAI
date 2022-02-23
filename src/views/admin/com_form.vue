// Component Form
<template>
  <div>
    <form action="" class="bg-white shadow sm:rounded-md">
      <fieldset>
        <legend class="font-bold text-gray-900 space-x-4">
          <span class="inline-block">{{ GetValueChild('lblNombre') }}</span>
          <Propiedades class="inline-block" :info="menuProp" :selField="'selTipo'"></Propiedades>
        </legend>
        
        <div class="px-4 py-6 sm:px-1">
          <div class="border-2 border-dashed border-red-100 rounded-lg h-64 overflow-scroll resize-y">
            <draggable id="formdrag" :class="CssNormal" :list="data.formElement" :move="checkMove" :group="{ name: 'elementDesign' }">
              <transition-group type="transition" name="fade">
                <div class="list-group-item bg-blue-100 m-1 p-3 rounded-md"
                  v-for="el in data.formElement" :key="el.name">
                  <txt v-if="el.id==='textbox'"></txt>
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
  </div>
</template>

<script>
import { reactive, ref, computed } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import txt from '../../components/textbox/txt.vue';
import Propiedades from '../../components/menuProp.vue';

export default {
  components: {
    draggable: VueDraggableNext,
    txt, Propiedades
  },
  props: {
    modelValue: {
      type: String,
      default: 'Formulario'
    },
    tasks: {
      required: true,
      type: Object,
    },
  },

  setup(props) {
    const IdRandom = `frm_${Math.random().toString(36).substr(2)}`;
    const propLabel = ref(props.modelValue);
    const data = reactive({
      formElement: [],
      title: '',
      id: IdRandom,
      name: IdRandom,
      prop: {
        grid: '',
        cols: 3,
        rows: 2,
        gap: 2,
        align: '',
      },
    });
    const menuProp = reactive([
        {
          id: 'prop',
          name: 'Propiedades',
          items: [
            { type: 'check', id: 'chkEnabled', value: true, label: 'Habilitado', checked: ref(true).value },
            { type: 'text', id: 'lblNombre', value: propLabel.value, label: 'Nombre', placeholder: 'Titulo', max: 20 },
            { type: 'select', id: 'selColumn', value: 'grid-cols-none', label: 'Columnas', select: [
              { value: 'grid-cols-none', text: 'None' },
              { value: 'grid-cols-1', text: '1' },
              { value: 'grid-cols-2', text: '2' },
              { value: 'grid-cols-3', text: '3' },
              { value: 'grid-cols-4', text: '4' },
              { value: 'grid-cols-5', text: '5' },
              { value: 'grid-cols-6', text: '6' },
              { value: 'grid-cols-7', text: '7' },
              { value: 'grid-cols-8', text: '8' },
              { value: 'grid-cols-9', text: '9' },
              { value: 'grid-cols-10', text: '10' },
              { value: 'grid-cols-11', text: '11' },
              { value: 'grid-cols-12', text: '12' },
            ]},
          ],
        },
        {
          id: 'event',
          name: 'Eventos',
          items: [
            { type: 'check', id: '1l', value: '1l', label: '1L', checked: false },
            { type: 'check', id: '6l', value: '6l', label: '6L', checked: false },
            { type: 'check', id: '12l', value: '12l', label: '12L', checked: false },
            { type: 'check', id: '18l', value: '18l', label: '18L', checked: false },
            { type: 'check', id: '20l', value: '20l', label: '20L', checked: false },
            { type: 'check', id: '40l', value: '40l', label: '40L', checked: true },
          ],
        },
        {
          id: 'danger',
          name: 'Zona de peligro',
          items: [
            { type: 'button', id: 'btnDelete', value: 'delete', label: 'Eliminar' },
          ],
        },
    ]);
    if (props.tasks.name !== 'Formulario') {
      data.formElement.push(props.tasks);
    }

    const checkMove = (event) => {
      const evName = event.draggedContext.element.name;
      const toID = event.to.id;
      return evName !== 'Formulario' && toID === 'formdrag';
    };

    const accionPop = (action, ele) => {
      console.log(action);
      console.log(ele);
    };

    const GetValueChild = computed(() => {
      return field => menuProp.find(me => me.id === 'prop').items.find(it => it.id === field).value;
    });

    const CssNormal = computed(() => {
        const selColumns = menuProp.find(me => me.id === 'prop').items.find(it => it.id === 'selColumn').value;
        const result = {
            'grid': true,
            [selColumns.value]: true,
            'dragArea': true,
            'list-group': true,
            'w-full': true,
        }
        return result;
    });

    return {
      data,
      menuProp,

      checkMove,
      accionPop,
      GetValueChild,
      CssNormal,
    };
  },
};
</script>
