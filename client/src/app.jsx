// @flow
import React, { Component } from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import NavBar from './components/NavBar'
import Home from './pages/home'
import Login from './pages/Login'

export default class App extends Component<{}> {
  render() {
    return (
      <Router>
        <div>
          <CssBaseline />
          <NavBar pageName="Gym sheet" />
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
        </div>
      </Router>
    )
  }
}

const root = document.getElementById('app')
if (root) {
  render(<App />, root)
}
