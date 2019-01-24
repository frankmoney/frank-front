import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import TextTooltip from 'components/kit/TextTooltip'

const styles = theme => ({
  root: {
    color: 'rgba(255,255,255,0.5)',
    cursor: 'pointer',
    transition: 'color 0.1s linear',
    '&:hover': {
      color: 'rgba(255,255,255,1)',
    },
    display: 'flex',
    alignItems: 'center',
    padding: [2, 4],
  },
  label: {
    ...theme.fontMedium(14, 17),
  },
  icon: {
    width: 20,
    height: 20,
  },
})

const SnackButton = ({
  classes,
  className,
  icon,
  label,
  tooltip,
  ...otherProps
}) => {
  const button = (
    <div className={cx(classes.root, className)} {...otherProps}>
      {label && <div className={classes.label}>{label}</div>}
      {icon && React.cloneElement(icon, { className: classes.icon })}
    </div>
  )

  return tooltip ? (
    <TextTooltip distance={15} text={tooltip}>
      {button}
    </TextTooltip>
  ) : (
    button
  )
}

export default injectStyles(styles)(SnackButton)
