// @flow strict-local
import qs from 'querystring'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { createSelector } from 'reselect'
import type { ReduxState } from 'flow/redux'
import { currentAccountIdSelector } from 'redux/selectors/user'
import { REDUCER_KEY } from './reducer'

const get = (...prop) => (state: ReduxState) =>
  state.getIn([REDUCER_KEY, ...prop])

export const position = get('position')
export const widgetType = get('widgetType')
export const color = get('color')
export const size = createPlainObjectSelector(get('size'))
export const scriptSrc = get('scriptSrc')

export const accountId = currentAccountIdSelector

export const widgetCodeText = createSelector(
  scriptSrc,
  position,
  color,
  accountId,
  (src, position, color, accountId) =>
    `<script async type="text/javascript" src="${src}?${qs.stringify({
      accountId,
      buttonColor: color,
      position,
    })}" />`
)
