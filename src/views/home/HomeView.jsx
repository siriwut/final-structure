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
    /**
      concern เรื่อง layout ย่่อย
    **/
    return (
      <div className="Home">
          <ProductListLayout
            sidebar={ <HeroBannerContainer /> }
            content={ <TestContainer /> }/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
