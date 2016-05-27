import { createSelector } from 'reselect'

const getMessages = (state) => {
  return state.entities.messages
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