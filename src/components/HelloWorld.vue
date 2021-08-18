<template>
  <div class="grid grid-cols-1 gap-8 p-4 lg:grid-cols-2 xl:grid-cols-4">
    <card v-for="i in items" :key="i"></card>
  </div>
</template>

<script>
import { ref } from 'vue';
import Card from './cards/card.vue';

export default {
  name: 'HelloWorld',
  components: {
    Card,
  },
  props: {
    msg: String,
  },
  setup() {
    const items = ref([1, 2, 3, 4, 5]);

    return { items };
  },
};
</script>
