import { fromJS } from 'immutable'

export const types = {
  LOAD_BANNERS: 'home/heroBanner/LOAD_BANNERS',
  LOAD_BANNERS_SUCCESS: 'home/heroBanner/LOAD_BANNERS_SUCCESS',
  LOAD_BANNERS_FAIL: 'home/heroBanner/LOAD_BANNERS_FAIL',
}

const initialStates = fromJS({
  banners: []
})

export default function reducer(state = initialStates, action) {
  switch(action.type) {
    case types.LOAD_BANNERS:
      return state
    case types.LOAD_BANNERS_SUCCESS:
      return state
        .set('banners', fromJS(action.payload.banners || []))
    case types.LOAD_BANNERS_FAIL:
      return state
    default:
      return state
  }
}


export const actions = {
  loadBanners: () => ({
    type: types.LOAD_BANNERS,
  }),
  loadBannersSuccess: (banners = []) => ({
    type: types.LOAD_BANNERS_SUCCESS,
    payload: {
      banners
    }
  }),
  loadBannersFail: () => ({
    type: types.LOAD_BANNERS_FAIL,
  })
}

export const selectors = {
  getBanners: state => state.getIn([ 'home', 'heroBanner', 'banners' ]).toJS()
}
