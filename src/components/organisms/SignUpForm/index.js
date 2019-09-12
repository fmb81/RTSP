import React from 'react'
import styled from 'styled-components'
import { object, string } from 'yup'
import { Form, Field } from 'formik'
import { withForm } from 'containers'
import { FormikField, Button, Link, FormTemplate } from 'components'

export const SignUpForm = ({ isSubmitting, ...props }) => {
  return (
    <FormTemplate>
      <Field label="Email" type="email" name="email" component={FormikField} />
      <Field label="First name" name="firstName" component={FormikField} />
      <Field label="Last name" name="lastName" component={FormikField} />
      <Field label="Password" type="password" name="password" component={FormikField} />
      <Field label="Confirm password" type="password" name="confirmPasswword" component={FormikField} />
      <Button fullWidth type="submit" disabled={isSubmitting}>Sign Up</Button>
      <Link to="/signin">Sign in</Link>
    </FormTemplate>
  )
}

export default withForm(SignUpForm, {
  validationSchema: object().shape({
    email: string().required('Required field').email(),
    firstName: string().required('Required field'),
    lastName: string().required('Required field'),
    password: string().required('Required field'),
    confirmPasswword: string().required('Required field'),
  }),
  mapPropsToValues: () => ({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPasswword: ''
  }),
  handleSubmit: (values, { props, ...formAttr }) => {
    if (values.password !== values.confirmPasswword) {
      return formAttr.setErrors({
        confirmPasswword: 'The confirm password does not match'
      })
    }
    props.sendRequest({ url: '/signup', values, ...formAttr })
      .then(({ data }) => {
        props.setMessage('Your account has been successfully created')
        props.history.replace('/signin')
      })
  }
});