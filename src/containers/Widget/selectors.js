import { createPlainObjectSelector } from '@frankmoney/utils'
import { REDUCER_KEY } from './reducer'

const get = prop => store => store.getIn([REDUCER_KEY, prop])

const rawPieDataSelector = createPlainObjectSelector(get('pieData'))

export const pieChartDataSelector = rawPieDataSelector
export const entriesCountSelector = () => 42 // FIXME: entriesCountSelector

export const currentCategoryNameSelector = () => 'Product development' // FIXME: get('currentCategory')
