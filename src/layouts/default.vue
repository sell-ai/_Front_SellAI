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
        <div>AiMeet &copy; 2022</div>
        <div>
          Power by
          <a href="https://instagram.com/excelenciadigital" target="_blank" class="text-indigo-500 hover:underline"
            >Excelencia Digital Software</a
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
      {
        name: 'Ventas',
        d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        isActive: false,
        items: [
          {
            label: 'Listado',
            icon: 'pi pi-fw pi-table',
            to: '/ventas',
          },
          {
            label: 'Parametros',
            icon: 'pi pi-fw pi-cog',
            items: [
              { 
                label: 'Formas de Pago',
                icon: 'pi pi-fw pi-credit-card',
                to: '/formaspagos'
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