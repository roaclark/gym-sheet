// @flow
import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import HomeIcon from '@material-ui/icons/Home'
import IconButton from '@material-ui/core/IconButton'
import LogoutIcon from '@material-ui/icons/ExitToApp'

import styles from './styles.css'

type PropsType = {
  pageName: string,
  loadingIdentity: boolean,
  user: ?{
    id: number,
    email: string,
  },
  onLogout: () => {},
}

type StateType = {
  loggedOut: boolean,
  redirectHome: boolean,
}

export default class NavBar extends Component<PropsType, StateType> {
  constructor(props: *) {
    super(props)
    this.state = {
      loggedOut: false,
      redirectHome: false,
    }
  }

  logout = async () => {
    sessionStorage.removeItem('jwtToken')
    this.setState({ loggedOut: true })
    this.props.onLogout()
  }

  IdentityBar() {
    if (this.state.loggedOut) {
      return <Redirect to="/" />
    }

    const { user } = this.props

    if (user) {
      return (
        <Fragment>
          <Typography color="inherit" className={styles.userEmail}>
            {user.email}
          </Typography>
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
    if (this.state.redirectHome) {
      return <Redirect to="/" />
    }

    const { pageName } = this.props

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            aria-label="Home"
            color="inherit"
            onClick={() => this.setState({ redirectHome: true })}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={styles.pageTitle}>
            {pageName}
          </Typography>
          {this.IdentityBar()}
        </Toolbar>
      </AppBar>
    )
  }
}
