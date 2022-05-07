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
              <h1 class="text-2xl font-semibold">Dashboard</h1>
              <button class="hidden px-4 py-1 text-sm text-cyan font-semibold rounded-full border
                border-cyan hover:text-white
                hover:bg-cyan hover:border-transparent focus:outline-none
                focus:ring-2 focus:ring-cyan focus:ring-offset-2">
                Message
              </button>
        </div>
        <!-- Content -->
        <div class="mt-2">
          <router-view/>
        </div>
      </main>
      <!-- Main footer -->
      <footer class="absolute p-4 bottom-0 inset-x-0 flex items-center justify-between bg-white border-t dark:bg-darker   dark:border-blue-darker"
      >
        <div>AiMeet &copy; 2022</div>
        <div>
          Made by
          <a href="https://github.com/leonardoillanez" target="_blank" class="text-indigo-500 hover:underline"
            >Leonardo Illanez</a
          >
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Button from 'primevue/button';
import Menu from 'primevue/menu';
import PanelMenu from 'primevue/panelmenu';

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue';

import { ChevronUpIcon } from '@heroicons/vue/solid';
import { MenuIcon, XIcon } from '@heroicons/vue/outline';
import Cookies from 'js-cookie';

export default {
  components: {
    Button,
    Menu,
    PanelMenu,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronUpIcon,
    MenuIcon,
    XIcon,
  },
  setup() {
    const open = ref(false);
    const menuUser = ref();
    const navigation = ref([
      {
        name: 'Dashboard',
        d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
        isActive: false,
        items: [
          {
            label: 'Inicio',
            icon: 'pi pi-fw pi-home',
            to: '/home',
          },
        ],
      },
      {
        name: 'Artículos',
        d: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
        isActive: false,
        items: [
          {
            label: 'Listado',
            icon: 'pi pi-fw pi-table',
            to: '/articulos',
          },
          {
            label: 'Stock',
            icon: 'pi pi-fw pi-box',
            items: [
              { 
                label: 'Movimientos',
                icon: 'pi pi-fw pi-sync',
                to: '/movimientos'
              },
              { 
                label: 'Situaciones',
                icon: 'pi pi-fw pi-sitemap',
                to: '/situaciones'
              },
            ]
          },
          {
            label: 'Parametros',
            icon: 'pi pi-fw pi-cog',
            items: [
              { 
                label: 'Categorías',
                icon: 'pi pi-fw pi-tags',
                to: '/categorias'
              },
              { 
                label: 'Marcas',
                icon: 'pi pi-fw pi-shopping-bag',
                to: '/marcas'
              },
              { 
                label: 'Monedas',
                icon: 'pi pi-fw pi-wallet',
                to: '/moneda'
              },
            ]
          },
        ],
      },
    ]);
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
      router.push({ name: 'Login' });
    }


    return {
      navigation,
      itemsMenu,
      open,
      menuUser,

      openMenuUser,
      logOut,
    };
  },
};
</script>