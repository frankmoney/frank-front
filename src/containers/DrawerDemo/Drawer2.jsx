import React from 'react'
import { compose, withProps } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import CategoryLabel from 'components/CategoryLabel'
import RecipientCategoryDrawer from 'components/RecipientCategoryDrawer'
import colors from 'styles/colors'

export default compose(
  injectStyles({
    categoryIcon: {
      height: 26,
      width: 26,
    },
  }),
  withProps(props => ({
    mode: 'title',
    title: (
      <CategoryLabel
        iconClassName={props.classes.categoryIcon}
        name="Marketing"
        color={colors.purple}
      />
    ),
    items: [
      {
        value: '-99.00',
        title: 'Readymag',
        date: '2018-04-14',
      },
      {
        value: '-1,625.00',
        title: 'TBW Marketing',
        date: '2018-04-13',
      },
      {
        value: '-1,625.00',
        title: 'Simple',
        date: '2018-04-12',
      },
      {
        value: '-1,625.00',
        title: 'Google AdWords',
        date: '2018-03-11',
      },
      {
        value: '-1,625.00',
        title: 'Yandex Advertising',
        date: '2018-03-04',
      },
      {
        value: '-1,625.00',
        title: 'One Two Marketing',
        date: '2018-03-01',
      },
      {
        value: '-1,625.00',
        title: 'Readymag',
        date: '2018-02-23',
      },
    ],
  }))
)(RecipientCategoryDrawer)
