// @flow strict
import * as React from 'react'
import { injectStyles as originInjectStyles } from '@frankmoney/ui'

type Styles = Object // flowlint-line unclear-type:off

export type Theme = Object // flowlint-line unclear-type:off
type StyleCreator = (theme: Theme) => Styles

type InjectOptions = {|
  fixedGrid?: boolean,
  grid?: boolean,
  inject?: Array<string>,
|}

// TODO: better types, not sure if possible with flow
export type ReactComponent = React.ComponentType<any> // flowlint-line unclear-type:off
export type StyledComponent = React.ComponentType<any> // flowlint-line unclear-type:off

type PropInjector = (component: ReactComponent) => StyledComponent

type InjectStylesFn = (
  stylesOrCreator: Styles | StyleCreator,
  options?: InjectOptions
) => PropInjector

// eslint-disable-next-line import/prefer-default-export
export const injectStyles: InjectStylesFn = originInjectStyles

export type Classes = { [class: string]: string }

export type InjectStylesProps = {|
  classes: Classes,
  className?: string,
|}

export type Grid = {|
  fixed: {|
    contentWidth: number,
    gutterSize: number,
  |},
|}
