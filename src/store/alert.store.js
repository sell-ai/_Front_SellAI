import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', {
    state: () => ({
        alert: [],
        count: 0,
        random: false
    }),
    actions: {
        success(message) {
            let _id = "";
            if (this.random)
                _id = `id_${Math.random().toString(36).substring(2)}`
            else
                _id = `id_${this.count++}`;
            this.alert.push({ message, type: 'success', id: _id });
        },
        info(message) {
            let _id = "";
            if (this.random)
                _id = `id_${Math.random().toString(36).substring(2)}`
            else
                _id = `id_${this.count++}`;
            this.alert.push({ message, type: 'info', id: _id });
        },
        warn(message) {
            let _id = "";
            if (this.random)
                _id = `id_${Math.random().toString(36).substring(2)}`
            else
                _id = `id_${this.count++}`;
            this.alert.push({ message, type: 'warn', id: _id });
        },
        error(message) {
            let _id = "";
            if (this.random)
                _id = `id_${Math.random().toString(36).substring(2)}`
            else
                _id = `id_${this.count++}`;
            this.alert.push({ message, type: 'error', id: _id });
        },
        clear(random) {
            this.count = 0;
            this.alert = [];
            this.random = random || false;
        },
        exception(ex) {
            var t = this;
            if (ex.response && ex.response.data) {
                if (ex.response.data.Error) {
                    ex.response.data.Error.forEach(e => {
                    t.error(e);
                  });
                }
                else if (ex.response.status === 500 && ex.response.data) {
                    const originalText = ex.response.data;
                    const index = originalText.indexOf("\n");
                    const extractedText = originalText.substring(0, index);
                    t.warn(extractedText);
                }
                else if (ex.response.status === 500) {
                    t.warn("Error en el servidor!");
                }
                else {
                  t.error(ex.response.toJSON());
                }
            } 
            else if (ex.request) {
                if (ex.message && ex.message == "Network Error") {
                   t.warn("Sin conexión con el servidor");
                }
                else {
                  t.error(ex.request);
                }
            } 
            else if (ex.message) {
                t.error(ex.message);
            }
            else {
                t.error(ex.toJSON());
            }
        }
    }
});