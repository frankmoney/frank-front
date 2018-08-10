import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import ChartIcon from '../Chart.svg'

const styles = {
  root: {
    display: 'flex',
    lineHeight: 20,
    marginTop: 20,
    padding: [0, 1, 0, 2],
    justifyContent: 'space-between',
  },
  content: {
    color: '#9295A1',
    alignItems: 'center',
    display: 'flex',
    whiteSpace: 'pre',
  },
  icon: {
    color: '#252B43',
    marginRight: 14,
  },
  number: {
    color: '#252B43',
  },
  seeAll: {
    marginLeft: 10,
    color: '#484DE7',
    cursor: 'pointer',
  },
  verified: {
    color: '#9295A1',
  },
  frank: {
    color: '#252B43',
  },
}

const Footer = ({
  classes,
  className,
  paymentCount,
  categoryCount,
  seeAllClassName,
}) => (
  <div className={cx(classes.root, className)}>
    <div className={classes.content}>
      <ChartIcon className={classes.icon} />
      <span className={classes.number}>{paymentCount}</span>
      {' payments'}
      {categoryCount && (
        <>
          {' in '}
          <span className={classes.number}>{categoryCount}</span>
          {' categories'}
        </>
      )}
      <a className={cx(classes.seeAll, seeAllClassName)}>See all</a>
    </div>
    <div className={classes.verified}>
      Verified by <span className={classes.frank}>Frank</span>
    </div>
  </div>
)

Footer.propTypes = {
  categoryCount: PropTypes.number,
  paymentCount: PropTypes.number.isRequired,
}

export default injectStyles(styles)(Footer)
