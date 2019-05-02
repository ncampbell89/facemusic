import axios from 'axios';

const Axios = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 3600000 // 1 hour
    // timeout: 2000
});

export default Axios;