// @flow

import {
  RESET_PHOTO_DATA,
  SET_PHOTO_DATA,
  CUSTOMIZE_PHOTO,
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
  const { type, data, ...args } = action

  if (type === RESET_PHOTO_DATA) {
    return defaultState
  }

  if (type === SET_PHOTO_DATA) {
    return { ...state, data }
  }

  if (type === CUSTOMIZE_PHOTO) {
    return { ...state, ...args }
  }

  return state
}
