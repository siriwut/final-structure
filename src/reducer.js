import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'

import homeReducer from 'modules/home/reducers'

export default combineReducers({
  home: homeReducer
})
