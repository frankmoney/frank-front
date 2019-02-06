import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import HtmlButton from 'components/kit/Button/HtmlButton'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    outline: 'none',
    '&:hover $value': {
      color: 'rgba(37, 43, 67, 1)',
      transition: theme.transition('color'),
    },
    '&:hover $cross': {
      color: 'rgba(37, 43, 67, 0.4)',
      transition: theme.transition('color'),
    },
    '&:hover $label': {
      color: 'rgba(37, 43, 67, 0.5)',
      transition: theme.transition('color'),
    },
  },
  label: {
    marginRight: 10,
    color: 'rgba(37, 43, 67, 0.3)',
    ...theme.fontMedium(20, 26),
  },
  value: {
    color: 'rgba(37, 43, 67, 0.6)',
    ...theme.fontMedium(20, 26),
  },
  cross: {
    color: 'rgba(37, 43, 67, 0.2)',
    ...theme.fontMedium(18, 26),
    margin: [0, 9],
  },
  active: {
    '& $value, & $label': {
      color: '#484DE7',
    },
    '& $cross': {
      color: 'rgba(72, 77, 231, 0.5)',
    },
  },
})

const WidgetSizeButton = ({
  classes,
  className,
  width,
  height,
  on,
  ...props
}) => (
  <HtmlButton
    className={cx(classes.root, { [classes.active]: on }, className)}
    {...props}
  >
    <div className={classes.label}>Size</div>
    <div className={classes.value}>{width}</div>
    <div className={classes.cross}>x</div>
    <div className={classes.value}>{height}</div>
  </HtmlButton>
)

export default injectStyles(styles)(WidgetSizeButton)
