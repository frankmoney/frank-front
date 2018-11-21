// @flow
import React from 'react'
import cx from 'classnames'
import CurrencyDelta from 'components/CurrencyDelta'
import Checkbox from 'components/kit/Checkbox'
import { formatDate, type DateDefaultString } from 'utils/datesLight'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

export const ROW_HEIGHT = 55

const styles = theme => ({
  root: {
    display: 'flex',
    height: ROW_HEIGHT,
    alignItems: 'center',
    ...theme.fontRegular(16, 20),
    borderBottom: '1px solid #F0F0F2',
  },
  checkbox: {
    marginRight: 15,
  },
  sum: {
    flex: 1,
  },
  name: {
    flex: 2,
    paddingLeft: 16,
    fontWeight: 500,
  },
  date: {
    textAlign: 'right',
  },
  noSeparator: {
    borderBottom: 'none',
  },
  selectable: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(37, 43, 67, 0.03)',
    },
  },
})

type Props = {|
  ...InjectStylesProps,
  // Controlled state
  onToggle: boolean => void,
  selected?: boolean,
  // Payment details
  amount?: number,
  peerName?: string,
  postedOn?: DateDefaultString,
  selectable?: boolean,
  // Other props
  style?: any,
|}

class PaymentListRow extends React.Component<Props> {
  handleRowClick = event => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(event)
    }

    if (this.props.selectable && !event.defaultPrevented) {
      if (typeof this.props.onToggle === 'function') {
        this.props.onToggle(!this.props.selected)
      }
    }
  }

  render() {
    const {
      classes,
      className,
      selected,
      amount,
      peerName,
      postedOn,
      selectable,
      style,
      onToggle,
      noSeparator,
    } = this.props

    return (
      <div
        className={cx(
          classes.root,
          {
            [classes.noSeparator]: noSeparator,
            [classes.selectable]: selectable,
          },
          className
        )}
        onClick={this.handleRowClick}
        style={style}
      >
        {selectable && (
          <Checkbox
            checked={selected}
            className={classes.checkbox}
            onChange={onToggle}
          />
        )}
        <CurrencyDelta className={classes.sum} value={amount} />
        <div className={classes.name}>{peerName}</div>
        <div className={classes.date}>{formatDate(postedOn)}</div>
      </div>
    )
  }
}

export default injectStyles(styles)(PaymentListRow)
