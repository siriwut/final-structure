import { END } from 'redux-saga'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './HomeView.css'

import { heroBanner } from 'modules/home/reducers'
import { HeroBannerContainer } from 'modules/home/containers'


const mapStateToProps = null
const mapDispatchToProps = null

class Home extends Component {
  static async getInitialProps({ store }) {
    store.dispatch(heroBanner.actions.loadBanners())
  }

  render() {
    return (
      <div className="Home">
        <HeroBannerContainer />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
