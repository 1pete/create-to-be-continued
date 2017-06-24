export const RESET_PHOTO_DATA = 'RESET_PHOTO_DATA'
export const SET_PHOTO_DATA = 'SET_PHOTO_DATA'
export const CUSTOMIZE_PHOTO = 'CUSTOMIZE_PHOTO'

export const resetPhotoData = () => ({
  type: RESET_PHOTO_DATA,
})

export const setPhotoData = data => ({
  type: SET_PHOTO_DATA,
  data,
})

export const customizePhoto = (prop, value) => ({
  type: CUSTOMIZE_PHOTO,
  [prop]: value,
})
