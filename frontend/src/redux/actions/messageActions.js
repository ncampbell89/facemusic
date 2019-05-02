import Axios from './Axios/Axios';
import jwt_decode from 'jwt-decode';
import setAuthJWT from './Axios/setAuthJWT';

import { 
    ALL_MESSAGES, 
    ALL_MESSAGES_ERROR, 
    CREATE_MESSAGE, 
    CREATE_MESSAGE_ERROR } from '../constants/messages';

export const allmessages = () => dispatch => {
    const token = localStorage.getItem('jwtToken')
    const decoded = jwt_decode(token)
    setAuthJWT(token)

    Axios.get(`/messages/allmessages/${decoded.id}`)
    .then(result => {
        dispatch({
            type: ALL_MESSAGES,
            payload: result.data
        })
    })
    .catch(() => {
        dispatch({
            type: ALL_MESSAGES_ERROR
        })
    })
}

export const messagesapi = (data) => dispatch => {
    const token = localStorage.getItem('jwtToken')
    const decoded = jwt_decode(token)
    setAuthJWT(token)

    // create axiosConfig since its a post
    const axiosConfig = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

     // make an object of what will be added
    var newMsg = {
        id: decoded.id,
        data         
    }

    Axios.post(`/messages/createmessage/${decoded.id}`, newMsg, axiosConfig)
    .then(result => {
        dispatch({
            type: CREATE_MESSAGE,
            payload: result.data
        })
    })
    .catch(() => {
        dispatch({
            type: CREATE_MESSAGE_ERROR
        })
    })
}