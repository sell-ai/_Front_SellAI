<template>
  <div class="flex h-screen antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light">
    <!-- Sidebar -->
    <aside class="flex-shrink-0 w-64 hidden bg-white border-r dark:border-primary-darker dark:bg-darker md:block">
      <div class="flex flex-col h-full">
        <!-- Sidebar links -->
        <nav aria-label="Main" class="flex-1 px-2 py-4 space-y-2 overflow-y-hidden hover:overflow-y-auto">
          <template v-for="item in navigation" :key="item">
            <Disclosure as="div" class="mt-2" v-slot="{open}">
              <DisclosureButton
                class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 rounded-lg hover:bg-blue-100 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
                :class="{ 'bg-blue-100': item.isActive || open }">
                <span aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.d" />
                  </svg>
                </span>
                <span class="ml-2 text-sm">{{ item.name }}</span>
                <ChevronUpIcon
                  :class="open ? '' : 'transform rotate-180'"
                  class="w-5 h-5 text-blue-500"
                />
              </DisclosureButton>
              <DisclosurePanel class="mt-2 space-y-2 px-7" :aria-label="item.name">
                <div v-for="subitem in item.items" :key="subitem">
                  <router-link v-if="subitem.isActive" :to="subitem.link" role="menuitem"
                    class="block p-2 text-sm text-gray-700 transition-colors duration-200 rounded-md dark:text-light dark:hover:text-light hover:text-gray-700">
                    {{ subitem.name }}
                  </router-link>
                  <router-link v-else :to="subitem.link" role="menuitem"
                    class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md dark:hover:text-light hover:text-gray-700"
                  >
                    {{ subitem.name }}
                  </router-link>
                </div>
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
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <!-- Brand -->
          <a href="index.html" class="inline-block text-2xl font-bold tracking-wider uppercase text-cyan-dark dark:text-light"
          >
            SISTEMA
          </a>

          <!-- Desktop Right buttons -->
          <nav aria-label="Secondary" class="hidden space-x-2 md:flex md:items-center">
            <div class="ml-4 flex items-center md:ml-6">
              <!-- Profile dropdown -->
              <Menu as="div" class="ml-3 relative">
                <div>
                  <MenuButton class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  </MenuButton>
                </div>
                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem v-for="item in profile" :key="item" v-slot="{ active }">
                      <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{ item }}</a>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </nav>
        </div>
        <!-- Mobile main menu -->
        <DisclosurePanel class="md:hidden bg-gray-50 flex-1 h-full overflow-x-hidden overflow-y-auto">
          <div v-for="item in navigation" :key="item" class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Disclosure as="div" class="mt-2" v-slot="{open}">
              <DisclosureButton
                class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-500 rounded-lg hover:bg-blue-100 focus:outline-none focus-visible:ring focus-visible:ring-blue-100 focus-visible:ring-opacity-75"
                :class="{ 'bg-blue-100': item.isActive || open }">
                <span aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.d" />
                  </svg>
                </span>
                <span class="ml-2 text-sm">{{ item.name }}</span>
                <ChevronUpIcon
                  :class="open ? '' : 'transform rotate-180'"
                  class="w-5 h-5 text-blue-500"
                />
              </DisclosureButton>
              <DisclosurePanel class="mt-2 space-y-2 px-7" :aria-label="item.name">
                <div v-for="subitem in item.items" :key="subitem">
                  <router-link v-if="subitem.isActive" :to="subitem.link" role="menuitem"
                    class="block p-2 text-sm text-gray-700 transition-colors duration-200 rounded-md dark:text-light dark:hover:text-light hover:text-gray-700">
                    {{ subitem.name }}
                  </router-link>
                  <router-link v-else :to="subitem.link" role="menuitem"
                    class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md dark:hover:text-light hover:text-gray-700"
                  >
                    {{ subitem.name }}
                  </router-link>
                </div>
              </DisclosurePanel>
            </Disclosure>
          </div>
          <div class="pt-4 pb-3 border-t border-gray-700">
            <div class="flex items-center px-5">
              <div class="flex-shrink-0">
                <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              </div>
              <div class="ml-3">
                <div class="text-base font-medium leading-none text-black">Tom Cook</div>
                <div class="text-sm font-medium leading-none text-gray-400">tom@example.com</div>
              </div>
              <button class="ml-auto bg-blue-100 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div class="mt-3 px-2 space-y-1">
              <a v-for="item in profile" :key="item" href="#" class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md dark:hover:text-light hover:text-gray-700">{{ item }}</a>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
      <!-- Main content -->
      <main class="pb-16">
        <!-- Content header -->
        <div class="flex items-center justify-between px-4 py-4 border-b lg:py-6 shadow dark:border-blue-darker">
              <h1 class="text-2xl font-semibold">Dashboard</h1>
              <button class="px-4 py-1 text-sm text-cyan font-semibold rounded-full border
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
        <div>AiMeet &copy; 2021</div>
        <div>
          Made by
          <a href="https://github.com/leonardoillanez" target="_blank" class="text-blue-500 hover:underline"
            >Leonardo Illanez</a
          >
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue';

import { ChevronUpIcon } from '@heroicons/vue/solid';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline';

const navigation = [
  {
    name: 'Dashboard',
    d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    isActive: false,
    items: [
      {
        name: 'Default',
        link: '/',
        isActive: false,
      },
      {
        name: 'E-Commerce',
        link: '#',
        isActive: false,
      },
    ],
  },
  {
    name: 'Components',
    d: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
    isActive: false,
    items: [
      {
        name: 'Table',
        link: '/about',
        isActive: false,
      },
    ],
  },
];
const profile = ['Your Profile', 'Settings', 'Sign out'];

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    ChevronUpIcon,
    BellIcon,
    MenuIcon,
    XIcon,
  },
  setup() {
    const open = ref(false);

    return {
      navigation,
      profile,
      open,
    };
  },
};
</script>
