import axios from 'axios'
import { ROOT_URL } from '../ApiConfig'
import {toastr} from 'react-redux-toastr'
import { normalize, Schema, arrayOf } from 'normalizr'
import { camelizeKeys } from 'humps'

// Constants
// export const constants = { }
export const START_INBOX_FETCH = 'school-organizer/messages/START_INBOX_FETCH'
export const FINISH_INBOX_FETCH = 'school-organizer/messages/FINISH_INBOX_FETCH'
// Action Creators
// export const actions = { }
export const getInbox = () => {
  return function(dispatch) {
    dispatch({ type: START_INBOX_FETCH })
    axios.get(`${ROOT_URL}/api/v1/conversations/get_inbox`, { 
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(function(response) {
        let camelized = camelizeKeys(response.data)
        let normalized = normalize(camelized, { 
          conversations: arrayOf(conversation)
        })
        console.log(normalized)
        dispatch({type: FINISH_INBOX_FETCH, response: normalized})
      })
      .catch(function(response) {

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
const sender = new Schema('senders')
const receiver = new Schema('receivers')


conversation.define({
  messages: arrayOf(message)
})

message.define({
  receipts: arrayOf(receipt),
  sender: sender
})

receipt.define({
  receiver: receiver
})

sender.define({

})

receiver.define({

})