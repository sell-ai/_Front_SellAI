import axios from 'axios';
import { useAuthStore } from '@/store';

export default class WService {
    getMethod(url) {
        const authStore = useAuthStore();
        const bearerAuth = 'Bearer ' + authStore.token;
        var config = {
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
        var config = {
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

    deleteMethod(url, id) {
        const authStore = useAuthStore();
        const basicAuth = 'Bearer ' + authStore.token;
        var config = {
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