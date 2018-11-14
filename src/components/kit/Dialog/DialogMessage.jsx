import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import DialogMessageAccent from './DialogMessageAccent'

const styles = {
  root: {
    fontSize: 20,
    lineHeight: 30,
    color: '#20284A',
    width: '100%',
    marginBottom: 35,
  },
}

const DialogMessage = ({ classes, className, ...otherProps }) => (
  <div className={cx(classes.root, className)} {...otherProps} />
)

DialogMessage.Accent = DialogMessageAccent

export default injectStyles(styles)(DialogMessage)
