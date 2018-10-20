import React from 'react'
import { Redirect } from 'react-router-dom'
import { compose, withProps } from 'recompose'
import Helmet from 'react-helmet'
import { BASE_TITLE, ROUTES } from 'const'
import CommentsDemo from './CommentsDemo'
import ComponentsDemo from './ComponentsDemo'
import ButtonsDemo from './Buttons'
import DemoLayout from './DemoLayout'
import DrawerDemo from './DrawerDemo'
import WidgetDemo from './Widgets'

const withDemoLayout = Component => props => (
  <DemoLayout>
    <Component {...props} />
    <Helmet title={`${BASE_TITLE} – Demo`} />
  </DemoLayout>
)

export default [
  {
    component: withProps({ to: ROUTES.demo.widgets })(Redirect),
    path: ROUTES.demo.root,
    exact: true,
  },
  // TODO page is not working
  // {
  //   component: withDemoLayout(ComponentsDemo),
  //   path: ROUTES.demo.components,
  //   exact: true,
  // },
  {
    component: ButtonsDemo,
    path: ROUTES.demo.buttons,
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
    component: withDemoLayout(WidgetDemo),
    path: ROUTES.demo.widgets,
    exact: true,
  },
]
