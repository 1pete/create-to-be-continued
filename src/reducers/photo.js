// @flow

type Photo = {
  data: ?string,
}

const defaultState: Photo = {
  data: null,
}

export default (state: Photo = defaultState) => {
  return state
}
