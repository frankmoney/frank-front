import ACTIONS from '../actions'

export default action$ =>
  action$
    .ofType(ACTIONS.publish)
    .map(() => ACTIONS.createOrUpdate({ publish: true }))
