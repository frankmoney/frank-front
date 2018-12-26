// @flow strict-local
import { compose, withProps } from 'recompose'
import reconnect from 'utils/reconnect'
import CategoriesCard from './CategoriesCard'
import { incomeCategoriesSelector } from './selectors'

export default compose(
  withProps({ categoryType: 'revenue' }),
  reconnect({ categories: incomeCategoriesSelector })
)(CategoriesCard)
