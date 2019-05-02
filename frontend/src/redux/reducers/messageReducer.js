// import socket from '../actions/socket'

import { 
    ALL_MESSAGES, 
    ALL_MESSAGES_ERROR, 
    CREATE_MESSAGE, 
    CREATE_MESSAGE_ERROR } from '../constants/messages';

var initialState = {
    name: '',
    message: '',
    messageArray: [],

    errorAll: null,
    errorCreate: null,
    errorMessageAll: '',
    errorMessageCreate: ''
}

export default (state = initialState, action) => {
    const updated = Object.assign({}, state)

    switch(action.type) {
        case ALL_MESSAGES:           
            updated.name = action.payload.name
            updated.messageArray = action.payload.messages
            return updated;

        case ALL_MESSAGES_ERROR:
            updated.errorAll = true           
            updated.errorMessageAll = 'No messages found'          
            return updated;

        case CREATE_MESSAGE:
            updated.messageArray.push(action.payload)
            // socket && socket.emit('SEND_MESSAGE', updated);
            return updated;

        case CREATE_MESSAGE_ERROR:
            updated.errorCreate = true
            updated.errorMessageCreate = 'Sorry, unable to send message'
            return updated;

        default: 
            return state
    } 
}