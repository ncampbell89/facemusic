import axios from 'axios';

const Axios = axios.create({
    baseURL: 'https://www.facespotifymusic.com:3001',
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    timeout: 3600000 // 1 hour
});

export default Axios;
