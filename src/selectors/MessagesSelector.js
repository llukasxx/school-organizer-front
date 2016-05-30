import { createSelector } from 'reselect'

const getMessages = (state) => {
  return state.entities.messages
}
const getConversations = (state) => {
  return state.entities.conversations
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