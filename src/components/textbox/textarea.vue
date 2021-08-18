<template>
  <div>
    <label :for="name" class="block text-sm font-medium text-gray-700">
      {{ Label }}
    </label>
    <textarea
      :name="name"
      :id="id"
      :autocomplete="autocomplete"
      :class="classObj"
      :placeholder="placeHolder"
      @input="changeValue($event)"
      @keyup="validate();"
      rows="3"
    />
    <p v-for="det in Error" :key="det" class="mt-2 text-sm text-red-500">
        {{ det }}
    </p>
  </div>
</template>

<script>
import { ref } from 'vue';
import * as yup from 'yup';

const IdRandom = `txt_${Math.random().toString(36).substr(2, 9)}`;
export default {
  props: {
    modelValue: {
      type: String,
    },
    Label: {
      type: String,
      default: '',
    },
    placeHolder: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: IdRandom,
    },
    id: {
      type: String,
      default: IdRandom,
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
    const valid = ref(false);
    const Error = ref([]);
    const classObj = ref({
      'mt-1': true,
      block: true,
      'w-full': true,
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

    return {
      valid,
      Error,
      classObj,

      validate,
      changeValue,
    };
  },
};
</script>
