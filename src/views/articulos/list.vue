<template>
    <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 divide-y divide-yellow-500">
            <div class="flex-1 flex justify-between mb-4">
                <div class="grid grid-cols-3 gap-6 w-3/4">
                    <div class="col-span-3 sm:col-span-2">
                        <div class="mt-1 relative flex rounded-md shadow-sm">
                            <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> <SearchIcon class="w-6 h-6 block" aria-hidden="true" /> </span>
                            <input type="text" name="search" id="search" v-model="busqueda" ref="inputBusqueda" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Buscar" />
                            <div class="absolute inset-y-0 right-0 flex items-center">
                                <a v-show="busqueda !== ''" @click="clearText" href="#" class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-2 pl-0 pr-2 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"> <XIcon class="w-6 h-6 block" /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <button @click="openModal = true" class="w-auto relative inline-flex items-center text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    <PlusIcon class="w-5 h-5 ml-2 mr-1 text-violet-200 hover:text-indigo-100" aria-hidden="true" /> Crear Artículo Nuevo
                </button>
            </div>
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            PVP
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Stock
                        </th>
                        <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">Opciones</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="art in searchProduct" :key="art.email">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10">
                                    <img class="h-10 w-10 rounded-full" :src="art.image" alt="" />
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900" v-html="highlightMatches(art.name)">
                                    </div>
                                    <div class="text-sm text-gray-500" v-html="highlightMatches(art.category)">
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ art.list1 }}</div>
                            <div class="text-sm text-gray-500">{{ art.list2 }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Activo
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ art.stock }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Menu as="div" class="inline-block text-left">
                                <div>
                                    <MenuButton class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-900 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                        Opciones <ChevronDownIcon class="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100" aria-hidden="true"/>
                                    </MenuButton>
                                </div>
                                <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
                                    enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
                                    leave-to-class="transform scale-95 opacity-0">
                                    <MenuItems class="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-indigo-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                        <div class="px-1 py-1">
                                            <MenuItem v-slot="{ active }">
                                                <button :class="[active ? 'text-indigo-600' : 'text-gray-900', 'group flex rounded-md items-center w-full px-2 py-2 text-sm',]">
                                                    <PencilIcon :active="active" class="w-5 h-5 mr-2 text-indigo-400" aria-hidden="true" />
                                                    Editar
                                                </button>
                                            </MenuItem>
                                            <MenuItem v-slot="{ active }">
                                                <button :class="[active ? 'text-indigo-600' : 'text-gray-900','group flex rounded-md items-center w-full px-2 py-2 text-sm',]">
                                                    <DuplicateIcon :active="active" class="w-5 h-5 mr-2 text-indigo-400" aria-hidden="true" />
                                                    Duplicar
                                                </button>
                                            </MenuItem>
                                        </div>
                                        <div class="px-1 py-1">
                                            <MenuItem v-slot="{ active }">
                                                <button :class="[active ? 'text-indigo-600' : 'text-gray-900', 'group flex rounded-md items-center w-full px-2 py-2 text-sm',]">
                                                    <ArchiveIcon :active="active" class="w-5 h-5 mr-2 text-indigo-400" aria-hidden="true" />
                                                    Archivar
                                                </button>
                                            </MenuItem>
                                        </div>

                                        <div class="px-1 py-1">
                                            <MenuItem v-slot="{ active }">
                                                <button :class="[active ? 'text-red-500' : 'text-gray-900','group flex rounded-md items-center w-full px-2 py-2 text-sm',]">
                                                    <TrashIcon :active="active" class="w-5 h-5 mr-2 text-red-400" aria-hidden="true"/>
                                                    Eliminar
                                                </button>
                                            </MenuItem>
                                        </div>
                                    </MenuItems>
                                </transition>
                            </Menu>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between ">
                <div>
                    <p class="text-sm text-gray-700">
                    Mostrando {{ ' ' }}
                    <span class="font-medium">1</span>
                    {{ ' ' }} de {{ ' ' }}
                    <span class="font-medium">10</span>
                    {{ ' ' }} de {{ ' ' }}
                    <span class="font-medium">97</span>
                    {{ ' ' }} resultados
                    </p>
                </div>
                <div>
                    <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span class="sr-only">Anterior</span>
                        <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
                    </a>
                    <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
                    <a href="#" aria-current="page" class="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 1 </a>
                    <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 2 </a>
                    <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"> 3 </a>
                    <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"> ... </span>
                    <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"> 8 </a>
                    <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 9 </a>
                    <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 10 </a>
                    <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span class="sr-only">Siguiente</span>
                        <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
                    </a>
                    </nav>
                </div>
            </div>
            <div class="flex-1 flex justify-between sm:hidden">
                <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Anterior </a>
                <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Siguiente </a>
            </div>
        </div>
    </div>

    <TransitionRoot as="template" :show="openModal">
        <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" :open="isOpen" @close="setIsOpen">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <!-- This element is to trick the browser into centering the modal contents. -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-screen-md sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900"> Crear Articulo Nuevo </DialogTitle>
                                <div class="mt-2">
                                    <EditProduct />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" @click="openModal = false">Deactivate</button>
                        <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="setIsOpen(false)">Cancel</button>
                    </div>
                </div>
                </TransitionChild>
            </div>
        </Dialog>
  </TransitionRoot>

  </div>
</template>

<script>
import { reactive, computed, ref } from 'vue'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import EditProduct from './edit'

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, PlusIcon } from '@heroicons/vue/solid'
import { ArchiveIcon, DuplicateIcon, PencilIcon, TrashIcon, SearchIcon, XIcon } from '@heroicons/vue/outline'

export default {
    components: {
        Menu,
        MenuButton,
        MenuItems,
        MenuItem,
        Dialog, 
        DialogOverlay, 
        DialogTitle, 
        TransitionChild, 
        TransitionRoot,
        ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, PlusIcon,
        ArchiveIcon, DuplicateIcon, PencilIcon, TrashIcon, SearchIcon, XIcon,
        EditProduct
    },
    setup() {
        const busqueda = ref('');
        const inputBusqueda = ref(null);
        const openModal = ref(false);
        const isOpen = ref(true);
        const data = reactive({
            lista: [
                {
                    name: "Libro \"El Líder\" de Gallup",
                    category: "Libros",
                    list1: "$ 5000,00",
                    list2: "$ 5450,00",
                    stock: 17,
                    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
                },
                {
                    name: "Marie Kondo",
                    category: "Libros",
                    list1: "$ 800,00",
                    list2: "$ 1152,80",
                    stock: 3,
                    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
                },
                {
                    name: "Iphone 13 Pro Max 256GB",
                    category: "Celular",
                    list1: "$ 400.000,00",
                    list2: "$ 450.000,00",
                    stock: 2,
                    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
                }
            ]
        });

        const searchProduct = computed(() => {
            let tempRecipes = data.lista;
  
            if (busqueda.value != '' && busqueda.value) {
                tempRecipes = tempRecipes.filter((item) => {
                    const match = busqueda.value.toLowerCase();
                    return item.name.toLowerCase().includes(match) ||
                        item.category.toLowerCase().includes(match)
                })
            }
            return tempRecipes
        })

        const highlightMatches = (text) => {
            const matchExists = text.toLowerCase().includes(busqueda.value.toLowerCase());
            if (!matchExists) return text;

            const re = new RegExp(busqueda.value, 'ig');
            return text.replace(re, matchedText => `<strong>${matchedText}</strong>`);
        }

        const clearText = () => {
            busqueda.value = '';
            inputBusqueda.value.focus();
        }

        const setIsOpen = (value) => {
          isOpen.value = value;
        }

        return {
            data,
            busqueda,
            inputBusqueda,
            openModal,
            isOpen,

            searchProduct,
            highlightMatches,
            clearText,
            setIsOpen,
        };
    },
};
</script>