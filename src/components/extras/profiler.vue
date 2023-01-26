<template>
  <div class="mb-4 flex flex-wrap items-center justify-center">
    <img :src="url" alt="P" class="mr-2 shadow-xl rounded-lg w-16 h-16">
    <div class="flex-0">
      <h5 class="mb-1 font-bold">
        {{name}}
      </h5>
      <p class="mb-0 text-sm font-semibold">
        {{title}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    url: {
      type: String,
      default: 'https://demos.creative-tim.com/argon-dashboard-pro-tailwind/assets/img/team-3.jpg'
    },
    
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: 'Bienvenido'
    }
  },
  setup(props){

  }
}
</script>