import { APIStatus, IApiErrorResponse } from '@/core/api'
import { createSlice, isAnyOf } from '@reduxjs/toolkit'

import { DeedModel } from '@/models/deed.model'
import { deleteDeed, updateDeed, fetchAllDeeds, createDeed } from './deeds.actions'

interface IDeedsData {
  deeds: DeedModel[]
  deed: DeedModel | null
}

interface IDeedsState {
  deeds: {
    status: APIStatus
    data: IDeedsData
    error: IApiErrorResponse | null
  }
}

const initialState: IDeedsState = {
  deeds: {
    status: APIStatus.IDLE,
    data: {
      deed: null,
      deeds: [],
    },
    error: null,
  },
}

export const DeedsSlice = createSlice({
  name: 'deeds',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllDeeds.fulfilled, (state, { payload }) => {
        state.deeds.status = APIStatus.FULFILLED
        state.deeds.data.deeds = payload
      })

      .addMatcher(isAnyOf(createDeed.fulfilled, updateDeed.fulfilled),
        (state, { payload }) => {
          state.deeds.status = APIStatus.FULFILLED
          state.deeds.data.deed = payload
        },
      )

      .addMatcher(isAnyOf(fetchAllDeeds.rejected, updateDeed.rejected, createDeed.rejected,  deleteDeed.rejected),
        (state, { payload }) => {
          state.deeds.status = APIStatus.REJECTED
          if (payload) state.deeds.error = payload
        },
      )

      .addMatcher(isAnyOf(fetchAllDeeds.pending, updateDeed.pending, createDeed.pending, deleteDeed.pending ),
        (state) => {
          state.deeds.status = APIStatus.PENDING
        },
      )
  },
})

// export const {} = UsersSlice.actions