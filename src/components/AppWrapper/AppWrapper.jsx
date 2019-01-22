import React from 'react'
import Helmet from 'react-helmet'
import { BASE_TITLE } from 'const'
import CurrencyProvider from 'components/CurrencyProvider'
import UnexpectedErrorManager from 'components/UnexpectedErrorManager'

const AppWrapper = ({ children }) => (
  <CurrencyProvider code="USD">
    <Helmet title={BASE_TITLE} />
    {children}
    <UnexpectedErrorManager />
  </CurrencyProvider>
)

export default AppWrapper
