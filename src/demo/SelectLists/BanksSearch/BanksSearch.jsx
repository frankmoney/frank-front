import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { compose, withState, withPropsOnChange, withHandlers } from 'recompose'
import BankList from 'components/BankList'
import SearchBar from 'components/kit/SearchBar'
import data from './banks.json'

const styles = {
  root: {},
  search: {
    marginBottom: 50,
  },
  list: {},
}

const BanksSearch = ({
  classes,
  className,
  handleListRef,
  banks,
  searchText,
  onChange,
  onKeyDown,
}) => (
  <div className={cx(classes.root, className)}>
    <SearchBar
      value={searchText}
      onChange={e => onChange(e.currentTarget.value)}
      className={classes.search}
      onKeyDown={onKeyDown}
    />
    <BankList
      className={classes.list}
      defaultSelectedId="usaa"
      banks={banks}
      maxVisibleItems={5}
      selectListProps={{ ref: handleListRef }}
    />
  </div>
)

export default compose(
  withState('searchText', 'onChange', ''),
  withState('listRef', 'handleListRef'),
  withPropsOnChange(['searchText'], ({ searchText: search = '' }) => ({
    banks: search
      ? data.filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
      : data,
  })),
  withHandlers({
    onKeyDown: props => event => {
      if (event.key === 'ArrowDown') {
        event.preventDefault() // prefent move caret to end
        props.listRef.setNextActiveElement()
      } else if (event.key === 'ArrowUp') {
        event.preventDefault() // prefent move caret to start
        props.listRef.setPrevActiveElement()
      } else if (event.key === 'Enter') {
        props.listRef.selectActiveElement()
      }
    },
  }),
  injectStyles(styles)
)(BanksSearch)
