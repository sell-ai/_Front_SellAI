<template>
  <div class="flex h-screen antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light">
    <!-- Sidebar -->
    <aside class="flex-shrink-0 w-64 hidden bg-white border-r dark:border-primary-darker dark:bg-darker md:block">
      <div class="flex flex-col h-full">
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
                <span class="ml-2 text-sm">{{ nav.name }}</span>
                <ChevronUpIcon :class="open ? '' : 'transform rotate-180'" class="w-5 h-5 text-indigo-500" />
              </DisclosureButton>
              <DisclosurePanel class="mt-2 space-y-2 px-7" :aria-label="nav.name">
                <PanelMenu :model="nav.items" class="block w-full">
                </PanelMenu>
              </DisclosurePanel>
            </Disclosure>
          </template>
        </nav>
      </div>
    </aside>

    <div class="flex-1 h-full overflow-x-hidden overflow-y-auto">
      <!-- Navbar -->
      <Disclosure as="header" class="relative bg-white dark:bg-darker" v-slot="{ open }">
        <!-- Navbar -->
        <div class="flex items-center justify-between p-2 border-b dark:border-blue-darker">
          <!-- Mobile menu button -->
          <div class="-mr-2 flex md:hidden">
            <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md bg-blue-150 text-blue-300 hover:text-blue-300 hover:bg-blue-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-200 focus:ring-blue">
              <span class="sr-only">Abrir menú principal</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <!-- Brand -->
          <a href="#" class="inline-block text-2xl font-bold tracking-wider uppercase text-cyan-dark dark:text-light">
            SISTEMA GESTION
          </a>

          <!-- Desktop Right buttons -->
          <nav aria-label="Secondary" class="hidden space-x-2 md:flex md:items-center">
            <div class="ml-4 flex items-center md:ml-6">
              <!-- Profile -->
              <Button @click="openMenuUser" icon="pi pi-user" class="p-button-sm p-button-rounded p-button-text" aria-haspopup="true" aria-controls="overlay_menu" />
              <Menu id="overlay_menu" ref="menuUser" :model="itemsMenu" :popup="true" />
            </div>
          </nav>
        </div>
        <!-- Mobile main menu -->
        <DisclosurePanel class="md:hidden bg-gray-50 flex-1 h-full overflow-x-hidden overflow-y-auto">
          <div v-for="nav in navigation" :key="nav" class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Disclosure as="div" class="mt-2" v-slot="{open}">
              <DisclosureButton class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-indigo-500 rounded-lg hover:bg-indigo-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75"
                :class="{ 'bg-indigo-100': nav.isActive || open }">
                <span aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="nav.d" />
                  </svg>
                </span>
                <span class="ml-2 text-sm">{{ nav.name }}</span>
                <ChevronUpIcon :class="open ? '' : 'transform rotate-180'" class="w-5 h-5 text-indigo-500" />
              </DisclosureButton>
              <DisclosurePanel class="mt-2 space-y-2 px-7" :aria-label="nav.name">
                <PanelMenu :model="nav.items" class="block w-full">
                </PanelMenu>
              </DisclosurePanel>
            </Disclosure>
          </div>
          <div class="pt-4 pb-3 border-t border-gray-700">
            <div class="flex items-center px-5">
              <Menu :model="itemsMenu" />
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
      <!-- Main content -->
      <main class="pb-16">
        <!-- Content header -->
        <div class="flex items-center justify-between px-4 py-4 border-b lg:py-6 shadow dark:border-blue-darker">
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                  Inicio
                </a>
              </li>
              <li>
                <div class="flex items-center">
                  <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                  <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">Projects</a>
                </div>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                  <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                  <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Flowbite</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <!-- Content -->
        <div class="mt-2">
          <router-view/>
        </div>
      </main>
      <!-- Main footer -->
      <footer class="absolute p-4 bottom-0 inset-x-0 flex items-center justify-between bg-white border-t dark:bg-darker   dark:border-blue-darker"
      >
        <div>SellAI &copy; 2023</div>
      </footer>
    </div>

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

import Button from 'primevue/button';
import Menu from 'primevue/menu';
import PanelMenu from 'primevue/panelmenu';
import Dialog from 'primevue/dialog';
import Tag from 'primevue/tag';

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
    Button, Menu, PanelMenu, Dialog, Tag,
    Disclosure, DisclosureButton, DisclosurePanel,
    ChevronUpIcon, MenuIcon, XIcon,
  },
  setup() {

    onMounted(() => {     
      let items = Cookies.get("menu");
      items = JSON.parse(items);
      navigation.value = items;
    });

    const open = ref(false);
    const menuUser = ref();
    const displayConfirmation = ref(false);
    const navigation = ref([]);// traer desde las cookies.
    const itemsMenu = ref([
      {
        label: 'Opciones',
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
        items: [
          { 
            label: 'Opciones', 
            icon: 'pi pi-fw pi-cog', 
            to: '/home'
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
      menuUser.value.toggle(event);
    };

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
      navigation, itemsMenu, open, menuUser, displayConfirmation,

      openMenuUser, logOut,
    };
  },
};
</script>