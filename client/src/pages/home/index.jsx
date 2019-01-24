// @flow
import React, { Component } from 'react'

import styles from './styles.css'

export default class Home extends Component<*, *> {
  render() {
    return <div className={styles.hello}>Hello {this.props.user.email}!</div>
  }
}
