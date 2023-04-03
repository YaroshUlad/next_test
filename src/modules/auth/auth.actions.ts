import { createAsyncThunk } from '@reduxjs/toolkit'

import { ApiHelper, IApiErrorResponse } from '@/core/api'
import { ILoginResponse, IProfileResponse } from '@/modules/auth/auth.service'
import { UserModel } from '@/models/user.model'
import { setUserInfo } from '@/modules/auth/auth.slice'

const api = ApiHelper.getInstance()

export const login = createAsyncThunk<ILoginResponse, LoginDTO, { rejectValue: IApiErrorResponse }>('auth/login', async (attr, thunkAPI) => {
  try {
    const { username, password } = attr

    const { data } = await api.services.auth.login(username, password)
    thunkAPI.dispatch(profile())

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue(api.resolveError(e))
  }
})

export const signup = createAsyncThunk<ILoginResponse, SignupDTO, { rejectValue: IApiErrorResponse }>('auth/signup', async (attr, thunkAPI) => {
  try {
    const { username, password, tag } = attr

    const { data } = await api.services.auth.signup(username, password, tag)

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue(api.resolveError(e))
  }
})

export const profile = createAsyncThunk<IProfileResponse, void, { rejectValue: IApiErrorResponse }>('auth/profile', async (_, thunkAPI) => {
  try {

    const { data } = await api.services.auth.profile()

    const { sub: id } = data
    thunkAPI.dispatch(userInfo(id))

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue(api.resolveError(e))
  }
})

export const userInfo = createAsyncThunk<UserModel, string, { rejectValue: IApiErrorResponse }>('auth/userInfo', async (id, thunkAPI) => {
  try {

    const { data } = await api.services.users.getUserById(id)
    console.log("from TC ", data)
    thunkAPI.dispatch(setUserInfo(data))

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue(api.resolveError(e))
  }
})

export interface LoginDTO {
  username: string
  password: string
}

export interface SignupDTO extends LoginDTO {
  tag?: string
}
