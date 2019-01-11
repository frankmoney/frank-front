import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import getScrollbarSize from 'dom-helpers/util/scrollbarSize'
import css from 'dom-helpers/style'

function getPaddingRight(node) {
  return parseInt(css(node, 'paddingRight') || 0, 10)
}

const styles = {
  '@global body': {
    overflow: 'hidden',
  },
}

class BodyPreventScrolling extends React.Component {
  // set spacing for scrollbar width
  componentDidMount() {
    const node = document.body
    const scrollbarSize = getScrollbarSize()
    const paddingRight = getPaddingRight(node)
    this._prevPaddingRight = paddingRight
    node.style.paddingRight = `${paddingRight + scrollbarSize}px`
  }

  componentWillUnmount() {
    document.body.style.paddingRight = `${this._prevPaddingRight}px`
  }

  render() {
    return null
  }
}

export default injectStyles(styles)(BodyPreventScrolling)
