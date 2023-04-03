import { DeedModel } from '@/models/deed.model'
import { ApiHelper } from '@/core/api'

export default (api: ApiHelper) => ({
  getAllDeeds: async () => {
    return api.get<DeedModel[]>('deeds')
  },

  createDeed: async (title: string) => {
    return api.post<DeedModel>('deeds', {
      data: {
        title,
      },
    })
  },

  updateDeed: async (id: string, title: string) => {
    return api.patch<DeedModel>(`deeds/${id}`, {
      data: {
        title,
      },
    })
  },

  deleteDeed: async (id: string) => {
    return api.delete<void>(`deeds/${id}`)
  },

})