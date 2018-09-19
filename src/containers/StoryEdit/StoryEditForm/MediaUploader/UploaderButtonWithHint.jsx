import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'

const styles = theme => ({
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    width: 240,
  },
  icon: {
    width: 50,
    height: 50,
  },
  buttonText: {
    marginLeft: 20,
  },
  buttonLabel: {
    color: '#252B43',
    ...theme.fontMedium(20, 24),
  },
  buttonHint: {
    color: 'rgba(37, 43, 67, 0.3)',
    ...theme.fontRegular(16, 24),
  },
})

const UploaderButtonWithHint = ({
  classes,
  className,
  hint,
  label,
  iconComponent: ButtonIcon,
}) => (
  <div className={cx(classes.buttonContainer, className)}>
    {ButtonIcon && <ButtonIcon className={classes.icon} />}
    <div className={classes.buttonText}>
      <div className={classes.buttonLabel}>{label}</div>
      <div className={classes.buttonHint}>{hint}</div>
    </div>
  </div>
)

export default injectStyles(styles)(UploaderButtonWithHint)
