import { ApiHelper } from '@/core/api'

export interface ILoginResponse {
  accessToken: string
}

export interface IProfileResponse {
  username: string
  sub: string
}

export default (api: ApiHelper) => ({
  login: async (username: string, password: string) => {
    return api.post<ILoginResponse>('auth/login', { data: { username, password } })
  },

  signup: async (username: string, password: string, tag?: string) => {
    return api.post<ILoginResponse>('auth/signup', { data: { username, password, tag } })
  },

  profile: async () => {
    return api.get<IProfileResponse>('auth/profile', )
  },

})
