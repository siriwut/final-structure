import { combineReducers } from 'redux-immutable'
import * as heroBanner from './heroBannerReducer'

export { heroBanner }

export default combineReducers({
  heroBanner: heroBanner.default
})
