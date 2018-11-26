import * as React from 'react'
import { push as routePush, replace as routeReplace } from 'react-router-redux'
import { connect } from 'react-redux'

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}

// TODO update react-router to new react context and rewrite by using context and history not redux.
// see: https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/Link.js

const RouterLink = ({ children, to, replace, dispatch }) => {
  const child = React.Children.only(children)

  return React.cloneElement(child, {
    href: to,
    onClick: () => {
      if (child.props.onClick) child.props.onClick(event)

      const target = event.currentTarget.getAttribute('target')

      if (
        !event.defaultPrevented && // onClick prevented default
        event.button === 0 && // ignore everything but left clicks
        (!target || target === '_blank') && // let browser handle "target=_blank" etc.
        !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
        event.preventDefault()

        const method = replace ? routeReplace : routePush

        dispatch(method(to))
      }
    },
  })
}

export default connect()(RouterLink)
