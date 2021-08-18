<template>
  <div>
    <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Crear Vista
            </h3>
            <p class="mt-1 text-sm text-gray-600">
              Crear nueva vista asignando nombre y la colección (nueva o existente) para guardar los dato.
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form @submit="save" novalidate>
            <div class="shadow overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <Txt v-model="data.name" :ref="el => { if (el) refs[0] = el }"
                      :Label="'Nombre Vista'" :rules="data.reglas.name"></Txt>
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <Txt v-model="data.collection_name" :ref="el => { if (el) refs[1] = el }"
                      :Label="'Nombre Colección'" :rules="data.reglas.collection_name"></Txt>
                  </div>

                  <div class="col-span-6 sm:col-span-4">
                    <TxtArea v-model="data.description" :placeHolder="'Descripción'" :Label="'Observaciones'">
                    </TxtArea>
                </div>
                </div>
              </div>
              <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <Btn :type="'submit'" :Label="'Grabar'"></Btn>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>

    <Modal :ref="el => { if (el) refs[2] = el }"></Modal>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
    </svg>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import * as yup from 'yup';
import axios from 'axios';
import Txt from '../../components/textbox/txt.vue';
import TxtArea from '../../components/textbox/textarea.vue';
import Btn from '../../components/button/btn.vue';
import Modal from '../../components/modal/modal.vue';

export default {
  components: {
    Txt,
    TxtArea,
    Btn,
    Modal,
  },
  props: {
    url: String,
  },
  setup() {
    const data = reactive({
      name: '',
      collection_name: '',
      description: '',
      reglas: {
        name: yup.string().required(),
        collection_name: yup.string().required().min(2),
      },
    });

    const refs = ref([null, null, null]);

    function save(e) {
      e.preventDefault();
      const valido = refs.value.every((element) => {
        if (element && typeof element.validate === 'function') {
          element.validate();
          if (!element.valid) {
            return false;
          }
        }
        return true;
      });
      if (valido) {
        const d = {
          name: data.name,
          collection_name: data.collection_name,
          description: data.description,
        };
        axios.post('sysview/add', d)
          .then((res) => {
            if (res.status === 200) {
              refs.value[2].mostrar('Atención', 'Se grabo correctamente!');
            }
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        refs.value[2].mostrar('Error', 'Faltan datos para completar');
      }
    }

    return {
      data,
      refs,

      save,
    };
  },
};
</script>
