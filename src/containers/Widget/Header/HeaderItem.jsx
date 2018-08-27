import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'

const styles = theme => ({
  item: {
    ...theme.fontRegular(20, 26),
    color: '#A8AAB4',
    cursor: 'pointer',
    outline: 'none',
    padding: [18, 0, 0],
    '&:not(:first-child)': {
      marginLeft: 24,
    },
  },
  active: {
    color: '#252B43',
    borderBottom: '1px solid #252B43',
    marginBottom: -1,
  },
})

const HeaderItem = ({ active, classes, className, name, onClick, key }) => {
  const stateProps = active
    ? {}
    : {
        onClick,
        role: 'button',
        tabIndex: 0,
      }
  return (
    <div
      className={cx(classes.item, { [classes.active]: active }, className)}
      key={key}
      {...stateProps}
    >
      {name}
    </div>
  )
}

HeaderItem.propTypes = {
  active: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
}

export default injectStyles(styles)(HeaderItem)
