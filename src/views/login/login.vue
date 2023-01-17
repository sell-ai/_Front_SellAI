<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-14 w-auto" :src="ImgSrc" alt="Workflow" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Ingrese con su cuenta</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          O {{ ' ' }} <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> comience su prueba gratuita de 14 días </a>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="block text-sm font-medium">E-mail/Usuario</label>
            <input v-model="userOrEmail" id="email-address" name="email" type="email" autocomplete="email" required="" class="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email/Usuario" />
          </div>
          <div class="mt-1 relative rounded-md shadow-sm">
            <label for="password" class="block text-sm font-medium">Contraseña</label>
            <input v-model="password" id="password" name="password" :type="passType" autocomplete="current-password" required="" class="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
            <div class="absolute inset-y-11 right-10 flex items-center">
              <button type="button">
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <EyeOffIcon v-if="showPass" class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" @click="showPassMethod(false)" />
                  <EyeIcon v-else class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" @click="showPassMethod(true)" />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Recordarme </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> ¿Recuperar contraseña? </a>
          </div>
        </div>

        <div>
          <button type="submit" :class="{ 'cursor-not-allowed': loading }" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" :disabled="loading">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon v-if="!loading" class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              <div v-else>
                <svg role="status" class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
              </div>
            </span>
            Ingresar
          </button>
          <p v-for="det in Errors" :key="det" class="mt-2 text-sm text-red-500">
            {{ det }}
          </p>
        </div>
      </form>

      <footer class="h-10 p-4">
        <div class="flex justify-around">
          <button class="text-xs font-medium text-gray-400 hover:text-indigo-700" @click="showModal('Ayuda');">Ayuda</button>
          <button class="text-xs font-medium text-gray-400 hover:text-indigo-700" @click="showModal('Privacidad');">Privacidad</button>
          <button class="text-xs font-medium text-gray-400 hover:text-indigo-700" @click="showModal('Terminos');">Términos</button>
        </div>
      </footer>

      <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="open = false">
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
              <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start static">
                    <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900"> Términos y Condiciones </DialogTitle>
                      <div class="mt-2">
                        <component v-bind:is="component" />
                      </div>
                    </div>
                    <div class="absolute top-0 right-0">
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" @click="open = false">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                        </button>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="open = false">Aceptar</button>
                </div>
              </div>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>

    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { ExclamationIcon } from '@heroicons/vue/outline';
import { LockClosedIcon, EyeIcon, EyeOffIcon } from '@heroicons/vue/solid'
import Cookies from 'js-cookie'
import axios from 'axios'
import Ayuda from './components/ayuda.vue';
import Privacidad from './components/privacidad';
import Terminos from './components/terminos.vue';

export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    LockClosedIcon, EyeIcon, EyeOffIcon, ExclamationIcon,
    Ayuda, Privacidad, Terminos
  },
  setup() {
    const router = useRouter();
    const userOrEmail = ref('');
    const password = ref('');
    const showPass = ref(false);
    const passType = ref('password');
    const open = ref(false);
    const loading = ref(false);
    const component = ref('Ayuda');
    const Errors = ref([]);
    const count = ref(0);
    const ImgSrc = require(`@/assets/logo.png`);

    const showPassMethod = (show) => {
      showPass.value = show;
      passType.value = show ? "input" : "password";
    };

    const showModal = (name) => {
      component.value = name;
      open.value = true;
    }

    function login () {
      loading.value = true;
      var data = JSON.stringify({
        "User": userOrEmail.value,
        "Password": password.value
      });

      var config = {
        method: 'post',
        url: 'user',
        headers: { 'Content-Type': 'application/json' },
        data : data
      };

      axios(config).then(function (response) {
        console.log(JSON.stringify(response.data));
        Cookies.set('uuid', userOrEmail.value);
        Cookies.set('user', response.data.user);
        Cookies.set('token', response.data.token, { expires: 1 });
        Cookies.set('deposit', response.data.deposit);
        router.push({ name: 'Home' });
      })
      .catch(error => {
        Errors.value = [];
        loading.value = false;

        if (error.response && error.response.data) {
          if (error.response.data.Error) {
            error.response.data.Error.forEach(e => {
              Errors.value.push({
                content: e, id: count.value++
              });
            });
          }
          else
          {
            Errors.value.push({
              content: error.response.toJSON(), id: count.value++
            });
          }
        } else if (error.request) {
          console.log("Error Request", error.request);
          if (error.message && error.message == "Network Error") {
            Errors.value.push({
              content: "Sin conexión con el servidor", id: count.value++
            });
          }
          else {
            Errors.value.push({
              content: error.request, id: count.value++
            });
          }
        } else if (error.message) {
          Errors.value.push({ content: error.message, id: count.value++ });
        }
        else {
          Errors.value.push({ content: error.toJSON(), id: count.value++ });
        }
      });
    }

    return {
      userOrEmail,
      password,
      showPass,
      passType,
      open,
      loading,
      component,
      Errors,
      ImgSrc,

      showPassMethod,
      login,
      showModal
    }
  }
}
</script>