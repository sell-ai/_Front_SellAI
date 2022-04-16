<template>
  <Toast />
  <div v-if="loading">
    <h5>Cargando...</h5>
    <Skeleton class="mb-2"></Skeleton>
    <Skeleton width="10rem" class="mb-2"></Skeleton>
    <Skeleton width="5rem" class="mb-2"></Skeleton>
    <Skeleton height="2rem" class="mb-2"></Skeleton>
    <Skeleton width="10rem" height="4rem"></Skeleton>
  </div>
  <div v-else class="p-4 bg-white rounded-lg border border-gray-200 shadow-md">
    <form class="w-full max-w-lg">
      <div v-for="field in fields" :key="field.id" class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" :for="field.name">
            {{ field.label }} <span v-if="field.required" class="text-xs text-red-500">*</span>
          </label>
          <InputText v-if="field.type === 'text' && field.focus" :name="field.name" type="text" v-model="data.info[field.name]" class="block mt-1 w-full" v-focus />
          <InputText v-else-if="field.type === 'text'" :name="field.name" type="text" v-model="data.info[field.name]" class="block mt-1 w-full" v-focus />
          <Textarea v-else-if="field.type === 'area'" :name="field.name" v-model="data.info[field.name]" rows="5" cols="30" class="block mt-1 w-full" />
          <InputSwitch v-else-if="field.type === 'bool'" :name="field.name" v-model="data.info[field.name]" class="block mt-1" />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full px-3">
          <button @click="Save" type="button" :disabled="loading"
            class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
            <svg v-show="loading" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
            <i class="pi pi-save" /> Grabar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { ref, reactive, onMounted } from 'vue';
  import { object, string } from "yup";

  import InputText from 'primevue/inputtext';
  import Textarea from 'primevue/textarea';
  import InputSwitch from 'primevue/inputswitch';
  import Toast from 'primevue/toast';
  import { useToast } from "primevue/usetoast";
  import Skeleton from 'primevue/skeleton';

  export default {
    props: {
      info: Object,
      title: String,
      fieldsEd: Array,
      WService: Function,
      postMethod: String
    },
    emits: ['closeModal'],
    components: {
      InputText,
      Textarea,
      InputSwitch,
      Toast,
      Skeleton,
    },
    setup(props, { emit }) {
      onMounted(() => {
        //verifico si es nuevo o editar
        if (props.info.id) { 
          data.info = props.info;
          newReg.value = false;
        }
        loading.value = false;
      })
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
      props.fieldsEd.forEach(obj => {
        switch (obj.type) {
          case "text":
          case "area":
            data.info[obj.name] = "";
            break;
          case "bool":
            data.info[obj.name] = true;
            break;
          default:
            data.info[obj.name] = "";
            break;
        }
      });
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
          wsProp[props.postMethod](toSave, data.info.id).then((res) => {
            loading.value = false;
            closeModal(res.value);
          }).catch(error => {
            loading.value = false;
            if (error.response) {
              console.log("Error Response", error.response.data);
              for(const [value] of Object.entries(error.response.data.errors)){
                console.log(error.response.data.errors[value][0]);
              }
            } else if (error.request) {
              console.log("Error Request", error.request);
              console.log("Error Message", error.request.message);
            } else {
              console.log(error.toJSON());
            }
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
        fields, loading, errors, data, 

        validateSchema, validate, Save, closeModal,
      };
    },
    directives: {
      // enables v-focus in template
      focus: {
        mounted: (el) => {
          if (el.getElementsByTagName('INPUT').length > 0) {
            el.getElementsByTagName('INPUT')[0].focus();
          }
          else {
            el.focus();
          }
        }
      }
    }
  }
</script>