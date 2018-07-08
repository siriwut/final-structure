import React, { Component } from 'react'
import { connect, Provider } from 'react-redux'
import { Store } from 'redux'
import configureStore from 'configureStore'


const getOrCreateStore = (initStore, initialState) => {
  // Always make a new store if server
  if (!process.env.BROWSER || typeof window === 'undefined') {
    return initStore(initialState).store
  }

  // Store in global variable if client
  if (!window.__REDUX_STORE__) {
    window.__REDUX_STORE__ = initStore(initialState).store
  }
  console.log(window.__REDUX_STORE__)
  return window.__REDUX_STORE__
}

export default (...args) => (Component) => {
  const ConnectedComponent = connect.apply(null, args)(Component)

  class WithProviderComponent extends Component {
    static async getInitialProps(ctx) {
      let props = {}

      if (typeof ConnectedComponent.getInitialProps === 'function') {
        props = ConnectedComponent.getInitialProps(ctx)
      }

      return {
        ...props
      }
    }

    constructor(props, context) {
      super(props, context)
    }

    render() {
      return (
        <ConnectedComponent { ...this.props } />
      )
    }

  }

  return WithProviderComponent
}
