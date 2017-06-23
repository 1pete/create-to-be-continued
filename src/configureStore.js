import { createStore } from 'redux'

import reducers from './reducers'

export default function configureStore() {
  const store = createStore(reducers)

  if (__DEV__ && module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(reducers),
    )
  }

  return store
}
