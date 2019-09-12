import React from 'react'

import {
  PageTemplate, Header, HomeForm,
} from 'components'

const HomePage = () => {
  return (
    <PageTemplate
      header={<Header />}
    >
      <HomeForm />
    </PageTemplate>
  )
}

export default HomePage