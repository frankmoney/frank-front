import { Observable } from 'rxjs'
import ACTIONS from './actions'
import data from './data.json'

export const loadEpic = action$ =>
  action$
    .ofType(ACTIONS.load.toString())
    .switchMap(({ payload }) =>
      Observable.of(data.stories[payload]).map(ACTIONS.load.success)
    )
