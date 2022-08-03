<template>
  <Toast />
  <Panel header="Inteligencia Artificial" :toggleable="true">
    <template #icons>
      <button class="p-panel-header-icon p-link mr-2">
        <span class="pi pi-question-circle"></span>
      </button>
      <button class="p-panel-header-icon p-link mr-2" @click="toggle">
        <span class="pi pi-cog"></span>
      </button>
      <Menu id="config_menu" ref="menu" :model="items" :popup="true" />
    </template>
    <div class="grid grid-cols-6 gap-4">
      <div class="col-span-4">
        <span class="p-input-icon-right w-full">
          <i v-if="load" class="pi pi-spin pi-spinner" />
          <InputText type="text" v-model="value" class="w-full" />
          <small id="username1-help">Primero presione el botón para hablar...</small>
        </span>
      </div>
      <div class="col-span-2">
        <i v-if="load" class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        <Button v-else icon="pi pi-comment" class="p-button-rounded p-button-outlined" />
      </div>
    </div>
  </Panel>
</template>

<script>
import { ref } from 'vue';
import Panel from 'primevue/panel';
import Menu from 'primevue/menu';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";

export default ({
  components: {
    Panel, Menu, InputText, Button,
    Toast,
  },
  setup() {
    const toast = useToast();
    const menu = ref(null);
    const load = ref(null);
    const value = ref();
    const items = ref([
      {
        label: 'Voces',
        items: [{
          label: 'Update',
          icon: 'pi pi-refresh',
          command: () => {
            toast.add({severity:'success', summary:'Updated', detail:'Data Updated', life: 3000});
          }
        },
        {
          label: 'Delete',
          icon: 'pi pi-times',
          command: () => {
            toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000});
          }
        }]
      }
    ]);

    const toggle = (event) => {
      menu.value.toggle(event);
    };

    return {
      menu, load, value, items,

      toggle
    }
  },
})
</script>
