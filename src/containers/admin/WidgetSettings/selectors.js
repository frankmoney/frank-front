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
  widgetType,
  size,
  scriptSrc,
  position,
  color,
  accountId,
  (widgetType, size, src, position, color, accountId) =>
    widgetType === 'button'
      ? `<script async type="text/javascript" src="${src}/widget.js?${qs.stringify(
          {
            accountId,
            buttonColor: color,
            position,
          }
        )}" />`
      : `<div class=“frank-embed” data-account-id=“${accountId}" data-width=“${
          size.width
        }” data-height=“${
          size.height
        }"></div><script type="text/javascript" src="${src}/embed.js" />`
)
