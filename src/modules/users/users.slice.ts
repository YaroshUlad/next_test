import { APIStatus, IApiErrorResponse } from '@/core/api'
import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { UserModel } from '@/models/user.model'
import { fetchAllUsers, fetchById, updateUsername } from '@/modules/users/users.actions'

interface IUsersData {
  users: UserModel[]
  user: UserModel | null
}

interface IUsersState {
  users: {
    status: APIStatus
    data: IUsersData
    error: IApiErrorResponse | null
  }
}

const initialState: IUsersState = {
  users: {
    status: APIStatus.IDLE,
    data: {
      user: null,
      users: [],
    },
    error: null,
  },
}

export const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
        state.users.status = APIStatus.FULFILLED
        state.users.data.users = payload
      })

      .addMatcher(isAnyOf(fetchById.fulfilled, updateUsername.fulfilled),
        (state, { payload }) => {
          state.users.status = APIStatus.FULFILLED
          state.users.data.user = payload
        },
      )

      .addMatcher(isAnyOf(fetchAllUsers.rejected, fetchById.rejected, updateUsername.rejected),
        (state, { payload }) => {
          state.users.status = APIStatus.REJECTED
          if (payload) state.users.error = payload
        },
      )

      .addMatcher(isAnyOf(fetchAllUsers.pending, fetchById.pending, updateUsername.pending),
        (state) => {
          state.users.status = APIStatus.PENDING
        },
      )
  },
})

// export const {} = UsersSlice.actions