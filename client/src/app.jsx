// @flow
import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import NavBar from './components/NavBar'
import Home from './pages/home'

export default class App extends Component<{}> {
  render() {
    return (
      <Router>
        <div>
          <CssBaseline />
          <NavBar pageName="Gym sheet" />
          <Route path="/" exact component={Home} />
        </div>
      </Router>
    )
  }
}

const root = document.getElementById('app')
if (root) {
  render(<App />, root)
}
