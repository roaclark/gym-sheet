// @flow
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

type PropsType = {
  user: ?{
    id: number,
    email: string,
  },
}

type StateType = {
  loggedIn: boolean,
  failedLogin: boolean,
  email: string,
  password: string,
}

export default class Login extends Component<PropsType, StateType> {
  constructor(props: *) {
    super(props)
    this.state = {
      loggedIn: false,
      failedLogin: false,
      email: '',
      password: '',
    }
  }

  onSubmitLogin = async (event: *) => {
    event.preventDefault()
    this.setState({ failedLogin: false })

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
      sessionStorage.setItem('jwtToken', await response.text())
      this.setState({ loggedIn: true })
    } else {
      this.setState({ failedLogin: true })
    }
  }

  handleInputChange = (event: *) => {
    event.preventDefault()
    const { value, name } = event.target
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { loggedIn, failedLogin, email, password } = this.state

    if (this.props.user || loggedIn) {
      return <Redirect to="/" />
    }

    return (
      <div>
        {failedLogin && 'Login failed'}
        <form onSubmit={this.onSubmitLogin}>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={this.handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={this.handleInputChange}
            required
          />
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
}
