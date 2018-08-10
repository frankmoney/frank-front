import React from 'react'
import cx from 'classnames'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import renderProp from 'utils/renderProp'
import LiveIndicator from './LiveIndicator'

const styles = {
  root: {
    borderBottom: '1px solid #E9EAEC',
    display: 'flex',
    margin: [0, 2, 14],
    minHeight: 64,
    position: 'relative',
  },
}

const Header = ({
  classes,
  className,
  children,
  itemClassName,
  liveClassName,
}) => (
  <div className={cx(classes.root, className)}>
    {R.map(item => renderProp(item, { className: itemClassName }), children)}
    <LiveIndicator className={cx(classes.live, liveClassName)} />
  </div>
)

Header.propTypes = {
  itemClassName: PropTypes.string,
  liveClassName: PropTypes.string,
}

export default injectStyles(styles)(Header)
