// @flow
import React from 'react'
import cx from 'classnames'
import Button from 'components/kit/Button'
import SearchBar from 'components/SearchCard'
import { injectStyles } from 'utils/styles'
import openIntercom from 'utils/openIntercom'
import BankList from 'components/BankList'
import StepLayout from 'components/onboarding/StepLayout'
import StepTitle from 'components/onboarding/StepTitle'
import StepDescription from 'components/onboarding/StepDescription'

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
    color: '#252B43',
    opacity: 0.5,
  },
  placeholderButton: {
    marginTop: 30,
    width: 130,
  },
  contactLink: {
    color: '#4D51D8',
    cursor: 'pointer',
  },
})

const banksSelectListProps =
  typeof window !== 'undefined' ? { scrollContainer: window } : {}

const SelectBank = ({
  className,
  classes,
  layoutProps,
  selectedBankId,
  selectBank,
  search,
  onSearch,
  onResetSearch,
  loaded,
  loading,
  banks,
}) => (
  <StepLayout {...layoutProps} className={cx(classes.root, className)}>
    <StepTitle>Select your bank</StepTitle>
    <StepDescription>
      Get started by selecting your bank in our database.
      <br /> Don’t see yours?{' '}
      <span className={classes.contactLink} onClick={openIntercom}>
        Contact us
      </span>
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
        selectListProps={banksSelectListProps}
        className={classes.banks}
        selectedId={selectedBankId}
        onBankSelect={selectBank}
        banks={banks}
      />
    )}
    {!!search &&
      loaded &&
      banks.length === 0 && (
        <div className={classes.emptyPlaceholder}>
          <div className={classes.placeholderLabel}>Nothing found</div>
          <Button
            className={classes.placeholderButton}
            label="Reset"
            onClick={onResetSearch}
          />
        </div>
      )}
  </StepLayout>
)

export default injectStyles(styles)(SelectBank)
