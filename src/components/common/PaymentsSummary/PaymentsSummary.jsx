// @flow strict-local
import React from 'react'
import cx from 'classnames'
import ChartIcon from 'material-ui-icons/Assessment'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = theme => ({
  root: {
    color: '#9295A1',
    display: 'flex',
    flexShrink: 0,
    marginBottom: -3,
    padding: [0, 2],
    whiteSpace: 'pre',
    justifyContent: 'space-between',
    ...theme.fontRegular(18, 26),
  },
  info: {
    alignItems: 'center',
    display: 'flex',
    overflow: 'hidden',
    marginRight: 20,
  },
  icon: {
    color: '#252B43',
    flexShrink: 0,
    marginRight: 12,
  },
  text: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  number: {
    color: '#252B43',
  },
  link: {
    color: '#4C51F3',
    textDecoration: 'none',
    cursor: 'pointer',
    outline: 'none',
    '&:hover': {
      color: '#4549DC',
    },
  },
})

type Props = {|
  ...InjectStylesProps,
  //
  categoryCount: ?number,
  linkClassName?: string,
  onLinkClick?: () => void,
  paymentCount: number,
  showIcon?: boolean,
|}

const PaymentsSummary = ({
  categoryCount,
  classes,
  className,
  linkClassName,
  onLinkClick,
  paymentCount,
  showIcon,
}: Props) => (
  <div className={cx(classes.root, className)}>
    <div className={classes.info}>
      {showIcon && <ChartIcon className={classes.icon} />}
      <div className={classes.text}>
        <span className={classes.number}>{paymentCount}</span>
        {' payments'}
        {!!categoryCount && (
          <>
            {' in '}
            <span className={classes.number}>{categoryCount}</span>
            {' categories'}
          </>
        )}
      </div>
    </div>
    <a
      className={cx(classes.link, linkClassName)}
      onClick={onLinkClick}
      role="button"
      tabIndex={0}
    >
      See all
    </a>
  </div>
)

export default injectStyles(styles)(PaymentsSummary)
