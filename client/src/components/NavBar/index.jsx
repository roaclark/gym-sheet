// @flow
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import LogoutIcon from '@material-ui/icons/ExitToApp'

import styles from './styles.css'

type PropsType = {
  pageName: string,
}

type StateType = {
  loadingIdentity: boolean,
  user: ?{
    id: number,
    email: string,
  },
}

export default class NavBar extends Component<PropsType, StateType> {
  constructor(props: *) {
    super(props)
    this.state = {
      loadingIdentity: true,
      user: null,
    }
  }

  async componentDidMount() {
    this.fetchUser()
  }

  fetchUser = async () => {
    const token = sessionStorage.getItem('jwtToken')

    if (!token) {
      return this.setState({ loadingIdentity: false, user: null })
    }

    const response = await fetch('api/identity', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    this.setState({
      loadingIdentity: false,
      user: response.ok ? await response.json() : null,
    })
  }

  logout = async () => {
    sessionStorage.removeItem('jwtToken')
    this.fetchUser()
  }

  IdentityBar() {
    const { user } = this.state

    if (user) {
      return (
        <Fragment>
          <Typography color="inherit">{user.email}</Typography>
          <IconButton aria-label="Logout" color="inherit" onClick={this.logout}>
            <LogoutIcon />
          </IconButton>
        </Fragment>
      )
    }

    return (
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
    )
  }

  render() {
    const { pageName } = this.props
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={styles.pageTitle}>
            {pageName}
          </Typography>
          {this.IdentityBar()}
        </Toolbar>
      </AppBar>
    )
  }
}
