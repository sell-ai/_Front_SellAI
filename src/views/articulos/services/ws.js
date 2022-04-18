import axios from 'axios';
import Cookies from 'js-cookie'
const keyT = btoa(Cookies.get('user') + ':' + Cookies.get('token'));
const basicAuth = 'Basic ' + keyT;

export default class WService {
    
    getCategorias() {
        var config = {
            method: 'get',
            url: 'category/',
            headers: { 'Authorization': basicAuth }
        };
          
        const promise = axios(config);
        return promise.then((response) => {
            return response.data;
        })
    }

    getBrand() {
        var config = {
            method: 'get',
            url: 'brand/',
            headers: { }
        };
          
        const promise = axios(config);
        return promise.then((response) => {
            return response.data;
        })
    }

    getProveedor() {
        var config = {
            method: 'get',
            url: 'proveedor/',
            headers: { }
        };
          
        const promise = axios(config);
        return promise.then((response) => {
            return response.data;
        })
    }

    getMoneda() {
        var config = {
            method: 'get',
            url: 'moneda/',
            headers: { 'Authorization': basicAuth }
        };
          
        const promise = axios(config);
        return promise.then((response) => {
            return response.data;
        })
    }

    getTaxes() {
        var config = {
            method: 'get',
            url: 'taxes/',
            headers: { }
        };
          
        const promise = axios(config);
        return promise.then((response) => {
            return response.data;
        })
    }

    getPerformance() {
        var config = {
            method: 'get',
            url: 'performance/',
            headers: { }
        };
          
        const promise = axios(config);
        return promise.then((response) => {
            return response.data;
        })
    }

    getProducts() {
        var config = {
            method: 'get',
            url: 'product/',
            headers: { }
        };
          
        const promise = axios(config);
        return promise.then((response) => {
            return response.data;
        })
    }

    deleteProduct(id) {
        var config = {
            method: 'delete',
            url: 'product/' + id,
            headers: { }
        };
        const promise = axios(config);
        return promise.then((response) => {
            return response.data;
        })
    }

    postArticulo(data, id) {
        var config = {
            method: id !== '' ? 'put' : 'post',
            url: 'product/',
            headers: { 
                'Content-Type': 'application/json'
              },
            data : data
        };
        const promise = axios(config);
        return promise.then((response) => {
            return response.data;
        })
    }
}