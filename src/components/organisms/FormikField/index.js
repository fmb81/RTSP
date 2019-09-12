import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'components'

const FormikField = ({ form, field, ...props }) => {
  const fieldProps = {
    ...props, 
    ...field, 
    invalid: form.touched[field.name] && !!form.errors[field.name], 
    error: form.errors[field.name],
  }
  return (
    <Field {...fieldProps} />
  )
}

FormikField.propTypes = {
  form: PropTypes.shape({
    touched: PropTypes.object,
    errors: PropTypes.object,
  }).isRequired,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
}

export default FormikField