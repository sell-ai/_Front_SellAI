import axios from 'axios';

export default class WService {
    
    getCategorias() {
        var config = {
            method: 'get',
            url: 'category/',
            headers: { }
        };
          
        const promise = axios(config);
        return promise.then((response) => {
            return response.data;
        })
    }

    postCategorias(data, id) {
        var config = {
            method: id !== '' ? 'put' : 'post',
            url: 'category/',
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

    deleteCategorias(id) {
        var config = {
            method: 'delete',
            url: 'category/' + id,
            headers: { }
        };
        const promise = axios(config);
        return promise.then((response) => {
            return response.data;
        })
    }

    getMarcas() {
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

    postMarcas(data, id) {
        var config = {
            method: id !== '' ? 'put' : 'post',
            url: 'brand/',
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

    deleteMarcas(id) {
        var config = {
            method: 'delete',
            url: 'brand/' + id,
            headers: { }
        };
        const promise = axios(config);
        return promise.then((response) => {
            return response.data;
        })
    }

    getMonedas() {
        var config = {
            method: 'get',
            url: 'moneda/',
            headers: { }
        };
          
        const promise = axios(config);
        return promise.then((response) => {
            return response.data;
        })
    }

    postMonedas(data, id) {
        var config = {
            method: id !== '' ? 'put' : 'post',
            url: 'moneda/',
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

    deleteMonedas(id) {
        var config = {
            method: 'delete',
            url: 'moneda/' + id,
            headers: { }
        };
        const promise = axios(config);
        return promise.then((response) => {
            return response.data;
        })
    }
}