import { createAsyncThunk } from '@reduxjs/toolkit'

import { ApiHelper, IApiErrorResponse } from '@/core/api'
import { DeedModel } from '@/models/deed.model'

const api = ApiHelper.getInstance()

export const fetchAllDeeds = createAsyncThunk<DeedModel[], void, { rejectValue: IApiErrorResponse }>('deeds/fetchAllDeeds', async (_, thunkAPI) => {
  try {
    const { data } = await api.services.deeds.getAllDeeds()

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue(api.resolveError(e))
  }
})

export const createDeed = createAsyncThunk<DeedModel, string, { rejectValue: IApiErrorResponse }>('deeds/createDeed', async (title, thunkAPI) => {
  try {
    const { data } = await api.services.deeds.createDeed(title)
    thunkAPI.dispatch(fetchAllDeeds())

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue(api.resolveError(e))
  }
})


export const updateDeed = createAsyncThunk<DeedModel, UpdateDeedDTO, { rejectValue: IApiErrorResponse }>('deeds/updateDeed', async (attr, thunkAPI) => {
  try {
    const { id, title } = attr
    const { data } = await api.services.deeds.updateDeed(id, title)
    thunkAPI.dispatch(fetchAllDeeds())

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue(api.resolveError(e))
  }
})

export const deleteDeed = createAsyncThunk<void, string, { rejectValue: IApiErrorResponse }>('deeds/deleteDeed', async (id, thunkAPI) => {
  try {
    const { data } = await api.services.deeds.deleteDeed(id)
    thunkAPI.dispatch(fetchAllDeeds())

    return data
  } catch (e) {
    return thunkAPI.rejectWithValue(api.resolveError(e))
  }
})

interface UpdateDeedDTO {
  id: string,
  title: string
}
