<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Ingrese con su cuenta</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          O
          {{ ' ' }}
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> comience su prueba gratuita de 14 días </a>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="block text-sm font-medium">E-mail/Usuario</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required="" class="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email/Usuario" />
          </div>
          <div class="mt-1 relative rounded-md shadow-sm">
            <label for="password" class="block text-sm font-medium">Contraseña</label>
            <input id="password" name="password" :type="passType" autocomplete="current-password" required="" class="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
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
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            Ingresar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { LockClosedIcon, EyeIcon, EyeOffIcon } from '@heroicons/vue/solid'

export default {
  components: {
    LockClosedIcon, EyeIcon, EyeOffIcon,
  },
  setup() {
    const userOrEmail = ref('');
    const password = ref('');
    const showPass = ref(false);
    const passType = ref('password');

    const showPassMethod = (show) => {
      showPass.value = show;
      passType.value = show ? "input" : "password";
    };

    function login () {
      console.log('login.....');
    }

    return {
      userOrEmail,
      password,
      showPass,
      passType,

      showPassMethod,
      login
    }
  }
}
</script>