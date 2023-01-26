<template>
  <div class="flex h-screen antialiased text-gray-900 bg-gray-100">
    
    <!-- Header: Titulo. -->
    <header class="z-50 fixed flex items-center justify-between top-0 px-9 h-12 border-b w-screen bg-white overflow-y-auto">
      <img
        :src="logo"
        alt="SELLAI"
        class="inline-flex items-center justify-center mr-2 text-white transition-all duration-200 ease-in-out w-28 h-9 text-sm rounded-circle"
      />
      <div class="md:hidden">
        <Button icon="pi pi-bars" class="p-button-secondary p-button-text" @click="openSideBarMobile" />
      </div>
      <nav aria-label="Secondary" class="hidden space-x-2 md:flex md:items-center">
        <div class="ml-4 flex items-center md:ml-6">
          <!-- Profile -->
          <Button @click="openMenuUser" icon="pi pi-user" class="p-button-sm p-button-rounded p-button-text" aria-haspopup="true" aria-controls="overlay_panel" />
          <OverlayPanel ref="overPanel" appendTo="body" :showCloseIcon="false" id="overlay_panel" class="w-64 flex flex-row items-center justify-center">
            <Profiler :name="userDisplayName"></Profiler>
            <Menu :model="itemsMenu" class="block w-full rounded-lg" />
          </OverlayPanel>
        </div>
      </nav>
    </header>
    
    <!-- Sidebar: HIDDEN in mobile. -->
    <aside style="height: calc(100vh - 3rem);" class="sticky w-64 top-12 mt-12 bg-white border-r hidden md:block">
      <div class="flex flex-col h-full divide-y divide-blue-200">
        <!-- Sidebar links -->
        <nav aria-label="Main" class="flex-1 px-2 py-4 space-y-2 overflow-y-hidden hover:overflow-y-auto">
          <template v-for="nav in navigation" :key="nav">
            <Disclosure as="div" class="mt-2" v-slot="{open}">
              <DisclosureButton
                class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-indigo-900 rounded-lg hover:bg-indigo-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75"
                :class="{ 'bg-indigo-100': nav.isActive || open }">
                <span aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="nav.d" />
                  </svg>
                </span>
                <span class="ml-2 text-sm">{{ nav.label }}</span>
                <ChevronUpIcon :class="open ? '' : 'transform rotate-180'" class="w-5 h-5 text-indigo-500" />
              </DisclosureButton>
              <DisclosurePanel class="mt-2 space-y-2 px-7" :aria-label="nav.label">
                <PanelMenu :model="nav.items" class="block w-full">
                </PanelMenu>
              </DisclosurePanel>
            </Disclosure>
          </template>
        </nav>

        <footer>
          <span>SellAI &copy; 2023</span>
        </footer>
      </div>
    </aside>

    <!-- Sidebar: SHOW in mobile. -->
    <Sidebar v-model:visible="openMenuMobile" :baseZIndex="10000" position="full" class="overflow-y-auto">
      <Profiler :name="userDisplayName"></Profiler>
      <PanelMenu :model="navMobileMenu" class="block w-full">
      </PanelMenu>
    </Sidebar>

    <main class="relative pr-9 pt-9 mt-12 h-screen-md overflow-x-hidden overflow-y-auto bg-sky-50">
      <router-view/>
    </main>

    <Dialog header="Sin permiso" v-model:visible="displayConfirmation" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>No tiene permiso para acceder o debes loguearte nuevamente</span>
        <div class="flex p-4 mt-4">
          <i class="pi pi-question-circle" style="font-size: 1.5rem"></i>
          <p class="pl-2"><Tag class="mr-2" severity="info" value="Desea loguearte?"></Tag></p>
        </div>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" @click="displayConfirmation = false" class="p-button-text"/>
        <Button label="Si" icon="pi pi-check" @click="logOut" class="p-button-text" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import Profiler from '@/components/extras/profiler';

import OverlayPanel from 'primevue/overlaypanel';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import PanelMenu from 'primevue/panelmenu';
import Sidebar from 'primevue/sidebar';
import Dialog from 'primevue/dialog';
import Tag from 'primevue/tag';
import Chip from 'primevue/chip';
import Avatar from 'primevue/avatar';

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue';

import { ChevronUpIcon } from '@heroicons/vue/solid';
import { MenuIcon, XIcon } from '@heroicons/vue/outline';
import Cookies from 'js-cookie';
import axios from 'axios';

export default {
  components: {
    Button, Menu, PanelMenu, Sidebar, Dialog, Tag, Chip,
    Disclosure, DisclosureButton, DisclosurePanel,
    OverlayPanel, Avatar, ChevronUpIcon, MenuIcon,
    XIcon, Profiler,
  },
  setup() {

    onMounted(() => {     
      let items = Cookies.get("menu");
      items = JSON.parse(items);
      navigation.value = items;
    });

    const logo = require('@/assets/logo.png');
    const userDisplayName = ref(Cookies.get('user'));
    const open = ref(false);
    const overPanel = ref();
    const openMenuMobile = ref(false);
    const displayConfirmation = ref(false);
    const navigation = ref([]);// traer desde las cookies.
    const navMobileMenu = ref([]);
    const itemsMenu = ref([
    {
      label: 'Opciones',
      icon: 'pi pi-wrench',
      items: [
        {
          label: 'Configurar',
          icon: 'pi pi-book',
          command: () => {
          }
        },
      ]
    },
    {
      label: 'Cuenta',
      icon: 'pi pi-user-edit',
      items: [
        { 
          label: 'Opciones', 
          icon: 'pi pi-fw pi-cog',
          to: '/home'
        },
        {
          separator: true
        },
        {
          label: 'Cerrar sesión', 
          icon: 'pi pi-fw pi-power-off', 
          command: () => {
              logOut();
          }
        }
      ]
    }
    ]);

    const router = useRouter();

    const openMenuUser = (event) => {
      overPanel.value.toggle(event);
    };

    const openSideBarMobile = () => {
      navMobileMenu.value = [];
      navigation.value.forEach(nav => {
        navMobileMenu.value.push(nav);
      });
      navMobileMenu.value.push({ separator: true });
      let countID = 0;
      itemsMenu.value.forEach(im => {
        let elem = {
          _id: countID++,
          label: im.label,
          icon: im.icon,
          items: im.items
        };
        navMobileMenu.value.push(elem);
      });
      openMenuMobile.value = !openMenuMobile.value;
    }

    const logOut = () => {
      Cookies.remove('token');
      Cookies.remove('menu');
      Cookies.remove('deposit');
      Cookies.remove('user');
      router.push({ name: 'Login' });
    }

    axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      if (error.response && error.response.status && error.response.status == 401) {
        displayConfirmation.value = true;
      }
      return Promise.reject(error);
    });


    return {
      userDisplayName, overPanel, logo,
      navigation, itemsMenu, open, openMenuMobile, 
      displayConfirmation, navMobileMenu,

      openMenuUser, logOut, openSideBarMobile,
    };
  },
};
</script>