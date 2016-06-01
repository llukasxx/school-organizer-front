import { createSelector } from 'reselect'

const getMessages = (state) => {
  return state.entities.messages
}
const getConversations = (state) => {
  return state.entities.conversations
}
const getSentConversations = (state) => {
  const currentUserId = localStorage.getItem('currentUserId')
  const { conversations, messages } = state.entities
  let sentbox = []
  Object.keys(conversations).map((id) => {
    let firstMessageId = conversations[id].messages[0]
    if(messages[firstMessageId].sender.id == currentUserId) {
      sentbox.push(conversations[id])
    }
  })
  return sentbox
}
const getConversationMessagesArray = (state, props) => {
  let conversationMessages = []
  const { messages } = state.entities 
  Object.keys(messages).map((id) => {
    if(messages[id].conversationId == props.conversation.id) {
      conversationMessages.push(messages[id])
    }
  })
  return conversationMessages
}
const getFirstMessageReceiver = (state, props) => {
  const { messages, receivers, receipts } = state.entities
  const firstMessageId = props.conversation.messages[0]
  const receiptsIds = messages[firstMessageId].receipts
  let receiver = ""
  receiptsIds.map((id) => {
    if(receipts[id].mailboxType == 'inbox') {
      receiver = receivers[receipts[id].receiver]
    } else {
      return false
    }
  })
  return receiver

}
export const inboxMessagesArraySelector = createSelector(
  [getMessages],
  (messages) => {
    let inboxMessages = []
    const currentUserId = localStorage.getItem('currentUserId')
    Object.keys(messages).map((id) =>{
      if(String(messages[id].sender.id) != currentUserId) {
        inboxMessages.push(messages[id])
      }
    })
    return inboxMessages
  }
)

export const inboxConversationsArraySelector = createSelector(
  [getConversations],
  (conversations) => {
    let inboxConversations = []
    Object.keys(conversations).map((id) => {
      inboxConversations.push(conversations[id])
    })
    return inboxConversations
  }
)

export const conversationMessagesArraySelector = createSelector(
  [getConversationMessagesArray],
  messages => messages
)

export const sentConversationsArraySelector = createSelector(
  [getSentConversations],
  conversations => conversations
)

export const firstMessageReceiverSelector = createSelector(
  [getFirstMessageReceiver],
  receiver => receiver
)