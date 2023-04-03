import { GetServerSidePropsContext, NextPageContext } from 'next'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'

import { API_URL } from '@/config'
import AuthService from '@/modules/auth/auth.service'
import UsersService from '@/modules/users/users.service'
import FriendsService from '@/modules/users/friends.service'
import DeedsService from '@/modules/deeds/deeds.service'

type Context = NextPageContext | GetServerSidePropsContext

const INTERNAL_SERVER_ERROR = {
  code: -1,
  msg: 'Internal Server Error',
}

export interface IApiErrorResponse {
  code: number
  msg: string
}

export enum APIStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  FULFILLED = 'FULFILLED',
  REJECTED = 'REJECTED',
}

export class ApiHelper {
  static #instance: ApiHelper | null = null
  #ctx: Context | null = null
  #api: AxiosInstance | null = null

  private constructor() {
    this.#api = axios.create({ baseURL: API_URL })

    this.#api.interceptors.response.use(
      async (config) => {
        console.log(config)
        if (config.data.accessToken) {
          localStorage.setItem('accessToken', config.data.accessToken)
        }
        return config
      },
    )
    this.#api.interceptors.request.use(
      async (config) => {
        const headers = config.headers || {}
        // const ctx = this.getContext()

        const token = localStorage.getItem('accessToken')
        if (token) headers.Authorization = `Bearer ${token}`
        // if (!utils.isWindowAvailable() && ctx) {
        //   const session = await getSession(ctx)
        //   const token = session?.user.accessToken
        //
        //   if (token) headers.Authorization = `Bearer ${token}`
        // } else if (utils.isWindowAvailable()) {
        //   const session = await getSession()
        //   const token = session?.user.accessToken
        //
        //   if (token) headers.Authorization = `Bearer ${token}`
        // }

        config.headers = headers
        return config
      },
      (error) => Promise.reject(error),
    )
  }

  static getInstance() {
    if ( !ApiHelper.#instance) ApiHelper.#instance = new ApiHelper()

    return ApiHelper.#instance
  }

  setContext(ctx: Context) {
    this.#ctx = ctx
  }

  getContext() {
    return this.#ctx
  }

  // async getTokenFromSession() {
  //   if (!utils.isWindowAvailable() && this.#ctx) {
  //     const session = await getSession(this.#ctx)
  //     const token = session?.user.accessToken
  //
  //     return token || null
  //   } else if (utils.isWindowAvailable()) {
  //     const session = await getSession()
  //     const token = session?.user.accessToken
  //
  //     return token || null
  //   }
  //
  //   return null
  // }

  // getTokenFromCookie() {
  //   const cookies = parseCookies()
  //   return cookies['itvToken'] || null
  // }

  request<T>(args: AxiosRequestConfig) {
    if ( !this.#api) throw new Error('API is not defined')

    return this.#api.request<T>(args)
  }

  post<T>(url: string, args: Omit<AxiosRequestConfig, 'method'> = {}) {
    return this.request<T>({ url, method: 'POST', ...args })
  }

  patch<T>(url: string, args: Omit<AxiosRequestConfig, 'method'> = {}) {
    return this.request<T>({ url, method: 'PATCH', ...args })
  }

  delete<T>(url: string, args: Omit<AxiosRequestConfig, 'method'> = {}) {
    return this.request<T>({ url, method: 'DELETE', ...args })
  }

  get<T>(url: string, args: Omit<AxiosRequestConfig, 'method'> = {}) {
    return this.request<T>({ url, method: 'GET', ...args })
  }

  get services() {
    return {
      auth: AuthService(this),
      users: UsersService(this),
      friends: FriendsService(this),
      deeds: DeedsService(this),
    }
  }

  resolveError(e: unknown): IApiErrorResponse {
    if (axios.isAxiosError(e)) {
      const error = e as AxiosError<IApiErrorResponse>
      const response = error.response as AxiosResponse<IApiErrorResponse>
      return response.data || INTERNAL_SERVER_ERROR
    }

    return INTERNAL_SERVER_ERROR
  }
}
