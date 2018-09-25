import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import { Button } from '@frankmoney/components'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as R from 'ramda'
import { createStructuredSelector } from 'reselect'
import SearchBar from 'components/SearchCard'
import StepLayout from '../../StepLayout'
import StepTitle from '../../StepTitle'
import StepDescription from '../../StepDescription'
import {
  filteredBankListSelector,
  bankSearchSelector,
  banksLoadedSelector,
  banksLoadingSelector,
  selectedBankIdSelector,
} from '../../selectors'
import * as ACTIONS from '../../actions'
import BankList from './BankList'

const styles = theme => ({
  root: {},
  searchBar: {
    marginTop: 80,
    width: 700,
  },
  banks: {
    marginTop: 50,
  },
  emptyPlaceholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 45,
  },
  placeholderLabel: {
    ...theme.fontRegular(22, 22),
    color: 'rgba(0,0,0,0.5)',
  },
  placeholderButton: {
    marginTop: 30,
    width: 130,
  },
})

const SelectBank = ({
  className,
  classes,
  selectedBankId,
  selectBank,
  search,
  onSearch,
  onResetSearch,
  loaded,
  loading,
  banks,
}) => (
  <StepLayout className={cx(classes.root, className)}>
    <StepTitle>Select your bank</StepTitle>
    <StepDescription>
      Get started by selecting your bank in our database.
      <br />If you can’t find it here, please contact us and we will be happy to
      help.
    </StepDescription>
    <SearchBar
      className={classes.searchBar}
      placeholder="Type in your bank name"
      value={search}
      onChange={({ target }) => onSearch(target.value)}
      loading={loading}
    />
    {loaded && (
      <BankList
        className={classes.banks}
        selectedId={selectedBankId}
        onBankSelect={selectBank}
        banks={banks}
      />
    )}
    {loaded &&
      banks.length === 0 && (
        <div className={classes.emptyPlaceholder}>
          <div className={classes.placeholderLabel}>Nothing found</div>
          {!!search && (
            <Button
              className={classes.placeholderButton}
              label="Reset"
              onClick={onResetSearch}
            />
          )}
        </div>
      )}
  </StepLayout>
)

const mapStateToProps = createStructuredSelector({
  loaded: banksLoadedSelector,
  loading: banksLoadingSelector,
  banks: filteredBankListSelector,
  selectedBankId: selectedBankIdSelector,
  search: bankSearchSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    selectBank: ACTIONS.bankSelect,
    load: ACTIONS.loadBanks,
    onSearch: ACTIONS.bankNameType,
    onResetSearch: ACTIONS.banksResetSearch,
  },
])

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentWillMount() {
      if (!this.props.loaded) {
        this.props.load()
      }
    },
  }),
  injectStyles(styles)
)(SelectBank)
