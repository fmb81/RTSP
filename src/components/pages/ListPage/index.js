import React from 'react'

import {
  PageTemplate, Header, UrlTable,
} from 'components'

const ListPage = () => {
  return (
    <PageTemplate
      header={<Header />}
    >
      <UrlTable />
    </PageTemplate>
  )
}

export default ListPage