<template>
  <div>
    <label :for="PropsRef.name" class="block text-sm font-medium" :class="GetValueChild('selColLbl')">
      {{ GetValueChild('lblLabel') }} 
    </label>

    <div class="mt-1 relative rounded-md shadow-sm">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span class="text-gray-500 sm:text-sm">
          {{ GetValueChild('txtSymbol') }}
        </span>
      </div>
      
      <input v-if="cssAdvanced" :type="type" :name="PropsRef.name" :id="PropsRef.id" :autocomplete="autocomplete" :class="GetValueChild('txtCssAdvanced')" :placeholder="GetValueChild('txtPlaceHolder')"
        @input="changeValue($event)" @keyup="validate();" />

      <input v-else :type="type" :name="PropsRef.name" :id="PropsRef.id" :autocomplete="autocomplete" :class="classObj" :placeholder="GetValueChild('txtPlaceHolder')"
        @input="changeValue($event)" @keyup="validate();" />

      <div class="absolute inset-y-0 right-0 flex items-center">
        <!-- Otro -->
      </div>
      <div class="absolute inset-y-0 right-0 flex items-center">
        <Propiedades :info="menuProp" :selField="'selTipo'"></Propiedades>
      </div>
      
    </div>
    <p v-for="det in Error" :key="det" class="mt-2 text-sm text-red-500">
        {{ det }}
    </p>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue';
import Propiedades from '../menuProp.vue';
import * as yup from 'yup';

export default {
  components: {
    Propiedades,
  },
  props: {
    modelValue: {
      type: String,
    },
    Label: {
      type: String,
      default: 'TextBox',
    },
    type: {
      type: Object,
      default() {
        return { value: 'text', text: 'Texto' }
      },
    },
    name: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    autocomplete: {
      type: String,
      default: '',
    },
    rules: {
      type: Object,
      default() {
        return yup.mixed().notRequired();
      },
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const propShow = ref(false);
    const propiedadesMenu = ref(null);
    const IdRandom = `txt_${Math.random().toString(36).substr(2)}`;
    const PropsRef = reactive({
      id: props.id,
      name: props.name
    })
    if (PropsRef.id === '') {
      PropsRef.id = PropsRef.name = IdRandom;
    }

    const menuProp = reactive([
        {
          id: 'prop',
          name: 'Propiedades',
          items: [
            { type: 'check', id: 'chkEnabled', checked: true, label: 'Habilitado' },
            { type: 'text', id: 'txtName', value: PropsRef.name, label: 'Nombre', placeholder: 'Nombre', readonly: true },
            { type: 'text', id: 'lblLabel', value: props.Label, label: 'Texto del Label', placeholder: 'Etiqueta', max: 30 },
            { type: 'select', id: 'selColLbl', value: { value: 'text-red-500: true', text: 'Rojo' }, label: 'Color del Label', select: [
              { value: 'text-red-500: true', text: 'Rojo' },
              { value: 'text-yellow-200: true', text: 'Amarillo' },
              { value: 'text-yellow-500', text: 'Naranja' },
              { value: 'text-green-500', text: 'Verde' },
              { value: 'text-blue-600', text: 'Azul' },
              { value: 'text-indigo-600', text: 'Indigo' },
              { value: 'text-purple-600', text: 'Purpura' },
              { value: 'text-pink-400', text: 'Rosado' },
              { value: 'text-black', text: 'Negro' },
              { value: 'text-gray-500', text: 'Gris' },
            ]},
            { type: 'text', id: 'txtSymbol', value: '', label: 'Simbolo', placeholder: '', max: 1 },
            { type: 'text', id: 'txtPlaceHolder', value: '', label: 'Placeholder', placeholder: 'Texto de ejemplo', max: 20 },
            { type: 'divider'},
            { type: 'select', id: 'selTipo', value: props.type, label: 'Tipo', select: [
              {
                value: 'text',
                text: 'Texto'
              },
              {
                value: 'color',
                text: 'Color'
              },
              {
                value: 'email',
                text: 'Email'
              },
              {
                value: 'tel',
                text: 'Telefono'
              },
            ]},
            { type: 'check', id: 'chkRelation', checked: false, label: 'Habilita Purple', change: 'relationPurple' },
            { type: 'check', id: 'chkPurple', checked: false, label: 'Purple', enabled: false, relationPurple: true  },
            { type: 'check', id: 'chkRed', checked: false, label: 'Red', enabled: false, relationPurple: true  },
            { type: 'divider'},
            { type: 'check', id: 'chkAdvanced', checked: false, label: 'CSS Avanzado', change: 'cssAdvanced' },
            { type: 'text', id: 'txtCssAdvanced', value: '', label: 'CSS', placeholder: 'Css Tailwind', enabled: false, cssAdvanced: true, eshijo: true },
            { type: 'divider'},
          ],
        },
        {
          id: 'event',
          name: 'Eventos',
          items: [
            { type: 'check', id: '2l', checked: true, label: '2L' },
            { type: 'check', id: '6l', checked: false, label: '6L' },
            { type: 'check', id: '12l', checked: true, label: '12L' },
            { type: 'check', id: '18l', checked: false, label: '18L' },
            { type: 'check', id: '20l', checked: true, label: '20L' },
            { type: 'check', id: '40l', checked: false, label: '40L' },
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
    const valid = ref(false);
    const Error = ref([]);
    const classObj = ref({
      'mt-1': true,
      block: true,
      'w-full': true,
      'pl-7': true,
      'pr-12': true,
      'shadow-sm': true,
      'sm:text-sm': true,
      'border-gray-300': true,
      'rounded-md': true,
      'focus:ring-indigo-500': true,
      'focus:border-indigo-500': true,
    });

    const validate = () => {
      Error.value = [];
      props.rules.validate(props.modelValue, { abortEarly: false }).then(() => {
        valid.value = true;
        classObj.value = {
          'mt-1': true,
          block: true,
          'w-full': true,
          'pl-7': true,
          'pr-12': true,
          'shadow-sm': true,
          'sm:text-sm': true,
          'border-gray-300': true,
          'rounded-md': true,
          'focus:ring-indigo-500': true,
          'focus:border-indigo-500': true,
        };
      }).catch((err) => {
        err.inner.forEach((error) => {
          Error.value.push(error.message);
          valid.value = false;
          classObj.value = {
            'mt-1': true,
            block: true,
            'w-full': true,
            'pl-7': true,
            'pr-12': true,
            'shadow-sm': true,
            'sm:text-sm': true,
            'border-red-300': true,
            'rounded-md': true,
            'focus:ring-red-500': true,
            'focus:border-red-500': true,
          };
        });
      });
    };

    const changeValue = (value) => {
      emit('update:modelValue', value.target.value);
    };

    const cssAdvanced = computed(()=>{
      return menuProp.find(me => me.id === 'prop').items.find(it => it.id === 'chkAdvanced').checked;
    });

    const GetValueChild = computed(() => {
      return field => menuProp.find(me => me.id === 'prop').items.find(it => it.id === field).value;
    });

    return {
      propShow,
      propiedadesMenu,
      valid,
      Error,
      classObj,
      menuProp,
      PropsRef,

      validate,
      changeValue,
      cssAdvanced,
      GetValueChild,
    };
  },
};
</script>
