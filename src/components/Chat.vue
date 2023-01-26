<template>
  <div class="flex flex-col justify-between">
    <div ref="scroller" v-show="messages.length>0" class="static flex flex-col pr-4 pl-4 pt-4 overflow-y-visible md:w-screen-md w-screen h-screen-xs md:h-screen-md">
      <Msg v-for="msg in messages" :key="msg.id" :message="msg.message" :response="msg.response"></Msg>
      <div ref="divScroll" class="h-16 mt-16 text-sky-50">....</div>
    </div>
    
    <div class="w-full">
      <div class="fixed md:w-screen-md w-screen flex flex-row bottom-0 items-center h-16 rounded-xl bg-white px-4">
        <div>
          <button class="flex items-center justify-center text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13">
              </path>
            </svg>
          </button>
        </div>
        <div class="flex-grow ml-4">
          <div class="w-full">
            <input autofocus v-model.trim="txtMsg" v-on:keyup.enter="sendMessage" type="text" placeholder="Escribir un mensaje!" class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"/>
          </div>
        </div>
        <div class="ml-4">
          <Button label="Enviar" icon="pi pi-send" iconPos="right" class="p-button-sm p-button-rounded" @click="sendMessage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, nextTick } from 'vue';
import Button from 'primevue/button';
import ScrollPanel from 'primevue/scrollpanel';
import ScrollTop from 'primevue/scrolltop';
import FocusTrap from 'primevue/focustrap';
import Tag from 'primevue/tag';
import Msg from '@/components/chatAI/message';

export default {
  name: 'Chat',
  components: {
    Button, ScrollPanel, ScrollTop, Tag,
    Msg,
  },
  props: {
    msg: String,
  },
  setup() {
    const scroller = ref();
    const divScroll = ref();
    const msgId = ref(0);
    const messages = ref([{id: 0, message: 'Hola...en que puedo ayudarte?', response: true}]);

    const txtMsg = ref('');

    const sendMessage = async () => {
      messages.value.push({ id: msgId.value++, message: txtMsg.value, response: false });
      txtMsg.value = '';
      await nextTick();
      divScroll.value.scrollIntoView();
      //scroller.value.scrollTop = scroller.value.scrollHeight + 120;
    };

    return { 
      messages, txtMsg, scroller, divScroll,
      sendMessage 
    };
  },
  directives: {
    'focustrap': FocusTrap
  }
};
</script>

