// @flow

import React from 'react'

export type RenderPropOptions = {
  cloneElement?: null | undefined | boolean,
}

export default (Render, props, options: RenderPropOptions) => {
  if (typeof Render === 'function') {
    return <Render {...props} />
  }

  if (props && (!options || options.closeElement !== false)) {
    if (React.isValidElement(Render)) {
      return React.cloneElement(Render, props)
    }
  }

  return Render
}
