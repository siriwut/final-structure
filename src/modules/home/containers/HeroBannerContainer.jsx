import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { heroBanner } from '../reducers'

const mapStateToProps = state => createStructuredSelector({
  banners: heroBanner.selectors.getBanners
})

const mapDispatchToProps = dispatch => bindActionCreators({
  loadBanners: heroBanner.actions.loadBanners
}, dispatch)

export class HeroBannerContainer extends Component {
  render() {
    const { loadBanners } = this.props

    return (
      <div className="hero">
        slideex
        <button onClick={loadBanners}>LOAD MORE</button>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeroBannerContainer)
