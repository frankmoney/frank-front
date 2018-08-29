import { changeQuery } from '@frankmoney/webapp'
import * as ACTIONS from '../actions'
import { sortByFilterSelector } from '../selectors'

export default (action$, store) =>
  action$.ofType(ACTIONS.resetSearch).map(() => {
    const sortBy = sortByFilterSelector(store.getState())
    return changeQuery({ sortBy }, true)
  })
