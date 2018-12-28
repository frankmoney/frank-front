// @flow strict
import { createRouteUrl } from '@frankmoney/utils'

type Params = { [string]: string | number | boolean }

export const createMobileUrl = (route: string, params: Params) =>
  createRouteUrl(route, params, { public: true, mobile: true })
