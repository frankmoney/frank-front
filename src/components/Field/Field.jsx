import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import { compose, withPropsOnChange, withState } from 'recompose'
import FieldLabel from 'components/FieldLabel'
import renderProp from 'utils/renderProp'

const styles = {
  root: {
    display: 'inline-block',
  },
}

const Field = ({
  classes,
  className,
  label,
  title,
  hint,
  focus,
  handleFocus,
  handleBlur,
  children,
  ...otherProps
}) => (
  <div className={cx(className, classes.root)} {...otherProps}>
    {label && renderProp(label, { focus })}
    {!label && title && <FieldLabel title={title} hint={hint} focus={focus} />}
    {renderProp(children)}
  </div>
)

export default compose(
  withState('focus', 'setFocus', false),
  withPropsOnChange(['setFocus'], ({ setFocus }) => ({
    handleFocus: () => setFocus(true),
    handleBlur: () => setFocus(false),
  })),
  injectStyles(styles)
)(Field)
