<template>
  <button
    :type="type"
    :class="classObj">
    {{ Label }}
  </button>
</template>

<script>
const IdRandom = `btn_${Math.random().toString(36).substr(2, 9)}`;

export default {
  props: {
    Label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'button',
    },
    id: {
      type: String,
      default: IdRandom,
    },
    classObj: {
      type: Object,
      default() {
        return {
          'inline-flex': true,
          'justify-center': true,
          'py-2': true,
          'px-4': true,
          'border border-transparent': true,
          'shadow-sm': true,
          'text-sm': true,
          'font-medium': true,
          'rounded-md': true,
          'text-white': true,
          'bg-indigo-600': true,
          'hover:bg-indigo-700': true,
          'focus:outline-none': true,
          'focus:ring-2': true,
          'focus:ring-offset-2': true,
          'focus:ring-indigo-500': true,
        };
      },
    },
  },
};
</script>
