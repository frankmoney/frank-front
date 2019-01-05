// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import CurrencyDelta from 'components/CurrencyDelta'
import { type Payment } from 'data/models/payment'
import { formatShortDate } from 'utils/dates'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = theme => ({
  root: {
    borderBottom: '1px solid #F0F0F2',
    display: 'flex',
    flexDirection: 'column',
    padding: [11, 20, 18],
    cursor: 'pointer',
    textDecoration: 'none',
  },
  description: {
    ...theme.fontRegular(18, 26),
    color: '#7C808E',
    flex: [1, 0],
  },
  line: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  amount: {
    ...theme.fontRegular(18, 36),
    flex: [0, 0],
    whiteSpace: 'nowrap',
  },
  postedOn: {
    ...theme.fontRegular(16, 26),
    color: '#BCBFC9',
    whiteSpace: 'nowrap',
    marginLeft: 20,
    alignSelf: 'flex-end',
  },
  peer: {
    ...theme.fontMedium(16, 26),
    color: '#252B43',
  },
  secondLine: {
    marginTop: -1,
  },
})

type Props = {
  ...InjectStylesProps,
  //
  payment: Payment,
  key?: React.Key,
  to?: string,
}

const StoryPayment = ({
  classes,
  className,
  payment: { amount, description, peer, postedOn },
  key,
  to,
}: Props) => {
  const peerName = peer ? peer.name : 'Undefined payment'
  const renderedDescription = description || 'No description yet'
  return (
    <Link className={cx(classes.root, className)} to={to} key={key}>
      <div className={classes.line}>
        {<div className={classes.description}>{renderedDescription}</div>}
        <CurrencyDelta className={classes.amount} value={amount} />
      </div>
      <div className={cx(classes.line, classes.secondLine)}>
        <div className={classes.peer}>{peerName}</div>
        <div className={classes.postedOn}>
          {formatShortDate(postedOn, true)}
        </div>
      </div>
    </Link>
  )
}

export default injectStyles(styles)(StoryPayment)
