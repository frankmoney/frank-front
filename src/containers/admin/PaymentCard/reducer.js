import { fromJS, Map } from 'immutable'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'

export const REDUCER_KEY = 'payment'

const defaultState = fromJS({
  meta: {},
})

const updateMeta = (id, data, state) =>
  state.updateIn(['meta', id], x => (x || new Map()).merge(data))

export default handleActions(
  {
    [ACTIONS.publish]: (state, { payload: { id } }) =>
      updateMeta(id, { publishing: true }, state),
    [ACTIONS.publish.success]: (state, { payload: { id } }) =>
      updateMeta(id, { publishing: false }, state),
    [ACTIONS.unpublish]: (state, { payload: { id } }) =>
      updateMeta(id, { publishing: true }, state),
    [ACTIONS.unpublish.success]: (state, { payload: { id } }) =>
      updateMeta(id, { publishing: false }, state),
    [ACTIONS.save]: (state, { payload: { id } }) =>
      updateMeta(id, { saving: true }, state),
    [ACTIONS.save.success]: (
      state,
      {
        payload: {
          payment: { id },
          cascade,
        },
      }
    ) => updateMeta(id, { saving: false, cascadeCount: cascade.length }, state),
  },
  defaultState
)
