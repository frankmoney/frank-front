import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import {
  FixedHeader,
  Breadcrumbs,
  BreadcrumbsItem,
} from '@frankmoney/components'
import RecipientCard from 'components/RecipientCard'
import styles from './Recipient.jss'

const recipientCard = {
  name: 'Atlassian',
  paymentsCount: 24,
  lastPaymentDate: '2018-04-14',
  currencyCode: 'USD',
  totalSpending: -25499.0,
  // totalIncome: 1490.0,
  categories: [
    { color: '#8725FB', name: 'Operational expenses', counter: 34 },
    { color: '#21CB61', name: 'Marketing', counter: 12 },
    { color: '#0624FB', name: 'Program expenses', counter: 6 },
    { color: '#FC1891', name: 'Street outreach', counter: 2 },
    { color: '#FF9C28', name: 'Advertising', counter: 2 },
    { color: '#00DCEA', name: 'Sales', counter: 2 },
  ],
}

class Recipient extends React.PureComponent {
  render() {
    const { classes, className } = this.props

    return (
      <div className={cx(classes.directoryPage, className)}>
        <FixedHeader>
          <Breadcrumbs>
            <BreadcrumbsItem>Directory</BreadcrumbsItem>
            <BreadcrumbsItem>Atlassian</BreadcrumbsItem>
          </Breadcrumbs>
        </FixedHeader>
        <div className={classes.container}>
          <RecipientCard {...recipientCard} />
        </div>
      </div>
    )
  }
}

export default compose(injectStyles(styles, { fixedGrid: true }))(Recipient)
