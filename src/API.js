import React from 'react';
import ReactDOM from 'react-dom';

const credentials = {
    url: 'https://jsonplaceholder.typicode.com'
};

class API extends React.Component{

    constructor(credentials) {
        super();
        this.credentials = credentials;
    }

    jsonParse(response) {
        return response.json();
    }

    wrapInArray(data) {
        if (Array.isArray(data)) {
            return data;
        }

        return [data];
    }

    getPost(id = '') {
        return fetch(`${this.credentials.url}/posts/${id}`)
            .then(this.jsonParse)
            .then(this.wrapInArray);
    }

    statusParse(response) {
        return response.status === 200;
    }

    removePost(id) {
        if (!id) {
            throw new Error('Id required!');
        }

        return fetch(`${this.credentials.url}/posts/${id}`, {
            method: 'DELETE'
        }).then(this.statusParse);
    }


    addPost(data) {
        return fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(this.jsonParse);


    }

    changePost(data, id) {
        return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(this.jsonParse);
    }

    changeField(data, id) {
        return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PATCH',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(this.jsonParse);
    }

}

export default new API(credentials);