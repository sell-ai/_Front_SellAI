import { defineStore } from 'pinia';
//import { useRouter } from 'vue-router';
import { default as router } from '@/router';
import { useAlertStore, useSettingStore } from '@/store';

import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
      userName: localStorage.getItem('userName'),
      displayName: localStorage.getItem('displayName'),
      token: localStorage.getItem('token'),
      deposit: localStorage.getItem('deposit'),
      menu: localStorage.getItem('menu'),
      returnUrl: null
  }),
  actions: {
    async login(data) {
      var objThis = this;
      const settingStore = useSettingStore();
      settingStore.loading = true;
      var config = {
        method: 'post', 
        url: 'authentication/login', 
        headers: { 
          'Content-Type': 'application/json' 
        },
        data : data
      };

      axios(config).then(function (response) {
        const alertStore = useAlertStore();
        alertStore.clear();
        if (response.data !== undefined && response.data.signIn !== undefined
            && response.data.signIn.token !== null) {
          let resp = response.data.signIn;
          objThis.userName = resp.userName;
          objThis.displayName = resp.displayName;
          objThis.token = resp.token;
          objThis.deposit = resp.deposit;
          objThis.menu = resp.menuJson;

          localStorage.setItem('userName', resp.userName);
          localStorage.setItem('displayName', resp.displayName);
          localStorage.setItem('token', resp.token);
          localStorage.setItem('deposit', resp.deposit);
          localStorage.setItem('menu', resp.menuJson);
          
          router.push(objThis.returnUrl || '/home');
          settingStore.loading = settingStore.submitted = false;
        }
        else {
          settingStore.loading = settingStore.submitted = false;
          alertStore.error('El Usuario o contraseña son incorrectos.')
        }
      })
      .catch(error => {
        const alertStore = useAlertStore();
        if (alertStore.count > 10)
          alertStore.clear(true);
        settingStore.loading = settingStore.submitted = false;
        alertStore.exception(error);
      });
    },

    logout() {
      this.userName = null;
      this.displayName = null;
      this.token = null;
      this.deposit = null;
      this.menu = null;
      localStorage.removeItem('userName');
      localStorage.removeItem('displayName');
      localStorage.removeItem('token');
      localStorage.removeItem('deposit');
      localStorage.removeItem('menu');
      router.push('/users/login');
    }
  }
})