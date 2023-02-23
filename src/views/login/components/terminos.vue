<template>
    <div>
        <p>
            Términos y condiciones...
        </p>
        <Chips v-model="value1" />
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    import Chips from 'primevue/chips';

    const value1 = ref(); 

</script>