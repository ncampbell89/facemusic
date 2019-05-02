import Axios from './Axios/Axios';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthJWT from './Axios/setAuthJWT';

import { 
    ALL_USERS,
    USER_ID,
    ON_SUCCESS,

    LOG_IN_CHECK, 
    LOG_OUT,

    PROFILE_PIC,
    MAIN_PIC,

    FRIEND_REQUESTS,
    FRIEND_REQUEST_LIST,
    DECLINE_REQUEST,
    CANCEL_REQUEST,

    PENDING_REQUESTS,
    PENDING_REQUEST_LIST,

    OTHER_PROFILE,

    FRIENDS,
    FRIENDS_LIST,

    DELETE_ACCOUNT} from '../constants/auth';

const jwt = require('jwt-simple');

export const allusersapi = (obj, resultStr) => dispatch => {
    
    Axios.get(`/users/allusers`)
    .then(result => {   
        dispatch({
            type: ALL_USERS,
            keyword: resultStr,
            payload: result.data
        })
    })
    .catch(err => {
        console.log(JSON.stringify(err))
    })

}

export const userIdAndName = () => dispatch => {
    const token = localStorage.getItem('jwtToken')
    const decoded = jwt_decode(token)

    dispatch({
        type: USER_ID,
        payload: decoded
    })
}

export const logoutapi = () => dispatch => {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('spotifyBearerToken')
    setAuthJWT(null)

    dispatch({
        type: LOG_OUT
    })
}

export const deleteaccount = () => dispatch => {
    const token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token)

    Axios.delete(`/users/deleteaccount/${decoded.id}`)
    .then(result => {
        console.log(result)

        localStorage.removeItem('jwtToken')

        dispatch({
            type: DELETE_ACCOUNT,
            payload: result.data
        })

    })
    .catch(err => {
        console.log(JSON.stringify(err))
    })

}

export const onSuccessapi = (response) => dispatch => {

    axios.get(`https://api.spotify.com/v1/me`, { 
        headers: {
            'Authorization': `Bearer ${response}`
        }
    })
    .then(result => {
        let payload = result.data
        let secret = 'a549535cd6a042e8ae4ccf1e753405a6'

        const token = jwt.encode(payload, secret)
        result.data.token = `Bearer ${token}`;
        localStorage.setItem('jwtToken', token)

        localStorage.setItem('spotifyBearerToken', response)

        dispatch({
            type: ON_SUCCESS,
            resp: payload 
        })
    
        Axios.post(`/users/reglogin`, payload)
        .then(result => console.log(result))
        .catch(err => {
            console.log(JSON.stringify(err))
        })

    })
    .catch(error => {
        console.log(JSON.stringify(error))
    })

}

export const checkIfUserLoggedIn = (decoded) => dispatch => {
    dispatch({
        type: LOG_IN_CHECK,
        payload: decoded
    })
}

export const profilePic = (id, url) => dispatch => {
    console.log(id, url)

    const token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);

    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
    }

    let newObj = {
        picID: id,
        newPic: url,
        id: decoded.id
    }

    Axios.post(`/users/profilepic`, newObj, axiosConfig)
    .then(result => {
        console.log(result)

        dispatch({
            type: PROFILE_PIC,
            payload: result.data.profilePic
        })
    })
    .catch(err => console.log(JSON.stringify(err)))
}

export const profilePicUrls = () => dispatch => {
    const token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);

    Axios.get(`/users/profilepics/${decoded.id}`)
    .then(result => {
        console.log(result)
        dispatch({
            type: MAIN_PIC,
            payload: result.data
        })
    })
    .catch(err => console.log(JSON.stringify(err)))
}


export const friendRequestsApi = (receiverID) => dispatch => {
    const token = localStorage.getItem('jwtToken')
    const decoded = jwt_decode(token)

    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
    }

    let newRequest = {
        sourceID: decoded.id,
        name: decoded.display_name,
        receiverID
    }

    Axios.post(`/users/friendrequests`, newRequest, axiosConfig)
    .then(result => {
        dispatch({
            type: FRIEND_REQUESTS,
            payload: result
        })
    })
    .catch(err => console.log(JSON.stringify(err)))
}

export const allFriendRequestsApi = (id) => dispatch => {

    const token = localStorage.getItem('jwtToken')
    const decoded = jwt_decode(token)

    Axios.get(`/users/allfriendrequests/${decoded.id}`)
    .then(result => {
        let filtered = result.data.friendRequests.filter(item => {
            return item._id !== id ? item : ''
        })

        dispatch({
            type: FRIEND_REQUEST_LIST,
            payload: filtered
        })
    })
    .catch(err => {
        console.log(JSON.stringify(err))
    })
}


export const pendingRequestsApi = (id, name) => dispatch => {
    console.log(id, name)

    const token = localStorage.getItem('jwtToken')
    const decoded = jwt_decode(token)

    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
    }

    let pending = {
        sourceID: decoded.id, name, id
    }

    Axios.post(`/users/pendingrequests`, pending, axiosConfig)
    .then(result => {

        dispatch({
            type: PENDING_REQUESTS,
            payload: result.data.pendingRequests
        })

    })
    .catch(err => console.log(JSON.stringify(err)))

}

export const cancelRequestApi = (id) => dispatch => {
    const token = localStorage.getItem('jwtToken')
    const decoded = jwt_decode(token)

    Axios.delete(`/users/cancelrequest/${decoded.id}?id=${id}&_method=DELETE`)
    .then(result => {
        console.log(result)

        dispatch({
            type: CANCEL_REQUEST,
            payload: result.data
        })
    })
    .catch(err => console.log(JSON.stringify(err)))
}

export const friendsApi = (id, name) => dispatch => {
    console.log('accepted')
    const token = localStorage.getItem('jwtToken')
    const decoded = jwt_decode(token)

    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        }
    }

    let newFriend = {
        id, name, loggedInUser: decoded.id
    }

    Axios.post(`/users/friends`, newFriend, axiosConfig)
    .then(result => {
        console.log(result)
        dispatch({
            type: FRIENDS,
            payload: result.data
        })

        dispatch({
            type: FRIEND_REQUESTS,
            payload: result.data.friendRequests
        })
    })
    .catch(err => {
        console.log(JSON.stringify(err))
    })
}


export const declinedApi = (id) => dispatch => {
    const token = localStorage.getItem('jwtToken')
    const decoded = jwt_decode(token)

    Axios.delete(`/users/deleterequest/${decoded.id}?id=${id}&_method=DELETE`)
    .then(result => {
        console.log(result)

        dispatch({
            type: DECLINE_REQUEST,
            payload: result.data
        })

    })
    .catch(err => console.log(JSON.stringify(err)))
}


export const allFriends = () => dispatch => {
    const token = localStorage.getItem('jwtToken')
    const decoded = jwt_decode(token)

    Axios.get(`/users/allFriends/${decoded.id}`)
    .then(result => {
        console.log(result)
        dispatch({
            type: FRIENDS_LIST,
            payload: result.data
        })
    })
    .catch(err => console.log(JSON.stringify(err)))
}

export const allPendingRequestsApi = () => dispatch => {
    const token = localStorage.getItem('jwtToken')
    const decoded = jwt_decode(token)

    Axios.get(`/users/allpendingrequests/${decoded.id}`)
    .then(result => {
        dispatch({
            type: PENDING_REQUEST_LIST,
            payload: result.data.pendingRequests
        })
    })
    .catch(err => {
        console.log(JSON.stringify(err))
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