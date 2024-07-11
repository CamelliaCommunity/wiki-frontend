export default class API {
    static url = 'https://backend.camellia.wiki';
    // static url = 'http://localhost:1984';
    
    static async get(endpoint) {
        return fetch(this.url + endpoint, {
            method: 'GET',
            headers: createHeaders(),
        }).then(response => response.json());
    }

    static async post(endpoint, body) {
        return fetch(this.url + endpoint, {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify(body),
        }).then(response => response.json());
    }

    static async put(endpoint, body) {
        return fetch(this.url + endpoint, {
            method: 'PUT',
            headers: createHeaders(),
            body: JSON.stringify(body),
        }).then(response => response.json());
    }

    static async delete(endpoint) {
        return fetch(this.url + endpoint, {
            method: 'DELETE',
            headers: createHeaders(),
        }).then(response => response.json());
    }
}

function createHeaders() {
    var headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    // uncomment whenever vue-cookies gets installed (i'm lazy)
    /* if ($cookies.get('token')) {
        headers.Authorization = $cookies.get('token');
    } */

    return headers;
}