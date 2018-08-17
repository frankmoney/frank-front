import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { highlightContext } from './HighlightTextProvider'

const styles = {
  highlight: {
    backgroundColor: '#484DE7',
    color: '#fff',
  },
}

const HighlightText = ({ classes, className, text, textPattern }) =>
  textPattern && text ? (
    <span
      className={className}
      dangerouslySetInnerHTML={{
        __html: text.replace(
          new RegExp(textPattern.toString(), 'ig'),
          t => `<span class="${classes.highlight}">${t}</span>`
        ),
      }}
    />
  ) : (
    <span className={className}>{text}</span>
  )

class ContextualAwareHighlightText extends React.Component {
  isContextual() {
    return typeof this.props.textPattern === 'undefined'
  }

  render() {
    if (this.isContextual()) {
      return (
        <highlightContext.Consumer>
          {searchPattern => (
            <HighlightText {...this.props} textPattern={searchPattern} />
          )}
        </highlightContext.Consumer>
      )
    }
    return <HighlightText {...this.props} />
  }
}

export default injectStyles(styles)(ContextualAwareHighlightText)
