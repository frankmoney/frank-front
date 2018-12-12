// @flow strict
import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { type LedgerPieChart } from 'data/models/pieData'
import type { Selector, Store } from 'flow/redux'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => (store: Store) => store.getIn([REDUCER_KEY, ...prop])

const demoPieDataSelector = createPlainObjectSelector(get('pieData'))

const sumProp = (propName: string) =>
  R.pipe(
    R.map(R.prop(propName)),
    R.sum
  )

export const rawPieDataSelector: Selector<LedgerPieChart> = createSelector(
  demoPieDataSelector,
  items => ({
    items,
    totalRevenue: sumProp('revenue')(items),
    totalSpending: sumProp('spending')(items),
  })
)

export const rawPaymentsSelector = createPlainObjectSelector(get('payments'))
