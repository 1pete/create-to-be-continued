// @flow

import {
  SET_PHOTO_DATA,
} from '../actions/photo'

import type { Photo } from '../types'

const defaultState: Photo = {
  data: null,
  filterColor: '#FFA726',
  filterOpacity: 0.3,
  logoScale: 15,
  logoMarginLeft: 3,
  logoMarginBottom: 3,
}

export default (state: Photo = defaultState, action: any) => {
  const { type, data } = action

  if (type === SET_PHOTO_DATA) {
    return { ...state, data }
  }

  return state
}
