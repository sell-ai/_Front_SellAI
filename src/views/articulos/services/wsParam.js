import axios from 'axios';
import Cookies from 'js-cookie'
const keyT = btoa(Cookies.get('user') + ':' + Cookies.get('token'));
const basicAuth = 'Basic ' + keyT;

export default class WService {

    getMethod(url) {
        var config = {
            method: 'get',
            url: url,
            headers: { 'Authorization': basicAuth }
        };
          
        const promise = axios(config);
        return promise.then((response) => {
            return response.data;
        })
    }

    postMethod(url, data, id) {
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