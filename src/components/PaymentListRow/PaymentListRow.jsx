// @flow
import React from 'react'
import cx from 'classnames'
import ShowMoreIcon from 'material-ui-icons/MoreHoriz'
import CurrencyDelta from 'components/CurrencyDelta'
import Button from 'components/kit/Button'
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
    '&:not($lastItem):not($loadMoreItem)': {
      borderBottom: '1px solid #F0F0F2',
    },
  },
  lastItem: {},
  loadMoreItem: {},
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
  showMoreButton: {
    width: '100%',
    marginTop: 5,
  },
})

type Props = {|
  ...InjectStylesProps,
  //
  amount?: number,
  lastItem?: boolean,
  loadMore: boolean,
  onLoadMore?: () => void,
  onToggle: () => void,
  peerName?: string,
  postedOn?: DateDefaultString,
  selectable?: boolean,
  selected?: boolean,
  style?: any,
|}

type State = {|
  checked?: boolean,
|}

class PaymentListRow extends React.PureComponent<Props, State> {
  state = {
    checked: this.props.selected,
  }

  handleToggleCheckbox = () => {
    this.setState({ checked: !this.state.checked })
    this.props.onToggle()
  }

  render() {
    const {
      amount,
      classes,
      lastItem,
      loadMore,
      onLoadMore,
      peerName,
      postedOn,
      selectable,
      style,
    } = this.props

    const { checked } = this.state

    return (
      <>
        {!postedOn &&
          loadMore && (
            <div className={classes.loadMoreItem} style={style}>
              <Button
                icon={<ShowMoreIcon />}
                label="Show 30 more payments"
                className={classes.showMoreButton}
                onClick={onLoadMore}
              />
            </div>
          )}
        {postedOn && (
          <div
            className={cx(classes.root, lastItem && classes.lastItem)}
            style={style}
          >
            {selectable && (
              <Checkbox
                checked={checked}
                className={classes.checkbox}
                onChange={this.handleToggleCheckbox}
              />
            )}
            <CurrencyDelta className={classes.sum} value={amount} />
            <div className={classes.name}>{peerName}</div>
            <div className={classes.date}>{formatDate(postedOn)}</div>
          </div>
        )}
      </>
    )
  }
}

export default injectStyles(styles)(PaymentListRow)
