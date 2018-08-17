import React from 'react'
import { Redirect } from "react-router-dom";
import { compose, withProps } from 'recompose'
import Helmet from 'react-helmet'
import { BASE_TITLE, ROUTES } from 'const'
import CommentsDemo from 'containers/Comments/CommentsDemo'
import ComponentsDemo from 'containers/ComponentsDemo'
import DrawerDemo from 'containers/DrawerDemo'
import ChartDemo from '../components/Charts/Demo'
import DemoLayout from './DemoLayout'

const withDemoLayout = Component => props => (
  <DemoLayout>
    <Component {...props} />
    <Helmet title={`${BASE_TITLE} – Demo`} />
  </DemoLayout>
)

export default [
  {
    component: withProps({ to: ROUTES.demo.components })(Redirect),
    path: ROUTES.demo.root,
    exact: true,
  },
  {
    component: withDemoLayout(ComponentsDemo),
    path: ROUTES.demo.components,
    exact: true,
  },
  {
    component: withDemoLayout(DrawerDemo),
    path: ROUTES.demo.drawers.root,
    exact: true,
  },
  {
    component: compose(
      withDemoLayout,
      withProps({ type: 'type-1' })
    )(DrawerDemo),
    path: ROUTES.demo.drawers.type1,
    exact: true,
  },
  {
    component: compose(
      withDemoLayout,
      withProps({ type: 'type-2' })
    )(DrawerDemo),
    path: ROUTES.demo.drawers.type2,
    exact: true,
  },
  {
    component: compose(
      withDemoLayout,
      withProps({ type: 'type-3' })
    )(DrawerDemo),
    path: ROUTES.demo.drawers.type3,
    exact: true,
  },
  {
    component: compose(
      withDemoLayout,
      withProps({ type: 'type-4' })
    )(DrawerDemo),
    path: ROUTES.demo.drawers.type4,
    exact: true,
  },
  {
    component: withDemoLayout(CommentsDemo),
    path: ROUTES.demo.comments,
    exact: true,
  },
  {
    component: withDemoLayout(ChartDemo),
    path: ROUTES.demo.charts,
    exact: true,
  },
]
