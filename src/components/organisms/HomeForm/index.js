import React from 'react'
import { Form, Field } from 'formik'
import { object, string } from 'yup'
import { withForm } from 'containers'
import { FormikField, Button, Link, FormTemplate } from 'components'

export const HomeForm = ({ isSubmitting, values, ...props }) => {
  return (
    <FormTemplate w={400}>
      <Form>
        <Field label="Url" name="url" component={FormikField} />
        <Button fullWidth type="submit" disabled={isSubmitting}>Add</Button>
      </Form>
    </FormTemplate>
  )
}

const urlRegExp = /(https?|rtsp|qvmc|rtmp):\/\/(?:([^\s@\/]+?)[@])?([^\s\/:]+)(?:[:]([0-9]+))?(?:(\/[^\s?#]+)([?][^\s#]+)?)?([#]\S*)?/

export default withForm(HomeForm, {
  validationSchema: object().shape({
    url: string().required('Required field').matches(urlRegExp, 'RTSP url is not valid'),
  }),
  mapPropsToValues: () => ({
    url: '',
  }),
  handleSubmit: (values, { props, ...formAttr }) => {
    props.sendRequest({ url: '/urls', values, ...formAttr })
      .then(({ data }) => {
        props.setMessage('Url has been successfully added')
        formAttr.setTouched({ url: false })
        formAttr.setValues({ url: '' })
      })
  }
});