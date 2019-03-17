import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-movies-76e76.firebaseio.com/'
});

export default instance;