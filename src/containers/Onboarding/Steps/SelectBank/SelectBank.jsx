import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import SearchBar from 'components/SearchCard'
import StepLayout from '../../StepLayout'
import StepTitle from '../../StepTitle'
import StepDescription from '../../StepDescription'
import { selectedBankIdSelector } from '../../selectors'
import * as ACTIONS from '../../actions'
import BankList from './BankList'

const styles = {
  root: {},
  searchBar: {
    marginTop: 80,
    width: 700,
  },
  banks: {
    marginTop: 50,
  },
}

const SelectBank = ({ className, classes, selectedBankId, selectBank }) => (
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
    />
    <BankList
      className={classes.banks}
      selectedId={selectedBankId}
      onBankSelect={selectBank}
    />
  </StepLayout>
)

const mapStateToProps = createStructuredSelector({
  selectedBankId: selectedBankIdSelector,
})

export default compose(
  connect(
    mapStateToProps,
    dispatch => ({ selectBank: id => dispatch(ACTIONS.bankSelect(id)) })
  ),
  injectStyles(styles)
)(SelectBank)
