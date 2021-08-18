<template>
  <div>
    <Popover v-slot="{ open }" class="relative">
      <PopoverButton :class="open ? '' : 'text-opacity-90'"
        class="inline-flex items-center px-3 py-2 text-base font-medium text-white bg-orange-700 rounded-md group hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        <DotsCircleHorizontalIcon />
        <ChevronDownIcon :class="open ? '' : 'text-opacity-70'"
          class="w-5 h-5 ml-2 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80"
          aria-hidden="true" />
      </PopoverButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel class="absolute z-10 max-w-sm px-4 mt-1 transform -translate-x-1/5 left-1/5 sm:px-0 lg:max-w-3xl">
          <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div class="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
              <a
                v-for="item in menu"
                :key="item.action"
                @click="action(item.action)"
                class="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
              >
                <div v-html="item.icon"></div>
                {{ item.name }}
              </a>
            </div>
            <div class="p-4 bg-gray-50">
              <a
                href="##"
                class="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
              >
                <span class="flex items-center">
                  <span class="text-sm font-medium text-gray-900">
                    Documentation
                  </span>
                </span>
                <span class="block text-sm text-gray-500">
                  Start integrating products and tools
                </span>
              </a>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>

<script>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/solid';
import { DotsCircleHorizontalIcon } from '@heroicons/vue/outline';

export default {
  components: {
    Popover,
    PopoverButton,
    PopoverPanel,
    ChevronDownIcon,
    DotsCircleHorizontalIcon,
  },
  props: {
    menu: {
      type: Object,
      default() {
        return {
          delete: {
            name: 'Borrar Ele',
            action: 'delete',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>`,
          },
        };
      },
    },
  },

  setup(props, { emit }) {
    console.log(props);
    const action = (value, obj) => {
      emit('accion', value);
    };

    return {
      action,
    };
  },
};
</script>
