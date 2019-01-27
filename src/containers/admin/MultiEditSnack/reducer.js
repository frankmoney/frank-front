// @flow
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import ACTIONS from './actions'

export const REDUCER_KEY = 'multiEdit'

type Status = null | 'updating' | 'publishing' | 'error' | 'done'

const defaultState = fromJS({
  status: null,
  payments: [],
  editDialogOpen: false,
  publishDialogOpen: false,
  paymentsAffected: null,
})

export default handleActions(
  {
    [ACTIONS.add]: (state, { payload: payment }) =>
      (state.get('status') ? defaultState : state).update('payments', list =>
        list.push(payment)
      ),
    [ACTIONS.remove]: (state, { payload: payment }) =>
      state.update('payments', list => list.filter(x => x.id !== payment.id)),
    [ACTIONS.beginEdit]: state => state.merge({ editDialogOpen: true }),
    [ACTIONS.cancelEdit]: state => state.merge({ editDialogOpen: false }),
    [ACTIONS.save]: state => state.merge({ status: 'updating' }),
    [ACTIONS.saveAndPublish]: state => state.merge({ status: 'publishing' }),
    [ACTIONS.changePublish]: state =>
      state.merge({
        publishDialogOpen: true,
      }),
    [ACTIONS.cancelChangePublish]: state =>
      state.merge({
        publishDialogOpen: false,
      }),
    [ACTIONS.confirmChangePublish]: state =>
      state.merge({
        status: 'updating',
      }),
    [ACTIONS.updateSuccess]: state =>
      state.merge({
        status: 'done',
        publishDialogOpen: false,
        editDialogOpen: false,
      }),
    [ACTIONS.updateFail]: state =>
      state.merge({
        status: 'error',
        publishDialogOpen: false,
        editDialogOpen: false,
      }),
    [ACTIONS.clear]: () => defaultState,
    [ACTIONS.leave]: () => defaultState,
  },
  defaultState
)
