import { Context, createWrapper, HYDRATE } from 'next-redux-wrapper'
import { GetServerSidePropsContext, NextPageContext } from 'next'
import { AppContext } from 'next/app'

import {
  configureStore,
  createAction,
  ImmutableStateInvariantMiddlewareOptions,
  SerializableStateInvariantMiddlewareOptions,
} from '@reduxjs/toolkit'
import { AuthSlice } from '@/modules/auth/auth.slice'
import { UsersSlice } from '@/modules/users/users.slice'
import { DeedsSlice } from '@/modules/deeds/deeds.slice'

export interface ExtraArgument {
  ctx: NonNullable<NextPageContext | GetServerSidePropsContext>
}

interface ThunkOptions<E> {
  extraArgument: E
}

interface GetDefaultMiddlewareOptions {
  thunk?: boolean | ThunkOptions<ExtraArgument>
  immutableCheck?: boolean | ImmutableStateInvariantMiddlewareOptions
  serializableCheck?: boolean | SerializableStateInvariantMiddlewareOptions
}

export const hydrate = createAction<AppState>(HYDRATE)

const api = {
  reducer: {
    auth: AuthSlice.reducer,
    users: UsersSlice.reducer,
    deeds: DeedsSlice.reducer,
  },
  middleware: [],
}

export const makeStore = (context: Context) => {
  const appContext = context as AppContext
  const pageContext = context as NextPageContext | GetServerSidePropsContext
  const ctx = appContext.ctx || pageContext

  const extraArgument = { ctx } as ExtraArgument
  const options = { thunk: { extraArgument } }

  return configureStore({
    reducer: api.reducer,
    middleware: (gDM) => gDM<GetDefaultMiddlewareOptions>(options).concat(...api.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false })