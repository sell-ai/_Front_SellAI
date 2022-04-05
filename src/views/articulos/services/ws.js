import axios from 'axios';

export default class WService {
    
    getCategorias() {
        var config = {
            method: 'get',
            url: 'https://localhost:7132/api/category/',
            headers: { }
        };
          
        const promise = axios(config);
        return promise.then((response) => {
            return response.data;
        })
    }

    getBrand() {
        var config = {
            method: 'get',
            url: 'https://localhost:7132/api/brand/',
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
            url: 'https://localhost:7132/api/proveedor/',
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
            url: 'https://localhost:7132/api/moneda/',
            headers: { }
        };
          
        const promise = axios(config);
        return promise.then((response) => {
            return response.data;
        })
    }

    getTaxes() {
        var config = {
            method: 'get',
            url: 'https://localhost:7132/api/taxes/',
            headers: { }
        };
          
        const promise = axios(config);
        return promise.then((response) => {
            return response.data;
        })
    }
}