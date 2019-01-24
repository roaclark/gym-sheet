// @flow
import React, { Component } from 'react'

import styles from './styles.css'

export default class Home extends Component<*, *> {
  constructor(props: *) {
    super(props)
    this.state = {
      text: 'Loading...',
    }
  }

  fetchEmail = async () => {
    const token = sessionStorage.getItem('jwtToken') || ''
    const response = await fetch('api/identity', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const message = response.ok
      ? `Hello ${(await response.json()).email}!`
      : 'No user found. :('
    this.setState({ text: message })
  }

  async componentDidMount() {
    this.fetchEmail()
  }

  render() {
    return <div className={styles.hello}>{this.state.text}</div>
  }
}
