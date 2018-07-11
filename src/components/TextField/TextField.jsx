import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import * as R from 'ramda'
import { compose, mapProps, withPropsOnChange, withState } from 'recompose'

const styles = {
  root: {
    width: '100%',
    font: 'inherit',
    paddingBottom: 14,
    background: 'transparent',
    resize: 'none',
    outline: 'none',
    border: 'none',
    borderBottom: ({ focus }) => `1px solid ${focus ? '#484DE7' : '#E4E5E9'}`,
  },
}

const ExpandingTextarea = withPropsOnChange(['onChange'], ({ onChange }) => ({
  onChange: event => {
    const element = event.target
    const scrollTop = element.scrollTop

    try {
      element.style.height = '0px'
      element.style.height = `${element.scrollHeight}px`

      // fix the "border adding pixels" issue
      element.scrollTop = 100000
      element.style.height = `${element.scrollHeight + element.scrollTop}px`
    } finally {
      element.scrollTop = scrollTop
    }

    return onChange && onChange(event)
  },
}))(props => <textarea {...props} />)

const TextField = ({
  classes,
  className,
  value,
  expand,
  focus,
  ...otherProps
}) => {
  switch (expand) {
    case 'vertically':
      return (
        <ExpandingTextarea
          className={cx(className, classes.root)}
          rows={1}
          {...otherProps}
        >
          {value}
        </ExpandingTextarea>
      )

    case undefined:
    case null:
    case false:
      return (
        <input
          className={cx(className, classes.root)}
          value={value}
          {...otherProps}
        />
      )

    default:
      throw new Error(
        `Invalid value of \`expand\` prop: ${JSON.stringify(expand)}` +
          ". Possible values are 'vertically' or nil."
      )
  }
}

export default compose(
  withState('focused', 'setFocused', false),
  withPropsOnChange(['setFocused', 'onFocus'], ({ setFocused, onFocus }) => ({
    onFocus: (...args) => {
      setFocused(true)
      return onFocus && onFocus(...args)
    },
  })),
  withPropsOnChange(['setFocused', 'onBlur'], ({ setFocused, onBlur }) => ({
    onBlur: (...args) => {
      setFocused(false)
      return onBlur && onBlur(...args)
    },
  })),
  mapProps(({ focus, focused, ...otherProps }) => ({
    focus: R.isNil(focus) ? focused : focus,
    ...otherProps,
  })),
  injectStyles(styles)
)(TextField)
