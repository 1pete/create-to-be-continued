export const RESET_PHOTO_DATA = 'RESET_PHOTO_DATA'
export const SET_PHOTO_DATA = 'SET_PHOTO_DATA'

export const resetPhotoData = () => ({
  type: RESET_PHOTO_DATA,
})

export const setPhotoData = data => ({
  type: SET_PHOTO_DATA,
  data,
})
