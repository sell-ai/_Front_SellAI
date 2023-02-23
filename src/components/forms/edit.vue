<template>
  <Toast />
  <div v-if="!loading" class="w-full p-4 bg-white rounded-lg border border-gray-200 shadow-md">
    <form class="w-full grid grid-cols-2 gap-4">
      <div v-for="field in fields" :key="field.id" class="-mx-3 mb-6" :class="field.class">
        <div class="w-full px-3">
          <div v-if="field.type !== 'object'" class="grid grid-cols-6 gap-4">
            <Schema :field="field" :data="data.info" />
          </div>
          <div class="grid grid-cols-6 gap-4 m-4" v-else>
            <div class="p-6 rounded-lg shadow-lg bg-white col-span-6">
              <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">{{field.label}}</h5>
              <div class="grid grid-cols-6 gap-2">
                <template v-for="fd in field.fields" :key="fd">
                  <Schema :field="fd" :data="data.info[field.name]" />
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <Divider />
      </div>
      <div class="flex justify-center mb-2 col-span-2">
        <Button label="Grabar" class="p-button-rounded p-button-lg" icon="pi pi-save" @click="Save" :loading="loading" />
      </div>
    </form>
  </div>

  <div v-else>
    <div class="flex justify-center ...">
      <div>
        <ProgressSpinner aria-label="Basic ProgressSpinner" />
      </div>
    </div>
    <Skeleton class="mb-2" borderRadius="16px"></Skeleton>
    <Skeleton height="4rem" class="mb-2" borderRadius="16px"></Skeleton>
    <div class="flex">
      <Skeleton width="20rem" class="mb-2" borderRadius="16px"></Skeleton>
      <Skeleton width="5rem"></Skeleton>
    </div>
    <Skeleton width="5rem" class="mb-2"></Skeleton>
  </div>

</template>

<script>
  import { ref, reactive, onMounted } from 'vue';
  import { object, string } from "yup";
  import { useAlertStore } from '@/store'
  import moment from 'moment';
  
  import Toast from 'primevue/toast';
  import { useToast } from "primevue/usetoast";
  import Divider from 'primevue/divider';
  import ProgressSpinner from 'primevue/progressspinner';
  import Skeleton from 'primevue/skeleton';
  import Button from 'primevue/button';
  import Schema from './schema.vue'
  
  export default {
    props: {
      info: Object,
      title: String,
      fieldsEd: Array,
      WService: Function,
      nameMethod: String
    },
    emits: ['closeModal'],
    components: {
      Toast, Skeleton, Schema, ProgressSpinner,
      Button, Divider,
    },
    setup(props, { emit }) {
      onMounted(() => {
        
        //verifico si es nuevo o editar
        if (props.info.id) { 
          //Verifico los de fecha.
          moment.locale('es');
          const fieldsDates = props.fieldsEd.filter(f => f.type === 'date');
          data.info = props.info;
          //Busco los campos que son fecha para poder editar con formato correcto.
          for (const property in data.info) {
            const date = data.info[property];
            const siDate = fieldsDates.find(f => f.name === property);
            if (siDate !== undefined) {
              data.info[property] = new Date(date);
            }
          }
          newReg.value = false;
        }
        //Inicializo datos
        initSchema();
        loading.value = false;
      })
      const alertStore = useAlertStore();
      const toast = useToast();
      const newReg = ref(true); //si es editar o nuevo
      const wsProp = new props.WService();
      const fields = ref(props.fieldsEd); //Campos para editar
      const loading = ref(true); //indica si esta en proceso de carga.
      const errors = ref([]); //muestra errores.
      const data = reactive({
        info: {
          id: '',
        }
      }); //información del registro
      
      const initSchema = () => {
        props.fieldsEd.forEach(obj => {
          if (data.info[obj.name] === undefined || data.info[obj.name] === null) {
            if (obj.type === 'object') {
              data.info[obj.name] = {};
              for (let ko of Object.keys(obj.fields)) {
                let nom = obj.fields[ko].name;
                let typ = obj.fields[ko].type;
                data.info[obj.name][nom] = schemaWhite(typ);
              }
            }
            else {
              data.info[obj.name] = schemaWhite(obj.type);
            }
          }
        });
      };

      const schemaWhite = (dataSchema) => {
        let result;
        switch (dataSchema) {
          case "date":
            result = null;
            break;
          case "bool":
            result = true;
            break; 
          case "listedit":
          case "chips":
          case "select":
            result = [];
            break;
          case "object":
            result = {};
            break;
          case "text":
          case "area":
          default:
            result = "";
            break;
        }
        return result;
      };
      
      const validateSchema = object().shape({
        nombre: string().required("El campo nombre debe completarse"),
      }); //que campos se validan.

      const validate = (field) => {
        validateSchema.validateAt(field, data.info).then(() => {
            errors.value[field] = "";
          }).catch(err => {
            errors.value[field] = err.message;
          });
      }; //valida campo x campo

      const Save = () => {
        loading.value = true;
        validateSchema.validate(data.info, { abortEarly: false }).then(() => {
          const toSave = JSON.stringify(data.info);
          wsProp.postMethod(props.nameMethod, toSave, data.info.id).then((res) => {
            loading.value = false;
            closeModal(res);
          }).catch(error => {
            loading.value = false;
            alertStore.clear();
            alertStore.exception(error);
            alertStore.alert.forEach(er => {
              toast.add({
                severity: er.type, 
                summary: 'Ocurrio un inconveniente', 
                detail: er.message, 
                life: 5000
              });
            })
          });
        }).catch(err => {
          toast.add({severity:'warn', summary: 'Atención!', detail:'Verifique los campos para poder grabar', life: 3000});
          loading.value = false;
          err.inner.forEach(error => {
            errors.value[error.path] = error.message;
          });
        });
      };

      const closeModal = (newVal) => {
          //llama al metodo del padre, con 3 parametros.
          //parm 1: que cierre el modal.
          //parm 2: indica si es nuevo o editar el registro.
          //parm 3: envía el valor del registro con nuevo id.
          emit("closeModal", false, newReg.value, newVal)
      }

      return {
        fields, loading, errors, data, alertStore,

        validateSchema, validate, Save, closeModal,
      };
    },
  }
</script>