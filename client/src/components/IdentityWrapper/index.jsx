// @flow
import React, { Component, Fragment } from 'react'

import NavBar from '../NavBar'

type StateType = {
  loadingIdentity: boolean,
  user: ?{
    id: number,
    email: string,
  },
}

export const withIdentity = (pageName: string, PageComponent: *) =>
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

    render() {
      const { loadingIdentity, user } = this.state

      return (
        <Fragment>
          <NavBar
            pageName={pageName}
            user={user}
            loadingIdentity={loadingIdentity}
          />
          {loadingIdentity ? (
            <div>Loading...</div>
          ) : (
            <PageComponent user={user} {...this.props} />
          )}
        </Fragment>
      )
    }
  }
