// @flow
import * as React from 'react'
import type { Category } from './CategoryList.flow'

export type Props = {
  categories: Array<Category>,
  children: React.Element<any>,
  classes: Object,
  renderTooltipItem: Category => React.Node,
}

export type State = {
  anchorEl: React.Node,
}
