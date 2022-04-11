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

    getPerformance() {
        var config = {
            method: 'get',
            url: 'https://localhost:7132/api/performance/',
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
            url: 'https://localhost:7132/api/product/',
            headers: { }
        };
          
        const promise = axios(config);
        return promise.then((response) => {
            return response.data;
        })
    }

    postArticulo(data, id) {
        var config = {
            method: 'post',
            url: 'https://localhost:7132/api/product/',
            headers: { 
                'Content-Type': 'application/json'
              },
            data : data
        };
        if (id !== '') {
            config = {
                method: 'put',
                url: 'https://localhost:7132/api/product/' + id,
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
            };
        }
        const promise = axios(config);
        return promise.then((response) => {
            return response.data;
        })
    }
}