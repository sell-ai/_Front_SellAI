<template>
  <div class="flex flex-col justify-between">
    <div ref="scroller" v-show="messages.length>0" class="static flex flex-col pr-4 pl-4 pt-4 overflow-y-visible md:w-screen-md w-screen h-screen-xs md:h-screen-md">
      <Msg v-for="msg in messages" :key="msg.id" :message="msg.message" 
        :response="msg.response" :type="typeMsg" :table="tableMsg" :url="msg.url"
        @onfinish="bottomScroll">
      </Msg>
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
        <div>
          <button @click="toggleAudio" class="flex items-center justify-center text-gray-400 hover:text-gray-600 ml-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
            </svg>
          </button>

          <OverlayPanel ref="opAudio" class="rounded-xl border-gray-700">
            <Recorder @send-audio="callbackAudio"/>
          </OverlayPanel>
        </div>
        <div class="flex-grow ml-4">
          <div class="w-full">
            <input autofocus v-model.trim="txtMsg" v-on:keyup.enter="sendMessage" type="text" :disabled="loading"
              maxlength="200"
              placeholder="Escribir un mensaje!" class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"/>
          </div>
        </div>
        <div class="ml-4">
          <Button label="Enviar" icon="pi pi-send" iconPos="right" class="p-button-sm p-button-rounded" @click="sendMessage" :loading="loading" :disabled="validSend" />
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
import OverlayPanel from 'primevue/overlaypanel';
import Msg from '@/components/chatAI/message';
import Recorder from '@/components/audio/recorder';

import WService from '@/plugins/ws';

export default {
  name: 'Chat', // El nombre del componente.
  components: {
    Button, ScrollPanel, ScrollTop, Tag,
    OverlayPanel, Msg, Recorder
  },
  props: {
    msg: String,
  },
  setup() {
    const wService = ref(new WService()); // Se crea una referencia a un objeto de tipo WService
    const loading = ref(false); // Una variable reactiva para controlar el indicador de carga
    const scroller = ref(); // Una referencia para controlar el panel de desplazamiento
    const divScroll = ref(); // Una referencia para controlar el desplazamiento del panel
    const msgId = ref(0); // Una referencia para el ID de cada mensaje
    const contextId = ref(""); // Una referencia para el contexto de cada mensaje
    const messages = ref([{id: -1, message: 'Hola...si necesitas ayuda escribe: "Ayuda"', response: true}]); // Una referencia para almacenar los mensajes en el chat
    const typeMsg = ref(""); // Una referencia para almacenar el tipo de mensaje (texto o tabla)
    const tableMsg = ref([]); // Una referencia para almacenar los datos de una tabla
    const opAudio = ref(); // Una referencia para controlar el panel de grabación de audio
    const txtMsg = ref(''); // Una referencia para almacenar el texto del mensaje que se está escribiendo

    // Función para enviar un mensaje
    const sendMessage = async () => {
      loading.value = true;
      const msg = txtMsg.value; // Se obtiene el texto del mensaje
      messages.value.push({ id: msgId.value++, message: txtMsg.value, response: false }); // Se agrega el mensaje a la lista de mensajes
      txtMsg.value = ''; // Se borra el texto del mensaje
      typeMsg.value = '';
      await nextTick(); // Se espera al siguiente ciclo de actualización (DOM)
      divScroll.value.scrollIntoView(); // Se desplaza la vista hacia el final del chat

      // Se llama al método WebSocket para interpretar el mensaje
      let methodParam = "interpreter/" + msg;
      if (contextId.value !== "") {
        methodParam = "interpreter/" + msg + "/" + contextId.value;
      }
        
      wService.value.getMethod(methodParam).then(async data => {
        await responseInterpreter(data.resp);
      }).catch(ex => {
          console.log("Error in Request Interpreter: ", ex);
          loading.value = false; // se marca que la respuesta ha sido cargada
      });
    };

    const responseInterpreter = async (responseServer) => {
      if (responseServer !== undefined) {
        const response = JSON.parse(responseServer);
        // Se verifica si existe un contexto en la respuesta
        if (response.contexts) {
          contextId.value = response.contexts.Created ? "" : response.contexts.Id;
        }
        // Analiza la respuesta del mensaje
        if (response.messages && response.messages.length > 0) {
          let idResp = contextId.value, msgResp = "";
          if (idResp === "")
            idResp = msgId.value++;
          
            // Si la respuesta es una tabla, se guarda en una variable
          if  (response.table.rows && response.table.rows.length > 0){
            // Add data to table.
            typeMsg.value = "table";
            tableMsg.value = response.table;
          }

          // I loop through each of the records and concatenate them.
          // Recorre cada uno de los mensajes y los concatena
          response.messages.forEach(msg => {
            msgResp += " " + msg;
          });

          // Se agrega el mensaje de respuesta a la lista de mensajes
          messages.value.push({ id: idResp, message: msgResp.trim(), response: true });
          await nextTick();
          divScroll.value.scrollIntoView({behavior: 'smooth'}); // Se desplaza la vista hacia el final del chat
        }
      }
      loading.value = false; // se marca que la respuesta ha sido cargada
    };

    const bottomScroll = () => {
      divScroll.value.scrollIntoView({behavior: 'smooth'});
    };

    const validSend = () => {
      return txtMsg.value.trim() === "" ? true : false;
    }

    // Abre panel de audio.
    const toggleAudio = (event) => {
      opAudio.value.toggle(event);
    }

    // Respuesta luego de que graba el audio.
    const callbackAudio = async (resp, files) => {
      console.log('Respuesta de Call Back AUDIO>>>>> ', resp);
      console.log('Files: ', files);
      typeMsg.value = 'audio';
      messages.value.push({ id: msgId.value++, message: txtMsg.value, response: false, url: files.url }); // Se agrega el mensaje a la lista de mensajes
      await responseInterpreter(resp.resp);
    }

    return { 
      loading, messages, txtMsg, scroller, divScroll, contextId,
      typeMsg, tableMsg, opAudio,
      sendMessage, bottomScroll, validSend, toggleAudio, callbackAudio
    };
  },
  directives: {
    'focustrap': FocusTrap
  }
};
</script>

