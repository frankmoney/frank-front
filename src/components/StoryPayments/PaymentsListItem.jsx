import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import CurrencyDelta from 'components/CurrencyDelta'
import { formatFullDate } from 'utils/datesLight'
import CleanLink from 'components/kit/CleanLink'

const styles = theme => ({
  item: {
    display: 'flex',
    flexDirection: 'row',
    padding: [25, 30],
    color: '#252B43',
    '&:hover': {
      '&:not($readOnly)': {
        background: 'rgba(37, 43, 67, 0.03)',
      },
      '& $remove': {
        display: 'block',
      },
      '&:not($readOnly) $date': {
        display: 'none',
      },
    },
    '&:not(:first-child)': {
      borderTop: '1px solid rgba(0, 0, 0, 0.05);',
    },
  },
  amount: {
    width: '25%',
    ...theme.fontRegular(18, 36),
  },
  info: {
    width: '75%',
  },
  row: {
    display: 'flex',
    alignItems: 'baseline',
  },
  recipient: {
    flex: [3, 1],
    wordBreak: 'break-word',
    ...theme.fontMedium(18, 36),
  },
  rightItem: {
    flex: [1, 1],
    textAlign: 'right',
  },
  date: {
    ...theme.fontRegular(16, 26),
    color: 'rgba(37, 43, 67, 0.4)',
  },
  description: {
    ...theme.fontRegular(16, 22),
    color: 'rgba(37, 43, 67, 0.4)',
  },
  remove: {
    display: 'none',
    ...theme.fontMedium(16, 26),
    color: '#252B43',
    cursor: 'pointer',
    padding: [0, 4],
    userSelect: 'none',
  },
  readOnly: {},
})

const Item = ({
  classes,
  className,
  amount,
  description,
  peer,
  postedOn,
  onRemove,
  href,
}) => {
  const rootProps = {
    className: cx(classes.item, { [classes.readOnly]: !onRemove }, className),
  }

  const Root = href ? CleanLink : 'div'

  if (href) {
    rootProps.href = href
    rootProps.target = '_blank'
    rootProps.externalLink = true
  }

  return (
    <Root {...rootProps}>
      <div className={classes.amount}>
        <CurrencyDelta value={amount} />
      </div>
      <div className={classes.info}>
        <div className={classes.row}>
          <div className={classes.recipient}>{peer && peer.name}</div>
          <div className={cx(classes.rightItem, classes.date)}>
            {formatFullDate(postedOn)}
          </div>
          {onRemove && (
            <div
              className={cx(classes.rightItem, classes.remove)}
              onClick={() => onRemove()}
            >
              Remove
            </div>
          )}
        </div>
        <div className={classes.row}>
          <div className={classes.description}>{description}</div>
        </div>
      </div>
    </Root>
  )
}
export default injectStyles(styles)(Item)
