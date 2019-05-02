import axios from 'axios';
import Axios from './Axios/Axios';
import jwt_decode from 'jwt-decode';
import setAuthJWT from './Axios/setAuthJWT';

import { 
    ALL_GENRES, 
    ALL_GENRES_ERROR,

    ADD_GENRE, 
    ADD_GENRE_ERROR,

    DELETE_GENRE,
    DELETE_GENRE_ERROR,

    SPOTIFY, 
    SPOTIFY_ERROR,

    OTHER_GENRES,

    CHOSEN_LIST,

    PLAYLIST,
    PLAYLIST_ID,
    PLAYLIST_ERROR} from '../constants/genres';

export const getallgenresapi = () => dispatch => {

    const token = localStorage.getItem('jwtToken');       
    const decoded = jwt_decode(token)
    setAuthJWT(token)

    Axios.get(`/genres/allgenres/${decoded.id}`)
    .then(result => {     
        dispatch({
            type: ALL_GENRES,
            payload: result.data.genres
        })      
    })
    .catch(() => {       
        dispatch({
            type: ALL_GENRES_ERROR
        })
    })
    
}

export const addgenresapi = (genreID, genreName) => dispatch => {

    // search the token
    const token = localStorage.getItem('jwtToken');

        // create axiosConfig since its a post
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            }
        }

        const decoded = jwt_decode(token)

        setAuthJWT(token)

        // make an object of what will be added
        let newGenre = {
            id: decoded.id,
            genre: genreName,
            genre_lowercase: genreID          
        }

        // post the new object using axios
        Axios.post(`/genres/creategenre/${decoded.id}`, newGenre, axiosConfig)
        .then(result => {
            dispatch({
                type: ADD_GENRE,
                payload: result.data
            })
        })
        .catch(() => {
            dispatch({
                type: ADD_GENRE_ERROR
            })
        })
}

export const handledeleteapi = (genreID) => dispatch => {

    const token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token)
    setAuthJWT(token)
    
    Axios.delete(`/genres/deletegenre/${decoded.id}?genre=${genreID}&_method=DELETE`)
    .then(del => {
        dispatch({
            type: DELETE_GENRE,
            payload: del.data.genres
        })
    })
    .catch(() => {
        dispatch({
            type: DELETE_GENRE_ERROR
        })
    })

}

export const spotify = () => dispatch => {
    const token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);

    Axios.get(`/genres/getgenres/${decoded.id}`)
    .then(result => {
        dispatch({
            type: SPOTIFY,
            payload: result.data
        })
    })
    .catch(() => {
        dispatch({
            type: SPOTIFY_ERROR
        })
    })
}

export const chosenspotifylist = () => dispatch => {
    const token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);

    Axios.get(`/genres/genreschosen/${decoded.id}`)
    .then(result => {
        dispatch({
            type: CHOSEN_LIST,
            payload: result.data
        })
    })
    .catch(() => {
        dispatch({
            type: ALL_GENRES_ERROR
        })
    })
}

export const playlist = (catID) => dispatch => {
    console.log(catID)
    const spotifyBearerToken = localStorage.getItem('spotifyBearerToken');

    let axiosConfig = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${spotifyBearerToken}`,
            'X-Content-Type-Options': 'nosniff'
        }                               
    }

    // console.log(`https://api.spotify.com/v1/browse/categories/${catID}/playlists`)
  
    axios.get(`https://api.spotify.com/v1/browse/categories/${catID}/playlists`, axiosConfig)
    .then(result => {
        dispatch({
            type: PLAYLIST,
            payload: result.data.playlists
        })
    })
    .catch(error => {
        console.log(JSON.stringify(error))

        // dispatch({
        //     type: PLAYLIST_ERROR,
        //     errMessage: error.response.data.error
        // })
    })
  
}


export const profilePage2 = (id) => dispatch => { 

    if(id !== undefined) {
        Axios.get(`/users/profilegenres/${id}`)
        .then(genres => {
            dispatch({
                type: OTHER_GENRES,
                payload: genres.data
            }) 
        })
        .catch(err => console.log(JSON.stringify(err)))
    }
    
}