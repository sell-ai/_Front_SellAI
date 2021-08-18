<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Table></Table>
    <Section></Section>
  </div>
</template>

<script>
import table from '../components/tables/table.vue';
import Section from '../components/sections.vue';

export default {
  components: {
    Table: table,
    Section,
  },
};
</script>
