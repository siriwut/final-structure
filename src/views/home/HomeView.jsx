import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './HomeView.css'

import HeroBannerContainer from 'modules/home/containers/HeroBannerContainer'

const mapStateToProps = state => ({
  test: state.test
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

class Home extends Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    ctx.store.dispatch({
      type: 'tape'
    })

    return { whatever: 'stuff' }
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
