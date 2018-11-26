import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'

const styles = {
  resetStyles: {
    border: 'none',
    margin: '0',
    padding: '0',
    width: 'auto',
    overflow: 'visible',

    background: 'transparent',

    /* inherit font & color from ancestor */
    color: 'inherit',
    font: 'inherit',

    /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */
    lineHeight: 'normal',

    /* Corrects font smoothing for webkit */
    '-webkit-font-smoothing': 'inherit',
    '-moz-osx-font-smoothing': 'inherit',

    /* Corrects inability to style clickable `input` types in iOS */
    '-webkit-appearance': 'none',
  },
}

const HtmlButton = ({ classes, className, ...props }) => (
  <button className={cx(classes.resetStyles, className)} {...props} />
)

export default injectStyles(styles)(HtmlButton)
