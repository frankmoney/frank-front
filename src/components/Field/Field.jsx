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
  setFocus,
  onFocus,
  onBlur,
  children,
  ...otherProps
}) => (
  <div className={cx(className, classes.root)} {...otherProps}>
    {label && renderProp(label, { focus })}
    {!label && title && <FieldLabel title={title} hint={hint} focus={focus} />}
    {renderProp(children, { onFocus, onBlur })}
  </div>
)

export default compose(
  withState('focus', 'setFocus', false),
  withPropsOnChange(['setFocus'], ({ setFocus }) => ({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
  })),
  injectStyles(styles)
)(Field)
