import React from 'react'
import { injectStyles } from '@frankmoney/ui'

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

export default injectStyles(styles)(HighlightText)
