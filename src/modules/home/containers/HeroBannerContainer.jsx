import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { heroBanner } from '../reducers'

const mapStateToProps = state => createStructuredSelector({
  banners: heroBanner.selectors.getBanners
})

const mapDispatchToProps = null

export class HeroBannerContainer extends Component {
  render() {
    return (
      <div>slidee</div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeroBannerContainer)
