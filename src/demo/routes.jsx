// @flow
import React from 'react'
import { Redirect } from 'react-router-dom'
import { withProps } from 'recompose'
import Helmet from 'react-helmet'
import { BASE_TITLE, ROUTES } from 'const'
import ButtonsDemo from './Buttons'
import CommentsDemo from './CommentsDemo'
import DemoLayout from './DemoLayout'
import FieldsDemo from './Fields/FieldsDemo'
import FieldsLeftDemo from './Fields/LeftFieldsDemo'
import PopupsDemo from './Popups'
import SelectListsDemo from './SelectLists'
import SelectsDemo from './Selects'
import DateSelectsDemo from './Selects/DateSelectsDemo'
import Dialogs from './Dialogs'
import Drawers from './Drawers'
import SwitchesDemo from './SwitchesDemo'
import WidgetDemo from './Widgets'

const withDemoLayout = Component => (props: Object) => (
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
    component: CommentsDemo,
    path: ROUTES.demo.comments,
    exact: true,
  },
  {
    component: FieldsDemo,
    path: ROUTES.demo.fields,
    exact: true,
  },
  {
    component: FieldsLeftDemo,
    path: ROUTES.demo.fieldsLeft,
    exact: true,
  },
  {
    component: PopupsDemo,
    path: ROUTES.demo.popups,
    exact: true,
  },
  {
    component: SelectsDemo,
    path: ROUTES.demo.selects,
    exact: true,
  },
  {
    component: DateSelectsDemo,
    path: ROUTES.demo.selectsDate,
    exact: true,
  },
  {
    component: SelectListsDemo,
    path: ROUTES.demo.selectLists,
    exact: true,
  },
  {
    component: SwitchesDemo,
    path: ROUTES.demo.switches,
    exact: true,
  },
  {
    component: Drawers,
    path: ROUTES.demo.drawers,
    exact: true,
  },
  {
    component: WidgetDemo,
    path: ROUTES.demo.widgets,
    exact: true,
  },
  {
    component: Dialogs,
    path: ROUTES.demo.dialogs,
    exact: true,
  },
]
