import { 
    ALL_POSTS, 
    ALL_POSTS_ERROR, 

    NEWSFEED,

    ADD_POST,
    ADD_POST_ERROR,
    DELETE_POST,

    ADD_PIC,
    ADD_PIC_ERROR,

    DELETE_PIC,

    EDIT_ABOUT,
    ABOUT_ME,

    COMMENTS,
    ALL_COMMENTS,
    DELETE_COMMENT,
    EDIT_COMMENT,

    ALL_PICS, 
    TOP_NEWS, 
    ALL_TOPICS } from '../constants/updates';

import jwt_decode from 'jwt-decode';
import setAuthJWT from './Axios/setAuthJWT';
import Axios from './Axios/Axios';
import axios from 'axios';
import { API_KEY, API_SECRET, CLOUD_NAME } from './config';

export const postsForNewsfeed = () => dispatch => {
    Axios.get(`/updates/newsfeed`)
    .then(result => {
        dispatch({
            type: NEWSFEED,
            payload: result.data
        })
    })
    .catch(err => {
        console.log(JSON.stringify(err))
    })
}

// FOR PROFILE PAGE
export const getAllPosts = () => dispatch => {
    const token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token)
    setAuthJWT(token);

    Axios.get(`/updates/allposts/${decoded.id}`)
    .then(result => {
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

    Axios.get(`/users/profilepicurl/${decoded.id}`)
    .then(result => {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
    
        let newPost = {
            id: decoded.id,
            name: decoded.display_name,
            profilePic: result.data.profilePic,
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

    })
    .catch(err => console.log(JSON.stringify(err)))
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
    formData.append('upload_preset', 'wgu7exst');

    axios({
      url: `https://${API_KEY}:${API_SECRET}@api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      method: 'POST',
      headers: {
        'Content-Type': 'applcation/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*'
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
    .catch(err => console.log(JSON.stringify(err)))

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

export const aboutEditApi = (current) => dispatch => {

    const token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);

    let newState = {
        desc: current
    }

    Axios.put(`/updates/editabout/${decoded.id}?_method=PUT`, newState)
    .then(result => {
        console.log(result)
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
        console.log(result)
        dispatch({
            type: ABOUT_ME,
            payload: result.data.about
        })
    })
    .catch(err => {
        console.log(JSON.stringify(err))
    })
}

export const addComment = (comm, id) => dispatch => {
    console.log(comm)
    const token = localStorage.getItem('jwtToken')
    const decoded = jwt_decode(token)

    Axios.get(`/users/profilepicurl/${decoded.id}`)
    .then(result => {

        let newComment = {
            id: decoded.id,
            postid: id,
            name: decoded.display_name,
            picture: result.data.profilePic,
            comment: comm
        }

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            }
        }

        Axios.post(`/updates/comments`, newComment, axiosConfig)
        .then(result => {
            console.log(result)
            dispatch({
                type: COMMENTS,
                id,
                payload: result.data
            })

        })
        .catch(err => {
            console.log(JSON.stringify(err))
        })
    })
    .catch(err => {
        console.log(JSON.stringify(err))
    })


}

export const allComments = () => dispatch => {
    Axios.get(`/updates/allcomments`)
    .then(result => {

        dispatch({
            type: ALL_COMMENTS,
            payload: result.data
        })

    })
    .catch(err => {
        console.log(JSON.stringify(err))
    })
}

export const editComment = (id, currentState) => dispatch => {
    console.log(id, currentState)

    const token = localStorage.getItem('jwtToken')
    const decoded = jwt_decode(token)
    setAuthJWT(token);

    let editedComment = {
        id, currentState
    }

    Axios.put(`/updates/editcomment/${decoded.id}?_method=PUT`, editedComment)
    .then(result => {
        console.log(result)

        dispatch({
            type: EDIT_COMMENT,
            payload: result.data
        })
    })
    .catch(err => {
        console.log(JSON.stringify(err))
    })
}

export const deleteComment = (postID, commID) => dispatch => {
    const token = localStorage.getItem('jwtToken')
    const decoded = jwt_decode(token)

    Axios.delete(`/updates/deletecomment/${decoded.id}?postID=${postID}&commID=${commID}&_method=DELETE`)
    .then(deleted => {
        dispatch({
            type: DELETE_COMMENT,
            payload: deleted.data.comments
        })
    })
    .catch(err => console.log(JSON.stringify(err)))
}