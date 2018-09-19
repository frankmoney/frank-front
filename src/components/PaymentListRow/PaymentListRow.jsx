import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { Checkbox } from 'material-ui'
import CurrencyDelta from 'components/CurrencyDelta'
import { LoadMoreButton } from 'components/ListVirtualized'
import { formatDate } from 'utils/datesLight'

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
})

class RecipientRow extends React.PureComponent {
  state = {
    checked: this.props.selected,
  }

  handleToggleCheckbox = () => {
    this.setState({ checked: !this.state.checked })
    this.props.onToggle()
  }

  render() {
    const {
      classes,
      style,
      lastItem,
      loadMore,
      peerName,
      amount,
      postedOn,
      onLoadMore,
      selectable,
    } = this.props

    const { checked } = this.state

    return (
      <div
        className={cx(
          classes.root,
          lastItem && classes.lastItem,
          !postedOn && loadMore && classes.loadMoreItem
        )}
        style={style}
      >
        {!postedOn &&
          loadMore && (
            <LoadMoreButton
              label="Show 30 more payments"
              onClick={onLoadMore}
            />
          )}
        {postedOn && (
          <>
            {selectable && (
              <Checkbox
                color="primary"
                checked={checked}
                className={classes.checkbox}
                disableRipple
                onClick={this.handleToggleCheckbox}
              />
            )}
            <CurrencyDelta className={classes.sum} value={amount} />
            <div className={classes.name}>{peerName}</div>
            <div className={classes.date}>{formatDate(postedOn)}</div>
          </>
        )}
      </div>
    )
  }
}

export default injectStyles(styles)(RecipientRow)
