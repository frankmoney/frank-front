import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'

const styles = {
  root: {
    display: 'inline-flex',
    flexDirection: 'column',
    flexGrow: 1,
    color: '#BEBFC7',
    // TODO: better pixel?
    '&:not(:first-child)': {
      borderLeft: '1px solid #EFF0F2',
      paddingLeft: 15,
      marginLeft: 9,
    },
  },
  value: {
    fontSize: 18,
  },
  digits: {
    color: '#20284A',
    marginLeft: 4,
  },
}

const format = x => Math.round(x).toLocaleString('en-US')

const Total = ({ className, classes, label, value }) => (
  <div className={cx(classes.root, className)}>
    {label}
    <span className={classes.value}>
      $<span className={classes.digits}>{format(value)}</span>
    </span>
  </div>
)

Total.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
}

export default injectStyles(styles)(Total)
