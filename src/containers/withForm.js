import React from 'react'
import { connect, PromiseState } from 'react-refetch'
import { withFormik } from 'formik'
import { withRouter } from 'react-router-dom'
import api from 'services/api';
import { UserContext } from 'services/user-context'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default (WrappedComponent, props) => {
  const { submitUrl, ...formikSettings } = props
  const Form = withRouter(withFormik({
    ...formikSettings,
  })(WrappedComponent))
  class WithForm extends React.Component {
    sendRequest = ({ url, values = {}, setSubmitting, setErrors }) => {
      return api.post(url, values)
        .then((res) => {
          setSubmitting(false)
          return Promise.resolve(res)
        })
        .catch((err) => {
          console.log(err.validation)
          if (err.validation) {
            setErrors(err.validation)
          }
          setSubmitting(false)
          return Promise.reject(err)
        });
    }
    render() {
      return (
        <UserContext.Consumer>
          {user => (
            <Form {...user} sendRequest={this.sendRequest} />
          )}
        </UserContext.Consumer>
      )
    }
  }
  WithForm.displayName = `WithForm(${getDisplayName(WrappedComponent)})`;
  return WithForm
}