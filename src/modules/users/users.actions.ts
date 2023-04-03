import { createAsyncThunk } from '@reduxjs/toolkit'

import { ApiHelper, IApiErrorResponse } from '@/core/api'
import { UserModel } from '@/models/user.model'
import { userInfo } from '@/modules/auth/auth.actions'

const api = ApiHelper.getInstance()

export const fetchAllUsers = createAsyncThunk<UserModel[], void, { rejectValue: IApiErrorResponse }>('users/fetchAllUsers', async (_, thunkAPI) => {
  try {
    const { data } = await api.services.users.getAll()

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue(api.resolveError(e))
  }
})

export const fetchById = createAsyncThunk<UserModel, string, { rejectValue: IApiErrorResponse }>('users/fetchById', async (id, thunkAPI) => {
  try {
    const { data } = await api.services.users.getUserById(id)

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue(api.resolveError(e))
  }
})

export const updateUsername = createAsyncThunk<UserModel, UpdateUsernameDTO, { rejectValue: IApiErrorResponse }>('users/updateUsername', async (attr, thunkAPI) => {
  try {
    const { username } = attr
    const { data } = await api.services.users.updateUsername(username)

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue(api.resolveError(e))
  }
})

export const addFriend = createAsyncThunk<void, { userId: string, friendId: string }, { rejectValue: IApiErrorResponse }>('users/addFriend', async (attr, thunkAPI) => {
  try {
    const {userId, friendId} = attr
    const { data } = await api.services.friends.addFriend(friendId)
    thunkAPI.dispatch(userInfo(userId))

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue(api.resolveError(e))
  }
})

export const removeFriend = createAsyncThunk<void, { userId: string, friendId: string }, { rejectValue: IApiErrorResponse }>('users/removeFriend', async (attr, thunkAPI) => {
  try {
    const {userId, friendId} = attr
    const { data } = await api.services.friends.removeFriend(friendId)
    thunkAPI.dispatch(userInfo(userId))

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue(api.resolveError(e))
  }
})


export interface UpdateUsernameDTO {
  username: string
}