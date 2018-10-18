// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import ChartIcon from 'containers/Widget/Footer/Chart.svg'
import type { Props } from './Footer.flow'

const styles = {
  root: {
    alignItems: 'center',
    color: '#9295A1',
    display: 'flex',
    flexShrink: 0,
    marginBottom: -3,
    padding: [0, 2],
    whiteSpace: 'pre',
  },
  icon: {
    color: '#252B43',
    flexShrink: 0,
    marginRight: 14,
  },
  number: {
    color: '#252B43',
  },
  seeAll: {
    color: '#484DE7',
    cursor: 'pointer',
    outline: 'none',
    marginLeft: 5,
  },
  verified: {
    flexGrow: 1,
    textAlign: 'right',
  },
  frank: {
    color: '#252B43',
  },
}

const Footer = ({
  Classes: { root: rootClassName, seeAll: seeAllClassName } = {},
  classes,
  className,
  hideIcon,
  hideVerifiedBy,
  paymentCount,
  categoryCount,
  onSeeAllClick,
}: Props) => (
  <div className={cx(classes.root, rootClassName, className)}>
    {!hideIcon && <ChartIcon className={classes.icon} />}
    <span className={classes.number}>{paymentCount}</span>
    {' payments'}
    {!!categoryCount && (
      <>
        {' in '}
        <span className={classes.number}>{categoryCount}</span>
        {' categories'}
      </>
    )}
    <a
      className={cx(classes.seeAll, seeAllClassName)}
      onClick={onSeeAllClick}
      role="button"
      tabIndex={0}
    >
      See all
    </a>
    {!hideVerifiedBy && (
      <div className={classes.verified}>
        Verified by <span className={classes.frank}>Frank</span>
      </div>
    )}
  </div>
)

export default injectStyles(styles)(Footer)
