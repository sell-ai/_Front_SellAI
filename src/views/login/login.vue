<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-14 w-auto" :src="imageSource" alt="Workflow" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Ingrese con su cuenta</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          O {{ ' ' }} <a href="#" class="font-medium text-sky-700 hover:text-cyan-500"> comience su prueba gratuita de 14 días </a>
        </p>
      </div>
      <form class="flex flex-col" @submit.prevent="handleLogin(!v$.$invalid)">
        <div class="shadow rounded p-4">
          <div class="flex flex-col">
            <label for="username1" :class="{'p-error': v$.userName.invalid && storeSetting.submitted}">E-mail</label>
            <div class="p-float-label p-input-icon-right">
              <i class="pi pi-envelope" />
              <InputText v-model="v$.userName.$model" id="username1" type="username" 
                class="w-full" :class="{'p-error': v$.userName.invalid && storeSetting.submitted}" 
                aria-describedby="username1-help" />
            </div>
            <small v-if="(v$.userName.$invalid && storeSetting.submitted) || v$.userName.$pending.$response" class="p-error">{{v$.userName.required.$message.replace('Value', 'Name')}}</small>
            <small v-else class="text-zinc-400" id="username1-help">Puede ingresar e-mail o usuario.</small>
          </div>
          <div class="block mt-2">
            <label class="block" :class="{'p-error':v$.password.$invalid && storeSetting.submitted}" for="password1">Contraseña</label>
            <Password v-model="v$.password.$model" inputId="password1" toggleMask
              class="w-full" :class="{'p-invalid':v$.password.$invalid && storeSetting.submitted}">
            </Password>
            <small v-if="(v$.password.$invalid && storeSetting.submitted) || v$.password.$pending.$response" class="p-error block">{{v$.password.required.$message.replace('Value', 'Password')}}</small>
          </div>
        </div>

        <div class="p-4 flex items-center justify-between">
          <div class="text-sm">
            <a href="#" class="font-medium text-sky-700 hover:text-cyan-500"> ¿Recuperar contraseña? </a>
          </div>
        </div>

        <div class="flex flex-col">
          <Button class="w-full" type="submit" label="Ingresar" icon="pi pi-lock" iconPos="left" :loading="storeSetting.loading"/>
          <div>
            <transition-group name="p-message" tag="div">
              <Message v-for="msg of storeAlert.alert" :life="5000" :severity="msg.type" :key="msg.id">{{msg.message}}</Message>
            </transition-group>
          </div>
        </div>
      </form>
      <footer class="h-10 p-4">
        <div class="flex justify-around">
          <Button label="Ayuda" class="p-button-sm p-button-secondary p-button-text" @click="showModal('Ayuda');" />
          <Button label="Privacidad" class="p-button-sm p-button-secondary p-button-text" @click="showModal('Privacidad');" />
          <Button label="Términos" class="p-button-sm p-button-secondary p-button-text" @click="showModal('Terminos');" />
        </div>
      </footer>
    </div>
  </div>
  <Dialog header="Header" v-model:visible="displayModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}">
    <component v-bind:is="component" />
    <template #footer>
        <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
        <Button label="Yes" icon="pi pi-check" @click="closeModal" autofocus />
    </template>
  </Dialog>

</template>

<script>
import { ref, reactive } from 'vue';

import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Message from 'primevue/message';

import { useAuthStore, useSettingStore, useAlertStore } from '@/store'
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import Ayuda from './components/ayuda.vue';
import Privacidad from './components/privacidad';
import Terminos from './components/terminos.vue';

export default {
  components: {
    InputText, Password, Button, Dialog, Message,
    Ayuda, Privacidad, Terminos
  },
  setup() {
    const storeAuth = useAuthStore();
    const storeSetting = useSettingStore();
    const storeAlert = useAlertStore();

    const state = reactive({
      userName: '',
      password: ''
    });

    const rules = {
      userName: { required },
      password: { required }
    }
    
    const displayModal = ref(false);
    const component = ref('Ayuda');
    const imageSource = require(`@/assets/logo.png`);

    const v$ = useVuelidate(rules, state);

    const showModal = (name) => {
      component.value = name;
      displayModal.value = true;
    }

    const closeModal = () => {
      displayModal.value = false;
    };

    const handleLogin = async (isFormValid) => {
      storeSetting.submitted = true;

      if (!isFormValid) {
        return;
      }
      storeSetting.loading = true;
      var data = JSON.stringify({
        "user": state.userName,
        "password": state.password
      });

      await storeAuth.login(data);      
    }

    return {
      state, v$, displayModal, storeSetting,
      component, imageSource, storeAlert,
      
      showModal, closeModal, handleLogin,
    }
  }
}
</script>