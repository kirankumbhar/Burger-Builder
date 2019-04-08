import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-587d0.firebaseio.com/'
});

export default instance;