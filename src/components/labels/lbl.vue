<template>
    <div class="table w-full">
        <div class="table-row-group">
            <div class="table-row">
                <label :for="forLabel" class="table-cell" :class="CssNormal">
                    {{ GetValueChild('lblLabel') }}
                </label>
                <div class="table-cell">
                    <Propiedades :info="menuProp"></Propiedades>    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, reactive, ref } from 'vue';
import Propiedades from '../menuProp.vue';

export default {
    components: {
        Propiedades,
    },
    props: {
        modelValue: {
            type: String,
            default: 'Label'
        },
        name: {
            type: String,
            default: '',
        },
        forLabel: {
            type: String,
            default: '',
        },
        showDanger: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const IdRandom = `lbl_${Math.random().toString(36).substr(2)}`;
        const propLabel = ref(props.modelValue);
        const PropsRef = ref(props.name);
        if (PropsRef.value === '') {
            PropsRef.value = IdRandom;
        }
        const menuProp = reactive(
        [
            {
                id: 'prop',
                name: 'Propiedades',
                items: [
                    { type: 'text', id: 'txtName', value: PropsRef.value, label: 'Nombre', placeholder: 'Nombre', readonly: true },
                    { type: 'text', id: 'lblLabel', value: propLabel.value, label: 'Texto del Label', placeholder: 'Etiqueta', max: 30 },
                    { type: 'select', id: 'lblColor', value: { value: 'text-black', text: 'Negro' }, label: 'Color del texto', select: [
                        { value: 'text-red-500', text: 'Rojo' },
                        { value: 'text-yellow-200', text: 'Amarillo' },
                        { value: 'text-yellow-500', text: 'Naranja' },
                        { value: 'text-green-500', text: 'Verde' },
                        { value: 'text-blue-600', text: 'Azul' },
                        { value: 'text-indigo-600', text: 'Indigo' },
                        { value: 'text-purple-600', text: 'Purpura' },
                        { value: 'text-pink-400', text: 'Rosado' },
                        { value: 'text-black', text: 'Negro' },
                        { value: 'text-gray-500', text: 'Gris' },
                    ]},
                    { type: 'select', id: 'lblBackColor', value: { value: 'bg-transparent', text: 'Transparente' }, label: 'Color Fondo', select: [
                        { value: 'bg-transparent', text: 'Transparente' },
                        { value: 'bg-red-600', text: 'Rojo' },
                        { value: 'bg-yellow-300', text: 'Amarillo' },
                        { value: 'bg-yellow-600', text: 'Naranja' },
                        { value: 'bg-green-500', text: 'Verde' },
                        { value: 'bg-blue-600', text: 'Azul' },
                        { value: 'bg-indigo-600', text: 'Indigo' },
                        { value: 'bg-purple-600', text: 'Purpura' },
                        { value: 'bg-pink-400', text: 'Rosado' },
                        { value: 'bg-black', text: 'Negro' },
                        { value: 'bg-white', text: 'Blanco' },
                        { value: 'bg-gray-400', text: 'Gris' },
                    ]},
                    { type: 'select', id: 'lblPosition', value: { value: 'text-left', text: 'Izquierda' }, label: 'Alinear', select: [
                        { value: 'text-left', text: 'Izquierda' },
                        { value: 'text-right', text: 'Derecha' },
                        { value: 'text-center', text: 'Centro' },
                        { value: 'text-justify ', text: 'Relleno' },
                    ]},
                    { type: 'select', id: 'lblSize', value: { value: 'text-base', text: 'Normal' }, label: 'Tamaño', select: [
                        { value: 'text-xs', text: 'XS' },
                        { value: 'text-sm', text: 'SM' },
                        { value: 'text-base', text: 'Normal' },
                        { value: 'text-lg', text: 'LG' },
                        { value: 'text-xl', text: 'XL' },
                        { value: 'text-2xl', text: '2XL' },
                        { value: 'text-4xl', text: '4XL' },
                        { value: 'text-6xl', text: '6XL' },
                        { value: 'text-8xl', text: '8XL' },
                        { value: 'text-9xl', text: '9XL' },
                    ]},
                    { type: 'divider'},
                    { type: 'check', id: 'chkAdvanced', checked: false, label: 'CSS Avanzado', change: 'cssAdvanced' },
                    { type: 'text', id: 'txtCssAdvanced', value: '', label: 'CSS', placeholder: 'Css Tailwind', enabled: false, cssAdvanced: true, eshijo: true },
                ],
            },
            {
                id: 'danger',
                name: 'Zona de peligro',
                visible: props.showDanger,
                items: [
                    { type: 'divider'},
                    { type: 'button', id: 'btnDelete', value: 'delete', label: 'Eliminar' },
                ],
            },
        ]);

        const CssNormal = computed(() => {
            const lblColor = menuProp.find(me => me.id === 'prop').items.find(it => it.id === 'lblColor').value;
            const lblBackColor = menuProp.find(me => me.id === 'prop').items.find(it => it.id === 'lblBackColor').value;
            const lblPosition = menuProp.find(me => me.id === 'prop').items.find(it => it.id === 'lblPosition').value;
            const lblSize = menuProp.find(me => me.id === 'prop').items.find(it => it.id === 'lblSize').value;
            const result = {
                [lblColor.value]: true,
                [lblBackColor.value]: true,
                [lblPosition.value]: true,
                [lblSize.value]: true,
            }
            return result;
        });

        const GetValueChild = computed(() => {
            return field => menuProp.find(me => me.id === 'prop').items.find(it => it.id === field).value;
        });

        const cssAdvanced = computed(()=>{
            return menuProp.find(me => me.id === 'prop').items.find(it => it.id === 'chkAdvanced').checked;
        });

        return {
            menuProp,
            propLabel,

            CssNormal,
            GetValueChild,
            cssAdvanced,
        };
    },
}
</script>