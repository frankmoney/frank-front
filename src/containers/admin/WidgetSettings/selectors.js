// @flow strict-local
import qs from 'querystring'
import { createSelector } from 'reselect'
import type { ReduxState } from 'flow/redux'
import { currentAccountIdSelector } from 'redux/selectors/user'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => (state: ReduxState) =>
  state.getIn([REDUCER_KEY, ...prop])

export const position = get('position')
export const scriptSrc = get('scriptSrc')

export const accountId = currentAccountIdSelector

export const widgetCodeText = createSelector(
  scriptSrc,
  position,
  accountId,
  (src, position, accountId) =>
    `<script async type="text/javascript" src="${src}?${qs.stringify({
      accountId,
      position,
    })}" />`
)
