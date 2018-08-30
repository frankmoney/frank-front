import React from 'react'
import {
  FixedHeader,
  BreadcrumbsItem,
} from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import Breadcrumbs from 'components/Breadcrumbs'
import { compose, withProps } from 'recompose'
import InboxCard from 'components/InboxCard'

const styles = {
  root: {},
  body: {
    width: ({ grid }) => grid.fixed.contentWidth,
    margin: [0, 'auto'],
    paddingTop: 110,
  },
  card: {
    marginBottom: 30,
  },
}

const Inbox = ({ classes, items }) => (
  <div className={classes.root}>
    <FixedHeader>
      <Breadcrumbs>
        <BreadcrumbsItem>Inbox</BreadcrumbsItem>
      </Breadcrumbs>
    </FixedHeader>
    <div className={classes.body}>
      {items.map(({ id, ...otherItemProps }) => (
        <InboxCard key={id} className={classes.card} {...otherItemProps} />
      ))}
    </div>
  </div>
)

export default compose(
  withProps({
    items: [
      {
        id: 1,
        createdAt: '2018-02-25 00:00',
        delta: -1244.548,
        recipientReviewed: true,
        recipientName: 'Readymag',
        categoryAddedFromSimilar: true,
        categoryId: 'marketing',
        description: 'Something cool',
        descriptionAddedFromSimilar: true,
        useForSimilar: true,
      },
      {
        id: 2,
        createdAt: '2018-01-01 19:05',
        delta: 1392.32,
      },
      {
        id: 3,
        createdAt: '2018-01-01 05:00',
        delta: -124,
        recipientName: 'Adidas Group',
        categoryAddedFromSimilar: true,
        categoryId: 'marketing',
        description: 'Something\r\n\r\nvery\r\ncool',
        descriptionAddedFromSimilar: true,
        useForSimilar: true,
      },
    ],
  }),
  injectStyles(styles, { grid: true })
)(Inbox)
