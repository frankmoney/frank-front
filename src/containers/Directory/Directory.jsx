import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { injectStyles } from '@frankmoney/ui'
import {
  FixedHeader,
  Breadcrumbs,
  BreadcrumbsItem,
} from '@frankmoney/components'
import SearchCard from 'components/SearchCard'
import { searchTextSelector } from './selectors'
import { searchTyping } from './actions'
import RecipientsTable from './RecipientsTable/RecipientsTable'
import styles from './Directory.jss'

const ConnectedSearchCard = connect(
  state => ({
    value: searchTextSelector(state),
  }),
  dispatch => ({
    onChange: event => {
      dispatch(searchTyping(event.currentTarget.value))
    },
  })
)(SearchCard)

const Directory = ({ classes, className }) => (
  <div className={cx(classes.directoryPage, className)}>
    <FixedHeader>
      <Breadcrumbs>
        <BreadcrumbsItem>Directory</BreadcrumbsItem>
      </Breadcrumbs>
    </FixedHeader>
    <div className={classes.container}>
      <ConnectedSearchCard
        placeholder="Start typing recipient or donor name…"
        className={classes.searchCard}
      />
      <RecipientsTable />
    </div>
  </div>
)

export default compose(injectStyles(styles, { fixedGrid: true }))(Directory)
