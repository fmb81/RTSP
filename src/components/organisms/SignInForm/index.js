import React from 'react'
import { Form, Field } from 'formik'
import { object, string } from 'yup'
import api from 'services/api'
import { withForm } from 'containers'
import { FormikField, Button, Link, FormTemplate } from 'components'

export const SignInForm = ({ isSubmitting, ...props }) => {
  return (
    <FormTemplate>
      <Field label="Email" type="email" name="email" component={FormikField} />
      <Field label="Password" type="password" name="password" component={FormikField} />
      <Button fullWidth type="submit" disabled={isSubmitting}>Sign In</Button>
      <Link to="/signup">Create account</Link>
    </FormTemplate>
  )
}

export default withForm(SignInForm, {
  validationSchema: object().shape({
    email: string().required('Required field'),
    password: string().required('Required field'),
  }),
  mapPropsToValues: () => ({
    email: '',
    password: ''
  }),
  handleSubmit: (values, { props, ...formAttr }) => {
    props.sendRequest({ url: '/signin', values, ...formAttr })
      .then(({ data }) => {
        const { token } = data
        localStorage.setItem('token', token)
        api.setToken(token)
        props.setUser(data)
      })
      .catch(err => {
        if (err.status === 401) {
          formAttr.setErrors({
            email: 'Incorrect email',
            password: 'Incorrect password'
          })
        }
      })
  }
});