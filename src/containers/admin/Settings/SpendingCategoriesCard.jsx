// @flow
import { compose, withProps } from 'recompose'
import reconnect from 'utils/reconnect'
import CategoriesCard from './CategoriesCard'
import { spendingCategoriesSelector } from './selectors'

export default compose(
  withProps({ categoryType: 'spending' }),
  reconnect({ categories: spendingCategoriesSelector })
)(CategoriesCard)
