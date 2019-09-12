import React, { Component } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { UserContext } from 'services/user-context'
import { SignInPage, SignUpPage, HomePage, ListPage, StreamingPage } from 'components'
import api from 'services/api';

class App extends Component {
  constructor(props) {
    super(props)
    this.setUser = (user) => {
      this.setState(state => ({ user }))
    };
    this.setMessage = (message) => {
      this.setState(state => ({ message }))
    };
    const token = localStorage.getItem('token')
    if (token) {
      api.setToken(token)
    }
    this.state = {
      user: token,
      message: '',
      setUser: this.setUser,
      setMessage: this.setMessage
    };
    this.previousLocation = props.location;
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    let { location } = this.props;
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
    if (nextState.message && !this.state.message) {
      setTimeout(() => this.setMessage(''), 3000)
    }
  }

  render() {
    let { location } = this.props;
    let isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );
    return (
      <UserContext.Provider value={this.state}>
        {this.state.user ? (
          <React.Fragment>
            <Switch location={isModal ? this.previousLocation : location}>
              <Route exact path="/" component={HomePage} />
              <Route path="/list" component={ListPage} />
              <Redirect to="/" />
            </Switch>
            {isModal ? <Route path="/streaming/:id" component={StreamingPage} /> : null}
          </React.Fragment>
        ) : (
            <Switch>
              <Route path="/signin" component={SignInPage} />
              <Route path="/signup" component={SignUpPage} />
              <Redirect to="/signin" />
            </Switch>
          )}
      </UserContext.Provider>
    )
  }
}

export default withRouter(App)
