let currentUrl = 'http://localhost:3000'

process.env.NODE_ENV == "production" ? currentUrl = 'https://school-organizer-back.herokuapp.com' : currentUrl = 'http://localhost:3000'

export const authHeader = {
  headers: { authorization: localStorage.getItem('token') }
}

export const currentUserId = localStorage.getItem('currentUserId')


export const ROOT_URL = currentUrl

