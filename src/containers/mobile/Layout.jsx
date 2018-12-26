// @flow
import * as React from 'react'
import Helmet from 'react-helmet'
import { BASE_TITLE } from 'const'

export const withMobileLayout = (Component: React.ComponentType<any>) => (
  props: Object
) => (
  <>
    <Helmet title={BASE_TITLE}>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
    </Helmet>
    <Component {...props} />
  </>
)
