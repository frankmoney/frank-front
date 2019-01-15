// @flow strict-local
import React from 'react'
import cx from 'classnames'
import ChartIcon from 'material-ui-icons/Assessment'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = theme => ({
  root: {
    ...theme.fontRegular(16, 26),
    alignItems: 'flex-end',
    display: 'flex',
    flex: [1, 0],
    justifyContent: 'space-between',
  },
  large: {
    ...theme.fontRegular(18, 26),
  },
  summary: {
    color: '#9295A1',
    display: 'flex',
    flex: [0, 0],
    marginBottom: -3,
    padding: [0, 2],
    whiteSpace: 'pre',
    justifyContent: 'space-between',
  },
  stretched: {
    flex: [1, 0],
  },
  info: {
    alignItems: 'center',
    display: 'flex',
    overflow: 'hidden',
    marginRight: 10,
  },
  icon: {
    color: '#252B43',
    flexShrink: 0,
    margin: [0, 12, 0, -3],
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
  verified: {
    color: '#9295A1',
    lineHeight: 20,
  },
  frank: {
    color: '#252B43',
  },
})

type Props = {|
  ...InjectStylesProps,
  //
  categoryCount: ?number,
  large?: boolean,
  linkClassName?: string,
  onLinkClick?: () => void,
  paymentCount: number,
  showIcon?: boolean,
  showVerified?: boolean,
|}

const PaymentsSummary = ({
  categoryCount,
  classes,
  className,
  large,
  linkClassName,
  onLinkClick,
  paymentCount,
  showIcon,
  showVerified,
}: Props) => (
  <div className={cx(classes.root, { [classes.large]: large }, className)}>
    <div
      className={cx(classes.summary, { [classes.stretched]: !showVerified })}
    >
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
    {showVerified && (
      <div className={classes.verified}>
        Verified by <span className={classes.frank}>Frank</span>
      </div>
    )}
  </div>
)

export default injectStyles(styles)(PaymentsSummary)
