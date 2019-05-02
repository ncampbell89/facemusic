import { 
    ALL_POSTS, 
    ALL_POSTS_ERROR, 

    ADD_POST,
    ADD_POST_ERROR,
    DELETE_POST,

    ADD_PIC,
    ADD_PIC_ERROR,

    DELETE_PIC,

    EDIT_ABOUT,
    ABOUT_ME,

    OTHER_PROFILE,

    ALL_PICS, 
    TOP_NEWS, 
    ALL_TOPICS } from '../constants/updates';

import jwt_decode from 'jwt-decode';
import setAuthJWT from './Axios/setAuthJWT';
import Axios from './Axios/Axios';
import axios from 'axios';

export const getAllPosts = () => dispatch => {
    const token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);
    setAuthJWT(token);

    Axios.get(`/updates/allposts/${decoded.id}`)
    .then(result => {
        console.log(result)
        dispatch({
            type: ALL_POSTS,
            payload: result.data
        })
    })
    .catch(() => {
        dispatch({
            type: ALL_POSTS_ERROR
        })
    })
}

export const addPostApi = (post, postNews, postPlaylist) => dispatch => {
    const token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);
    setAuthJWT(token)

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }

    let newPost = {
        id: decoded.id,
        name: decoded.display_name,
        newStatus: post,
        newStatusNews: postNews,
        newStatusPlaylist: postPlaylist
    }
    
    Axios.post(`/updates/createpost/${decoded.id}`, newPost, axiosConfig)
    .then(result => {
        dispatch({
            type: ADD_POST,
            name: decoded.display_name,
            payload: result.data
        })
    })
    .catch(() => {
        dispatch({
            type: ADD_POST_ERROR
        })
    })
}

export const deletePostApi = (id) => dispatch => {

    const token = localStorage.getItem('jwtToken')
    const decoded = jwt_decode(token)

    Axios.delete(`/updates/deletepost/${decoded.id}?id=${id}&_method=DELETE`)
    .then(result => {
        dispatch({
            type: DELETE_POST,
            payload: result.data.posts
        })
    })
    .catch(err => {
        console.log(JSON.stringify(err))
    })
}

export const addPictureApi = (event) => dispatch => {
    const token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);
    setAuthJWT(token)

    let file = event.target.files[0];
    let formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'juqba4v3');

    axios({
      url: 'https://api.cloudinary.com/v1_1/dzvtygifz/upload',
      method: 'POST',
      headers: {
          'Content-Type': 'applcation/x-www-form-urlencoded'
      },
      data: formData
    })
    .then(resp => {

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            }
        }

        let newPic = {
            id: decoded.id,
            url: resp.data.secure_url
        }

        Axios.post(`/updates/addpic/${decoded.id}`, newPic, axiosConfig)
        .then(result => {
            dispatch({
                type: ADD_PIC,
                payload: result.data
            })
        })
        .catch(() => {
            dispatch({
                type: ADD_PIC_ERROR
            })
        })
        
    })
    .catch(err => console.log(err))

}

export const deletePictureApi = (id) => dispatch => {
    const token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);
    setAuthJWT(token)

    Axios.delete(`/updates/deletepic/${decoded.id}?picture=${id}&_method=DELETE`)
    .then(result => {
        dispatch({
            type: DELETE_PIC,
            payload: result.data.pictures,
            id
        })
    })
    .catch(err => console.log(JSON.stringify(err)))
}

export const allPicturesApi = () => dispatch => {
    const token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);

    Axios.get(`/updates/allpics/${decoded.id}`)
    .then(result => {
        dispatch({
            type: ALL_PICS,
            payload: result.data
        })
    })
    .catch(err => {
        console.log(JSON.stringify(err))
    })
}

export const topNewsApi = () => dispatch => {
    axios.get(`https://newsapi.org/v2/top-headlines?sources=mtv-news&apiKey=2d2413dbae4f4bf9bcd21fb3f809e579`)
    .then(news => {
        dispatch({
            type: TOP_NEWS,
            payload: news.data.articles
        })

    })
    .catch(err => {
        console.log(err)
    })
}

export const recentNewsApi = () => dispatch => {
    axios.get(`https://newsapi.org/v2/everything?sources=mtv-news&apiKey=2d2413dbae4f4bf9bcd21fb3f809e579`)
    .then(news => {

        dispatch({
            type: ALL_TOPICS,
            payload: news.data.articles
        })
        
    })
    .catch(err => {
        console.log(err)
    })
}

export const profilePage = (id) => dispatch => {
    Axios.get(`/users/profile/${id}`)
    .then(result => {
        dispatch({
            type: OTHER_PROFILE,
            payload: result.data
        })       
    })
    .catch(err => console.log(JSON.stringify(err)))
}

export const aboutEditApi = (current) => dispatch => {

    const token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);

    let newState = {
        desc: current
    }

    Axios.put(`/updates/editabout/${decoded.id}?_method=PUT`, newState)
    .then(result => {
        dispatch({
            type: EDIT_ABOUT,
            payload: result.data.about
        })
    })
    .catch(err => {
        console.log(JSON.stringify(err))
    })

}

export const about = () => dispatch => {
    const token = localStorage.getItem('jwtToken')
    const decoded = jwt_decode(token)

    Axios.get(`/updates/about/${decoded.id}`)
    .then(result => {
        dispatch({
            type: ABOUT_ME,
            payload: result.data.about
        })
    })
    .catch(err => {
        console.log(JSON.stringify(err))
    })
}