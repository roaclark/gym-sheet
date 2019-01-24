// @flow
import React, { Component } from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import { withIdentity } from './components/IdentityWrapper'
import Home from './pages/home'
import Login from './pages/Login'

export default class App extends Component<{}> {
  render() {
    return (
      <Router>
        <div>
          <CssBaseline />
          <Route path="/" exact component={withIdentity('Home', Home)} />
          <Route path="/login" exact component={withIdentity('Login', Login)} />
        </div>
      </Router>
    )
  }
}

const root = document.getElementById('app')
if (root) {
  render(<App />, root)
}
