import React from 'react'
import cx from 'classnames'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import renderProp from 'utils/renderProp'
import LiveIndicator from './LiveIndicator'

const styles = theme => ({
  root: {
    borderBottom: '1px solid #E9EAEC',
    display: 'flex',
    marginBottom: 14,
    minHeight: 60,
    position: 'relative',
  },
  item: {
    ...theme.fontRegular(20, 26),
    color: '#A8AAB4',
    cursor: 'pointer',
    outline: 'none',
    padding: [16, 2, 0],
    '&:not(:first-child)': {
      marginLeft: 16,
    },
  },
  active: {
    color: '#252B43',
    borderBottom: '1px solid #252B43',
    marginBottom: -1,
  },
})

const HeaderItem = injectStyles(styles)(
  ({ active, classes, className, name, onClick }) => {
    const props = active
      ? {}
      : {
          onClick,
          role: 'button',
          tabIndex: 0,
        }
    return (
      <div
        className={cx(classes.item, { [classes.active]: active }, className)}
        {...props}
      >
        {name}
      </div>
    )
  }
)

const Header = injectStyles(styles)(
  ({ classes, className, children, itemClassName, liveClassName }) => (
    <div className={cx(classes.root, className)}>
      {R.map(item => renderProp(item, { className: itemClassName }), children)}
      <LiveIndicator className={cx(classes.live, liveClassName)} />
    </div>
  )
)

Header.propTypes = {
  itemClassName: PropTypes.string,
  liveClassName: PropTypes.string,
}

export { HeaderItem, Header }
