// @flow
import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './pages/home'
import './styles.css'

export default class App extends Component<*, *> {
  render() {
    return (
      <Router>
        <div>
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
