import * as R from 'ramda'
import { createSelector } from 'reselect'
import data from './demo'

const recipientsGroupedByName = R.pipe(
  R.groupBy(
    R.pipe(
      R.prop('name'),
      R.head
    )
  ),
  R.toPairs,
  R.map(row => ({ title: row[0], rows: R.map(R.prop('id'), row[1]) }))
)

export const recipientsDataSourceSelector = createSelector(
  R.always(data),
  recipientsGroupedByName
)

export const recipientsRowDataSelector = rowId =>
  createSelector(R.always(data), R.find(R.propEq('id', rowId)))
