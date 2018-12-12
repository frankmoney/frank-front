import ACTIONS from '../actions'

export default action$ =>
  action$
    .ofType(ACTIONS.updatePublished)
    .map(() => ACTIONS.createOrUpdate({ publish: true }))
