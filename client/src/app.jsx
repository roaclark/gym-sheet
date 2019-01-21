// @flow
import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './pages/home'
import './styles.css'

export default class App extends Component<*, *> {
  async componentDidMount() {
    const response = await fetch('api')
    const message = response.ok
      ? await response.text()
      : 'The server is sad. :('
    this.setState({ text: message })
  }

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
