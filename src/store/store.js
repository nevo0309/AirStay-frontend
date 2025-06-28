import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux'

import { stayReducer } from './stay.reducer'
import { userReducer } from './user.reducer'
import { reviewReducer } from './review.reducer'
import { systemReducer } from './system.reducer'
import { orderReducer } from './order.reducer'

import { filterSyncMiddleware } from '../services/middleware/filterSync.middleware'

const rootReducer = combineReducers({
  stayModule: stayReducer,
  userModule: userReducer,
  systemModule: systemReducer,
  reviewModule: reviewReducer,
  orderModule: orderReducer,
})

/* ------------------------------------------------------------------
 * 2)  Compose DevTools + middleware in one enhancer
 * -----------------------------------------------------------------*/
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(
  applyMiddleware(filterSyncMiddleware) // ← add more inside the same call
  // e.g. applyMiddleware(filterSyncMiddleware, thunk)
)

export const store = createStore(rootReducer, enhancer)

// For debug:
// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })
