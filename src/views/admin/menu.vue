<script setup>
  import { ref, onMounted } from 'vue'
  import WService from '@/plugins/ws';
  import BlockUI from 'primevue/blockui';
  import Toolbar from 'primevue/toolbar';
  import Button from 'primevue/button';
  import Skeleton from 'primevue/skeleton';
  import Dropdown from 'primevue/dropdown';
  import ToggleButton from 'primevue/togglebutton';
  import InputText from 'primevue/inputtext';
  import InputSwitch from 'primevue/inputswitch';
  import Editor from 'primevue/editor';
  import Panel from 'primevue/panel';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import { FilterMatchMode } from 'primevue/api';
  
  const wService = new WService();
  const defaultRow = {
    alias: '', 
    name: '',
    previousRoleId: '',
    roleId: '',
    role: '', 
    required: false,
    message: '',
    value: '',
    search: {
      aggrega: '',
      extra: null,
      cond: null
    }
  };
  const loading = ref(false);
  const loadGrid = ref(false);
  const blocked = ref(true);
  const intent = ref(null);
  const intents = ref([]);
  const checkedPDF = ref(false);
  const actions = ref([
    { name: 'Crear', id: 'create'},
    { name: 'Editar', id: 'update'},
    { name: 'Visualizar', id: 'read'},
    { name: 'Eliminar', id: 'delete'},
  ]);
  const selectedAction = ref();
  const typeResponse = ref([
    { name: 'Texto', id: 'text'},
    { name: 'Tabla', id: 'table'}
  ]);
  const selectedType = ref();
  const displayIntent = ref(null);
  const nameCollection = ref("");
  const message = ref('');
  const entities = ref([]);
  const entityRoles = ref([]);
  const dt = ref();
  const filterDT = ref({ 'global': { value: null, matchMode: FilterMatchMode.CONTAINS }});
  const detailsEntity = ref([]);
  const selectSearch = ref({
    aggrega: [ { name: 'Filtrar por entidad', code: '$match'}],
    extra: [ { name: 'Con expresión regular', code: '$regex'}],
    cond: [
      { name: 'Ignorar mayus. y minus.', code: 'i'},
      { name: 'Comienza con', code: 'm'},
      { name: 'Termina con', code: '$'},
      { name: 'Ignorar espacios en blanco', code: 'x'},
    ],
  });

  onMounted(() => {
    loading.value = true;
    wService.getMethod('intent').then(response => {
      intents.value = JSON.parse(response.data);
      wService.getMethod('entity').then(response => {
        entities.value = JSON.parse(response.data);
      }).catch(ex => {
        console.log("Error in Request Entities: ", ex);
      });
    }).catch(ex => {
      console.log("Error in Request Intents: ", ex);
    }).finally (() => {
      loading.value = false;
    });
  });

  const onChangeIntent = (ev) => {
    if (intent.value) {
      loading.value = true;
      wService.getMethod('SysMenu/' + intent.value.id).then(response => {
        blocked.value = false;
        if (response !== '') {
          checkedPDF.value = response.pdf || false;
          displayIntent.value = response.display;
          nameCollection.value = response.collection;
          message.value = response.mensaje;
          const actionObj = actions.value.find(a => a.id === response.accion);
          selectedAction.value = actionObj;

          const typeObj = typeResponse.value.find(t => t.id === response.tipo);
          selectedType.value = typeObj;

          console.log("Entities formados: ", response.entities);
          //detailsEntity.value = response.entities;
        }
      }).finally( () => {
        loading.value = false;
      });
    }
  };

  const onChangeEntity = (ev, index) => {
    const rowEdit = detailsEntity.value[index];
    if (ev.value.id !== rowEdit.previousRoleId) {
      rowEdit.previousRoleId = ev.value.id;
      loadGrid.value = true;
      rowEdit.role = '';
      wService.getMethod('entity/' + ev.value.name).then(response => {
        const data = JSON.parse(response.data);
        entityRoles.value = data.roles;
        loadGrid.value = false;
      }).catch(ex => {
        console.log("Error in Request Intents: ", ex);
        loadGrid.value = false;
      });
    }
  }

  const editEntities = (ev) => {
    let { data, newValue, field } = ev;
    data[field] = newValue;
  }

  const newEntity = () => {
    let copy = JSON.parse(JSON.stringify(defaultRow));
    detailsEntity.value.push(copy);
  }

  const saveIntent = () => {
    blocked.value = loadGrid.value = loading.value = true;
    // Recorrer el arreglo de objeto y devolver otro arreglo diferente de datos
    // con los campos que se van a guardar en la base de datos
    let objData = [];
    detailsEntity.value.forEach((item)=>{
       if(!item['id']) {
           item['id'] = '';
           item['search'] = JSON.stringify(item['search']);
       }
      objData.push({...item});
    })

    const dataSave = JSON.stringify({
      id: '',
      intentID: intent.value.id,
      nombre: intent.value.name,
      display: displayIntent.value,
      accion: selectedAction.value.id,
      collection: nameCollection.value,
      entities: objData,
      pdf: checkedPDF.value,
      roles: null,
      mensaje: message.value,
      tipo: selectedType.value.id
    })
    wService.postMethod('sysMenu', dataSave, "").then(res => {
      console.log('Grabar...', res);
    }).catch(ex => {
      console.log("Error Save Intent Menu: ", ex);
    }).finally (() => {
      blocked.value = loadGrid.value = loading.value = false;
    });
  }
</script>
<template>
  <div class="relative">
    
    <div class="mb-4">
      <label class="block text-sm font-medium leading-6 text-gray-900" for="intentos">Intención:</label>
      <Dropdown inputId="intentos" v-model="intent" :options="intents" v-on:change="onChangeIntent($event)"
        filter optionLabel="name" :loading="loading" placeholder="Seleccione Intención" class="w-full md:w-14rem">
        <template #value="slotProps">
          <div v-if="slotProps.value" class="flex align-items-center">
            <div>{{ slotProps.value.name }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <div class="flex align-items-center">
            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>
      </Dropdown>
    </div>
    <BlockUI :blocked="blocked">
      <div class="grid grid-cols-4 gap-4">
        <div class="col-span-4 sm:col-span-2">
          <label class="block text-sm font-medium leading-6 text-gray-900" for="tbPdf">Ver PDF:</label>
          <ToggleButton inputId="tbPdf" v-model="checkedPDF" class="w-full" onLabel="Si" offLabel="No" />
        </div>
        <div class="col-span-4 sm:col-span-2">
          <label class="block text-sm font-medium leading-6 text-gray-900" for="dpActions">Acción:</label>
          <Dropdown inputId="dpActions" v-model="selectedAction" :options="actions" showClear optionLabel="name" placeholder="Seleccione acción" class="w-full" />
        </div>
        <div class="col-span-4 sm:col-span-2">
          <label class="block text-sm font-medium leading-6 text-gray-900" for="txtNombre">Nombre:</label>
          <InputText type="text" v-model="displayIntent" class="w-full" />
        </div>
        <div class="col-span-4 sm:col-span-2">
          <label class="block text-sm font-medium leading-6 text-gray-900" for="dpTypeResponse">Tipo de Respuesta:</label>
          <Dropdown inputId="dpTypeResponse" v-model="selectedType" :options="typeResponse" showClear optionLabel="name" placeholder="Seleccione tipo de respuesta" class="w-full" />
        </div>
        <div class="col-span-4 sm:col-span-2">
          <label class="block text-sm font-medium leading-6 text-gray-900">Nombre de intención relación:</label>
          <InputText type="text" v-model="nameCollection" class="w-full" />
        </div>
        <div class="col-span-4">
          <label class="block text-sm font-medium leading-6 text-gray-900" for="txtMessage">Mensaje de respuesta:</label>
          <Editor v-model="message" class="w-full h-16" />
        </div>

        <div class="col-span-4 mt-12">
          <!--          --------          -->
          <!--          ENTITIES          -->
          <!--          --------          -->
          <Panel header="Identificador de datos" :toggleable="true" class="w-full mt-2">
            <DataTable ref="dt" :value="detailsEntity" dataKey="id" :filters="filterDT" editMode="cell" showGridlines 
              responsiveLayout="stack" @cell-edit-complete="editEntities">
              <template #header>
                <div class="table-header grid grid-cols-6 gap-1">
                  <div class="col-span-6 sm:col-span-3">
                    <Button label="Nuevo" icon="pi pi-plus" severity="success" class="mr-2" @click="newEntity" :loading="loadGrid" />
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <span class="p-input-icon-left w-full">
                      <i class="pi pi-search" />
                      <InputText v-model="filterDT['global'].value" placeholder="Buscar..." class="w-full" />
                    </span>
                  </div>
                </div>
              </template>
              <Column header="Nombre" field="alias" :sortable="true" style="min-width:6rem">
                <template #body="slotProps">
                  <Skeleton v-if="loadGrid"></Skeleton>
                  <span v-else>{{ slotProps.data.alias }}</span>
                </template>
                <template #editor="{ data, field }">
                  <InputText type="text" v-model="data[field]" class="w-full" />
                </template>
              </Column>
              <Column header="Entidad" field="name" :sortable="true" style="min-width:6rem">
                <template #body="slotProps">
                  <Skeleton v-if="loadGrid"></Skeleton>
                  <span v-else>{{ slotProps.data.name.name }}</span>
                </template>
                <template #editor="{ data, field, index }">
                  <Dropdown v-model="data[field]" v-on:change="onChangeEntity($event, index)" :options="entities" optionLabel="name" placeholder="Seleccione Entidad" class="w-full" />
                </template>
              </Column>
              <Column header="Rol de Entidad" field="role" :sortable="true" style="min-width:6rem">
                <template #body="slotProps">
                  <Skeleton v-if="loadGrid"></Skeleton>
                  <span v-else>{{ slotProps.data.role.name }}</span>
                </template>
                <template #editor="{ data, field }">
                  <Dropdown v-model="data[field]" :options="entityRoles" optionLabel="name" placeholder="Seleccione Rol" class="w-full" />
                </template>
              </Column>
              <Column header="Obligatorio" field="required" :sortable="true" style="min-width:6rem">
                <template #body="slotProps">
                  <Skeleton v-if="loadGrid"></Skeleton>
                  <span v-else-if="slotProps.data.required">Es obligatorio</span>
                  <span v-else></span>
                </template>
                <template #editor="{ data, field }">
                  <div class="flex items-center">
                    <InputSwitch v-model="data[field]" />
                  </div>
                </template>
              </Column>
              <Column header="Valor Defecto" field="value" style="min-width:6rem">
                <template #body="slotProps">
                  <Skeleton v-if="loadGrid"></Skeleton>
                  <span v-else>{{ slotProps.data.value }}</span>
                </template>
                <template #editor="{ data, field }">
                  <InputText v-if="!data.required" type="text" v-model="data[field]" class="w-full" />
                </template>
              </Column>
              <Column header="Mensaje" field="message">
                <template #body="slotProps">
                  <Skeleton v-if="loadGrid"></Skeleton>
                  <span v-else>{{ slotProps.data.message }}</span>
                </template>
                <template #editor="{ data, field }">
                  <InputText type="text" v-model="data[field]" class="w-full" />
                </template>
              </Column>
              <Column header="Buscar (solo para acción 'visualizar')" field="search">
                <template #body="slotProps">
                  <Skeleton v-if="loadGrid"></Skeleton>
                  <span v-else>{{ slotProps.data.search }}</span>
                </template>
                <template #editor="{ data, field }">
                  <div class="flex sm:flex-wrap">
                    <Dropdown showClear v-model="data[field].aggrega" :options="selectSearch.aggrega" optionLabel="name" optionValue="code" :placeholder="'Filtrar por ' + data['alias']" class="shrink w-full" />
                    <Dropdown showClear v-model="data[field].extra" :options="selectSearch.extra" optionLabel="name" optionValue="code" placeholder="Para filtrar tener en cuenta" class="w-full shrink" />
                    <Dropdown showClear v-model="data[field].cond" :options="selectSearch.cond" optionLabel="name" optionValue="code" placeholder="Opciones" class="w-full shrink" />
                  </div>
                </template>
              </Column>
            </DataTable>
          </Panel>
        </div>

      </div>
    </BlockUI>
      

    <div class="sticky bottom-0 mt-4">
      <Toolbar>
        <template #center>          
          <Button label="Grabar" icon="pi pi-save" rounded @click="saveIntent" :disabled="blocked" :loading="loading" />
        </template>
      </Toolbar>
    </div>
  </div>
  
</template>