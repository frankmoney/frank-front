// @flow
import * as React from 'react'
import type { InjectStylesProps } from 'utils/styles'
import type { Category } from './CategoryList.flow'

type TooltipItemRenderer = Category => React.Node

export type Props = {|
  ...InjectStylesProps,
  //
  categories: Array<Category>,
  children: React.Element<any>,
  renderTooltipItem: TooltipItemRenderer,
|}

export type State = {|
  anchorEl: React.Node,
|}
