import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import {
  FixedHeader,
  Breadcrumbs,
  BreadcrumbsItem,
} from '@frankmoney/components'
import SearchCard from 'components/SearchCard'
import RecipientsTable from './RecipientsTable/RecipientsTable'
import styles from './Directory.jss'

class Directory extends React.PureComponent {
  state = {
    searchValue: '',
  }

  handleChangeSearch = event => {
    this.setState({ searchValue: event.currentTarget.value })
  }

  render() {
    const { classes, className } = this.props

    const { searchValue } = this.state

    return (
      <div className={cx(classes.directoryPage, className)}>
        <FixedHeader>
          <Breadcrumbs>
            <BreadcrumbsItem>Directory</BreadcrumbsItem>
          </Breadcrumbs>
        </FixedHeader>
        <div className={classes.container}>
          <SearchCard
            placeholder="Start typing recipient or donor name…"
            className={classes.searchCard}
            value={searchValue}
            onChange={this.handleChangeSearch}
          />
          <RecipientsTable />
        </div>
      </div>
    )
  }
}

export default compose(injectStyles(styles, { fixedGrid: true }))(Directory)
