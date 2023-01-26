<template>
  <div class="space-y-2 my-4">
    <div class="flex items-end" :class="{'justify-end': !response}">
      <div :class="classObject" class="flex flex-col space-y-2 text-xs max-w-xs mx-2">
        <div v-if="response" alert class="relative w-full p-4 mb-4 text-xl text-white border border-solid rounded-lg bg-gradient-to-tl from-blue-700 to-cyan-500 border-cyan-200" v-html="message"></div>
        <div v-else alert class="relative w-full p-4 mb-4 text-xl text-white border border-solid rounded-lg bg-gradient-to-tl from-emerald-500 to-teal-400 border-emerald-300" v-html="message"></div>
      </div>
      <div>
        <div v-if="response">
          <img :src="imgBot" alt="BOT" class="inline-flex items-center justify-center w-8 h-8 mr-2 text-white transition-all duration-200 ease-in-out text-sm rounded-xl order-1"/>
        </div>
        <div v-else>
          <img v-if="url!==''" :src="url" alt="BOT" class="inline-flex items-center justify-center w-8 h-8 mr-2 text-white transition-all duration-200 ease-in-out text-sm rounded-xl order-2"/>
          <Avatar v-else icon="pi pi-user" class="mr-2 order-2" style="background-color:#2196F3; color: #ffffff" shape="circle"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import Avatar from 'primevue/avatar';

export default{
  props: {
    message: String,
    response: Boolean,
    url: {
      type: String,
      default: ''
    }
  },
  components: {
    Avatar,
  },
  setup(props){
    
    const imgBot = require('@/assets/ai48.png');
    const resp = props.response;
    const classObject = reactive({
      'order-1': !resp,
      'order-2': resp,
      'items-start': resp,
      'items-end': !resp
    });

    return {
      imgBot, classObject
    };
  }
}
</script>