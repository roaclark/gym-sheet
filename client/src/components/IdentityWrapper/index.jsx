// @flow
import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import NavBar from '../NavBar'

type StateType = {
  loadingIdentity: boolean,
  user: ?{
    id: number,
    email: string,
  },
}

export const withIdentity = (
  pageName: string,
  PageComponent: *,
  authRequired: boolean,
) =>
  class IdentityWrapper extends Component<*, StateType> {
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
      this.setState({ loadingIdentity: true })

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

    PageContent() {
      const { loadingIdentity, user } = this.state

      if (loadingIdentity) {
        return <div>Loading...</div>
      }

      if (authRequired && !user) {
        return <Redirect to="/login" />
      }

      return <PageComponent user={user} {...this.props} />
    }

    render() {
      const { loadingIdentity, user } = this.state

      return (
        <Fragment>
          <NavBar
            pageName={pageName}
            user={user}
            loadingIdentity={loadingIdentity}
            onLogout={this.fetchUser}
          />
          {this.PageContent()}
        </Fragment>
      )
    }
  }
