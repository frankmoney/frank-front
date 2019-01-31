// @flow strict-local
import React from 'react'
import { CategoryList } from 'components/OverviewPieChart'
import { OTHER } from 'components/OverviewPieChart/utils'
import getPeerCategoriesStats from 'data/models/getPeerCategoriesStats'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = theme => ({
  root: {
    paddingTop: 8,
  },
  icon: {
    marginRight: 9,
    height: 12,
    width: 12,
  },
  name: {
    ...theme.fontMedium(18, 28),
  },
  value: {
    ...theme.fontRegular(18, 28),
    color: '#BEBFC7',
    opacity: 1,
  },
})

const convertData = (totalSum, categories) => {
  const { items, others } = getPeerCategoriesStats({
    totalSum,
    categories,
    limit: 5,
    precision: 0,
  })
  return {
    items,
    other:
      others === null
        ? undefined
        : {
            ...OTHER,
            value: others,
          },
  }
}

type Props = {|
  ...InjectStylesProps,
  //
  totalSum: number,
  categories: {
    name: string,
    color: string,
    sum: number,
  },
|}

const PeerCategoryList = ({ classes, totalSum, categories }: Props) => (
  <CategoryList
    className={classes.root}
    data={convertData(totalSum, categories)}
    iconClassName={classes.icon}
    nameClassName={classes.name}
    valueClassName={classes.value}
    valueUnit="%"
    clickable={false}
    inheritCursor
  />
)

export default injectStyles(styles)(PeerCategoryList)
