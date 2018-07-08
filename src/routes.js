import React from 'react'

import { asyncComponent } from '@jaredpalmer/after'

import HomeView from 'views/home/HomeView'

export default [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () => import('views/home/HomeView'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    })
  }
]
