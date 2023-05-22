import axios from 'axios';
import { useAuthStore } from '@/store';

export default class WService {
    getMethod(url) {
        const authStore = useAuthStore();
        const bearerAuth = 'Bearer ' + authStore.token;
        let config = {
            method: 'get',
            url: url,
            headers: { 'Authorization': bearerAuth }
        };
          
        const promise = axios(config);
        return promise.then((response) => {
            return response.data;
        })
    }

    postMethod(url, data, id) {
        const authStore = useAuthStore();
        const basicAuth = 'Bearer ' + authStore.token;
        let config = {
            method: id !== '' ? 'put' : 'post',
            url: url,
            headers: { 
                'Authorization': basicAuth,
                'Content-Type': 'application/json'
              },
            data : data
        };
        const promise = axios(config);
        return promise.then((response) => {
            return response.data;
        })
    }

    async postData(url, file) {
        const authStore = useAuthStore();
        const basicAuth = 'Bearer ' + authStore.token;
        const formData = new FormData();
        formData.append('file', file, 'audio.mp3');
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: url,
            headers: { 
                'Authorization': basicAuth, 
                'Content-Type': 'multipart/form-data'
            },
            data : formData
        };
          
        const response = await axios(config);
        return response.data;
    }

    deleteMethod(url, id) {
        const authStore = useAuthStore();
        const basicAuth = 'Bearer ' + authStore.token;
        let config = {
            method: 'delete',
            url: url + id,
            headers: { 'Authorization': basicAuth }
        };
        const promise = axios(config);
        return promise.then((response) => {
            return response.data;
        })
    }
}