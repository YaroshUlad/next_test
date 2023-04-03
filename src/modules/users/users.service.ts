import { ApiHelper } from '@/core/api'
import { UserModel } from '@/models/user.model'

export default (api: ApiHelper) => ({
  getAll: async () => {
    return api.get<UserModel[]>('users')
  },

  getUserById: async (id: string) => {
    return api.get<UserModel>(`users/${id}`)
  },

  updateUsername: async (username: string) => {
    return api.get<UserModel>('auth/profile', {data: {username}})
  },

})