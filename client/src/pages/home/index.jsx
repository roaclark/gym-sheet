// @flow
import React, { Component } from 'react'

import styles from './styles.css'

export default class Home extends Component<*, *> {
  constructor(props: *) {
    super(props)
    this.state = {
      text: 'Loading...',
      email: '',
      password: '',
    }
  }

  fetchEmail = async () => {
    const response = await fetch('api/secret')
    const message = response.ok
      ? `Hello ${await response.text()}!`
      : 'No user found. :('
    this.setState({ text: message })
  }

  async componentDidMount() {
    this.fetchEmail()
  }

  onSubmit = async (event: *) => {
    event.preventDefault()
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      this.fetchEmail()
    } else {
      this.setState({ text: 'Login failed' })
    }
  }

  handleInputChange = (event: *) => {
    const { value, name } = event.target
    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <div>
        <div className={styles.hello}>Hello world!</div>
        <div className={styles.helloApi}>
          {this.state.text}
          <form onSubmit={this.onSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  }
}
