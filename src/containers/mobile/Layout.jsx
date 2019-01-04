// @flow
import * as React from 'react'
import Helmet from 'react-helmet'
import { BASE_TITLE } from 'const'
import { injectStyles } from 'utils/styles'

// TODO: remove dev wrapper
const styles = {
  background: {
    background: '#A6A6A6',
  },
  mobileLayout: {
    width: 375,
    minHeight: '100vh',
    margin: [0, 'auto'],
    background: '#fff',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
  },
}

export const withMobileLayout = (Component: React.ComponentType<any>) =>
  injectStyles(styles)(({ classes, ...props }) => (
    <div className={classes.background}>
      <Helmet title={BASE_TITLE}>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Helmet>
      <div className={classes.mobileLayout}>
        <Component {...props} />
      </div>
    </div>
  ))
