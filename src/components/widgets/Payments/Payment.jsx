// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { format as formatDate } from 'date-fns'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import CurrencyDelta from 'components/CurrencyDelta'
import CategoryLabel from 'components/CategoryLabel'
import {
  type Payment as PaymentObject,
  type PaymentId,
} from 'data/models/payment'
import { UNCATEGORIZED_CATEGORY } from 'const'
import QuestionIcon from './QuestionMark.svg'

const styles = theme => ({
  root: {
    display: 'flex',
    margin: [0, 10],
    padding: [16, 0, 18],
    '&:not(:last-child)': {
      borderBottom: '1px solid #E9EAEC',
    },
  },
  clickable: {
    cursor: 'pointer',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  right: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  description: {
    color: '#8F93A4',
  },
  peerName: {
    ...theme.fontMedium(16, 22),
    marginTop: 6,
  },
  amount: {
    display: 'flex',
    flexWrap: 'nowrap',
  },
  amountValue: {
    marginLeft: 4,
  },
  category: {
    ...theme.fontMedium(16, 22),
    margin: [13, 0, 0, -1],
  },
  categoryIcon: {
    height: 12,
    marginBottom: 2,
    width: 12,
  },
  date: {
    ...theme.fontRegular(16, 22),
    color: '#BCBFC9',
  },
  unverified: {
    color: '#BCBFC9',
  },
  unverifiedIcon: {
    color: '#E9E9ED',
    position: 'relative',
    right: 1,
    bottom: 1,
  },
})

type PaymentClickCb = PaymentId => void

export type PaymentCbProps = {|
  onPaymentClick: ?PaymentClickCb,
|}

type Props = {|
  ...PaymentObject,
  ...InjectStylesProps,
  ...PaymentCbProps,
  //
  showCategory: boolean,
|}

const Payment = ({
  amount,
  category,
  classes,
  className,
  description,
  onPaymentClick,
  peer,
  postedOn,
  showCategory,
  verified,
}: Props) => {
  const date = formatDate(postedOn, 'MMM D')
  const renderedCategory = category || UNCATEGORIZED_CATEGORY
  const peerName = peer ? peer.name : 'Undefined payment'
  const renderedDescription = description || 'No description yet'
  return (
    <div
      className={cx(
        classes.root,
        { [classes.clickable]: !!onPaymentClick },
        className
      )}
      onClick={onPaymentClick}
    >
      <div className={classes.left}>
        <div
          className={cx(classes.description, {
            [classes.unverified]: !description || !verified,
          })}
        >
          {renderedDescription}
        </div>
        <div
          className={cx(classes.peerName, {
            [classes.unverified]: !peer || !verified,
          })}
        >
          {peerName}
        </div>
        {showCategory && (
          <CategoryLabel
            className={classes.category}
            iconClassName={classes.categoryIcon}
            color={renderedCategory.color}
            name={renderedCategory.name}
          />
        )}
      </div>
      <div className={classes.right}>
        <CurrencyDelta
          className={classes.amount}
          valueClassName={classes.amountValue}
          value={amount}
        />
        {verified ? (
          <div className={classes.date}>{date}</div>
        ) : (
          <QuestionIcon className={classes.unverifiedIcon} />
        )}
      </div>
    </div>
  )
}

export default injectStyles(styles)(Payment)
