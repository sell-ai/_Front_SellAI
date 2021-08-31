<template>
    <div>
        <TransitionRoot as="template" :show="propShow">
        <Dialog as="div" class="fixed inset-0 flex z-40" @close="propShow = false">
            <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
            <DialogOverlay class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="translate-x-full">
            <div class="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                <div class="px-4 flex items-center justify-between">
                <h2 class="text-lg font-medium text-gray-900">Opciones</h2>
                <button type="button" class="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400" @click="propShow = false">
                    <span class="sr-only">Cerrar</span>
                    <XIcon class="h-6 w-6" aria-hidden="true" />
                </button>
                </div>

                <!-- Propiedades -->
                <form class="mt-4 border-t border-gray-200">
                <Disclosure as="div" v-for="section in menuProp" :key="section.id" class="border-t border-gray-200 px-4 py-6" v-slot="{ open }">
                    <h3 class="-mx-2 -my-3 flow-root">
                    <DisclosureButton class="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                        <span v-if="section.value.id === 'danger'" class="font-medium text-red-600">
                        {{ section.value.name }}
                        </span>
                        <span v-else class="font-medium text-gray-900">
                        {{ section.value.name }}
                        </span>
                        <span class="ml-6 flex items-center">
                        <PlusSmIcon v-if="!open" class="h-5 w-5" aria-hidden="true" />
                        <MinusSmIcon v-else class="h-5 w-5" aria-hidden="true" />
                        </span>
                    </DisclosureButton>
                    </h3>
                    <DisclosurePanel class="pt-6">
                    <div class="space-y-4">
                        <div v-for="(option, optionIdx) in section.value.items" :key="option.id">
                            <!-- Checkbox -->
                            <div v-if="option.type == 'check'" class="flex items-center">
                                <input v-if="'change' in option" :id="`prop-mobile-${section.id}-${optionIdx}`" :name="`${section.id}[]`" type="checkbox" v-model="option.checked" :checked="option.checked"
                                class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" @click="changeState(option.change, $event)" />
                                <input v-else :id="`prop-mobile-${section.id}-${optionIdx}`" :name="`${section.id}[]`" type="checkbox" v-model="option.checked" :checked="option.checked"
                                :disabled="'enabled' in option && !option.enabled"
                                class="h-4 w-4 ml-6 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                                <label :for="`prop-mobile-${section.id}-${optionIdx}`" class="ml-3 min-w-0 flex-1 text-gray-500">
                                {{ option.label }}
                                </label>
                            </div>
                            <!-- Select -->
                            <Listbox v-else-if="option.type == 'select'" as="div" v-model="option.value">
                                <ListboxLabel class="block text-sm font-medium text-gray-700">
                                    {{ option.label }}
                                </ListboxLabel>
                                <div class="mt-1 relative">
                                    <ListboxButton class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <span class="flex items-center">
                                            <span class="ml-3 block truncate">{{ option.value.text }}</span>
                                        </span>
                                        <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </ListboxButton>

                                    <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                        <ListboxOptions class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                            <ListboxOption as="template" v-for="selItem in option.select" :key="selItem.value" :value="selItem" v-slot="{ active, selected }">
                                                <li @click="SelectChanged(selItem)" :class="[active ? 'text-white bg-indigo-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-3 pr-9']">
                                                    <div class="flex items-center">
                                                        <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">
                                                            {{ selItem.text }}
                                                        </span>
                                                    </div>

                                                    <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                </li>
                                            </ListboxOption>
                                        </ListboxOptions>
                                    </transition>
                                </div>
                            </Listbox>
                            <!-- Text -->
                            <div v-else-if="option.type == 'text'" >
                                <div v-if="'eshijo' in option && option.eshijo">
                                    <label v-bind:for="`prop-mobile-${section.id}-${optionIdx}-${option.id}`" class="block text-sm font-medium text-gray-700 transform translate-x-6"> {{ option.label }} </label>
                                    <input type="text" v-model="option.value" :name="`prop-mobile-${section.id}-${optionIdx}-${option.label}`" class="text-xs rounded shadow transform translate-x-6" 
                                        :maxlength="option.max" :readonly="option.readonly" :disabled="'enabled' in option && !option.enabled" />
                                </div>
                                <div v-else>
                                    <label v-bind:for="`prop-mobile-${section.id}-${optionIdx}-${option.id}`" class="block text-sm font-medium text-gray-700"> {{ option.label }} </label>
                                    <input type="text" v-model="option.value" :name="`prop-mobile-${section.id}-${optionIdx}-${option.label}`" class="text-xs rounded shadow" 
                                        :maxlength="option.max" :readonly="option.readonly" :disabled="'enabled' in option && !option.enabled" />
                                </div>
                            </div>
                            <!-- Button -->
                            <div v-else-if="option.type == 'button'" class="flex" >
                                <button type="button" class="rounded font-medium bg-red-100 text-red-900 py-2 px-4 inline-flex items-center border-2 border-red-100 hover:text-red-800 hover:bg-transparent">
                                <TrashIcon class="h-5 w-5" aria-hidden="true" />
                                <span>{{ option.label }}</span>
                                </button>
                            </div>
                            <!-- Divider -->
                            <div v-else-if="option.type == 'divider'" class="border-t border-gray-200 px-4 py-1" >
                            </div>
                        </div>
                    </div>
                    </DisclosurePanel>
                </Disclosure>
                </form>
            </div>
            </TransitionChild>
        </Dialog>
        </TransitionRoot>
        <button type="button" class="text-gray-400 hover:text-gray-500" @click="propShow = true">
          <span class="sr-only">Opciones</span>
          <MenuIcon class="w-5 h-5" aria-hidden="true" />
        </button>
    </div>
</template>

<script>
import { ref, toRefs } from 'vue';
import { Dialog, DialogOverlay, Disclosure, DisclosureButton,
  DisclosurePanel, TransitionChild, TransitionRoot, Listbox,
  ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { XIcon, TrashIcon } from '@heroicons/vue/outline';
import { MenuIcon, MinusSmIcon, PlusSmIcon, CheckIcon, SelectorIcon } from '@heroicons/vue/solid';

export default {
    components: {
        Dialog,
        DialogOverlay,
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        TransitionChild,
        TransitionRoot,
        Listbox,
        ListboxButton,
        ListboxLabel,
        ListboxOption,
        ListboxOptions,
        XIcon,
        TrashIcon,
        MenuIcon,
        MinusSmIcon,
        PlusSmIcon,
        CheckIcon,
        SelectorIcon,
    },
    props: {
        info: {
            type: Object,
            required: true,
        },
        selField: {
            type: String,
            default: '',
        }
    },
    setup(props) {
        const propShow = ref(false);
        const menuProp = toRefs(props.info);

        const changeState = (prop, value) => {
            menuProp.forEach(el => {
                el.value.items.forEach(subEl => {
                if (prop in subEl) {
                    switch (subEl.type) {
                        case "text":
                            subEl.value = '';
                            break;
                        case "check":
                            if (!value.target.checked) {
                                subEl.checked = false;
                            }
                            
                            break;
                    }
                    subEl.enabled = value.target.checked;
                }
                })
            })
        };

        const SelectChanged = (it) => {
            console.log(it);
        }

        return {
            propShow,
            menuProp,

            changeState,
            SelectChanged,
        };
    },
}
</script>