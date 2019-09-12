import React from 'react'

export const UserContext = React.createContext({
  user: null,
  message: '',
  setUser: () => { },
  setMessage: () => { }
});

export default WrappedComponent => (props) => (
  <UserContext.Consumer>
    {user => (
      <WrappedComponent {...user} {...props} />
    )}
  </UserContext.Consumer>
)