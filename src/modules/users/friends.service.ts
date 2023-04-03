// import { UserModel } from '@/models/user.model'
import { ApiHelper } from '@/core/api'

export default (api: ApiHelper) => ({
  addFriend: async (friendId: string) => {
    return api.patch<void>('friends', { data: { friendId } })
  },

  removeFriend: async (friendId: string) => {
    return api.delete<void>('friends', { data: { friendId } })
  },
})