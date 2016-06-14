import axios from 'axios'
import { ROOT_URL } from '../ApiConfig'
import {toastr} from 'react-redux-toastr'
import { normalize, Schema, arrayOf } from 'normalizr'
import { camelizeKeys } from 'humps'

// Constants
// export const constants = { }
export const START_INBOX_FETCH = 'school-organizer/messages/START_INBOX_FETCH'
export const FINISH_INBOX_FETCH = 'school-organizer/messages/FINISH_INBOX_FETCH'
export const FETCH_CONVERSATION = 'school-organizer/messages/FETCH_CONVERSATION'
// Action Creators
// export const actions = { }
export const getConversations = () => {
  return function(dispatch) {
    dispatch({ type: START_INBOX_FETCH })
    axios.get(`${ROOT_URL}/api/v1/conversations/get_conversations`, { 
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(function(response) {
        let camelized = camelizeKeys(response.data)
        let normalized = normalize(camelized, { 
          conversations: arrayOf(conversation)
        })
        dispatch({type: FINISH_INBOX_FETCH, response: normalized})
      })
      .catch(function(response) {
        toastr.warning('Warning', 'Something bad happened')
      })
  }
}

// Reply to conversation
export const replyToConversation = (newConversation) => {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/v1/conversations/reply/${newConversation.id}`, newConversation, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(function(response) {
        const camelized = camelizeKeys(response.data)
        const normalizedResponse = normalize(camelized, { conversation: conversation })
        dispatch({type: FETCH_CONVERSATION, response: normalizedResponse})
        toastr.success('Message', 'Has been successfully sent.')
      })
      .catch(function(response) {
        toastr.warning('Warning', 'Something bad happened')
      })
  }
}
export const startNewConversation = (newConversation) => {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/v1/conversations/reply`, newConversation, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(function(response) {
        const camelized = camelizeKeys(response.data)
        const normalizedResponse = normalize(camelized, { conversation: conversation })
        dispatch({type: FETCH_CONVERSATION, response: normalizedResponse})
        toastr.success('Message', 'Has been successfully sent.')
      })
      .catch(function(response) {
        toastr.warning('Warning', 'Something bad happened')
      })
  }
}

export const startNewBroadcastConversation = (newConversation) => {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/v1/conversations/new_broadcast_conversation`, newConversation, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(function(response) {
        console.log(response)
        const camelized = camelizeKeys(response.data)
        const normalizedResponse = normalize(camelized, { conversation: conversation })
        dispatch({type: FETCH_CONVERSATION, response: normalizedResponse})
        toastr.success('Message', 'Has been successfully sent.')
      })
      .catch(function(response) {
        toastr.warning('Warning', 'Something bad happened')
      })
  }
}
// Reducer
export const initialState = {}
export default function (state = initialState, action) {
  switch (action.type) {
    case START_INBOX_FETCH:
      return {...state, loaded: false}
    case FINISH_INBOX_FETCH:
      return {...state, loaded: true}
    default:
      return state
  }
}

// schemas
const conversation = new Schema('conversations')
const message = new Schema('messages')
const receipt = new Schema('receipts')
const receiver = new Schema('receivers')


conversation.define({
  messages: arrayOf(message)
})

message.define({
  receipts: arrayOf(receipt),
})

receipt.define({
  receiver: receiver
})

receiver.define({

})