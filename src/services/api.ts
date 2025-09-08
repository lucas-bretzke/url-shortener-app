import { http } from './config'

const api = {
  signIn: async (email: string, password: string) => {
    const { data } = await http.post('/auth/login', { email, password })
    return data
  },

  postShortUrl: async (params: IInputLink) => {
    const { data } = await http.post('/shortUrl', { ...params })
    return data
  },

  editShortenedUrl: async (link: ILink) => {
    const { data } = await http.put(`/shortUrl/${link.link_id}`, link)
    return data
  },

  deleteShortUrl: async (id: number) => {
    const { data } = await http.delete(`/shortUrl/${id}`)
    return data
  },

  userShortenedUrls: async (id: number) => {
    const { data } = await http.get(`/shortUrl/${id}`)
    return data
  },

  createUser: async (name: string, email: string, password: string) => {
    const { data } = await http.post('/user', {
      username: name,
      email,
      password
    })
    return data
  },

  checkIfEmailExists: async (email: string) => {
    try {
      const response = await http.get(`/users/email/${email}`)
      return response
    } catch {
      console.log('Success: email not found')
      return null
    }
  }
}

export default api
