import { APIStatus, IApiErrorResponse } from '@/core/api'
import { IProfileResponse } from '@/modules/auth/auth.service'
import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'
import { login, profile, signup, userInfo} from '@/modules/auth/auth.actions'
import { UserModel } from '@/models/user.model'

export interface IAuthData {
  accessToken: string | null
  profile: IProfileResponse | null
  userInfo: UserModel | null
}

interface IAuthState {
  auth: {
    status: APIStatus
    data: IAuthData
    error: IApiErrorResponse | null
  }
}

const initialState: IAuthState = {
  auth: {
    status: APIStatus.IDLE,
    data: {
      accessToken: null,
      profile: null,
      userInfo: null
    },
    error: null,
  },
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('accessToken')
      state.auth.data.accessToken = null
      state.auth.data.profile = null
    },
    setUserInfo: (state, action: PayloadAction<UserModel>) => {
      state.auth.data.userInfo = action.payload
      state.auth.status = APIStatus.FULFILLED
    },
  },
  extraReducers: builder => {
    builder
      .addCase(profile.fulfilled, (state, { payload }) => {
        state.auth.status = APIStatus.FULFILLED
        state.auth.data.profile = payload
      })

      // .addCase(userInfo.fulfilled, (state, { payload }) => {
      //   console.log('from Slice', payload)
      //   state.auth.status = APIStatus.FULFILLED
      //   state.auth.data.userInfo = payload
      // })

      .addMatcher(isAnyOf(login.fulfilled, signup.fulfilled),
        (state, { payload }) => {
          state.auth.status = APIStatus.FULFILLED
          state.auth.data.accessToken = payload.accessToken
        },
      )

      .addMatcher(isAnyOf(login.rejected, signup.rejected, profile.rejected, userInfo.rejected),
        (state, { payload }) => {
          state.auth.status = APIStatus.REJECTED
          if (payload) state.auth.error = payload
        },
      )

      .addMatcher(isAnyOf(login.pending, signup.pending, profile.pending, userInfo.pending),
        (state) => {
          state.auth.status = APIStatus.PENDING
        },
      )
  },
})

export const { logout, setUserInfo } = AuthSlice.actions