// @flow
import React from 'react'
import cx from 'classnames'
import { Close as CloseIcon } from 'material-ui-icons'
import { injectStyles } from 'utils/styles'
import SnackButton from './SnackButton'
import styles from './SnackDumb.jss'

type SnackColor = 'blue' | 'dark' | 'red'

type Props = {
  message: string,
  disableDismissButton?: boolean,
  color?: SnackColor,
  buttons?: Array<React.Element> | React.Element,
  onCloseClick?: Func,
}

export type SnackDumbProps = Props

class SnackDumb extends React.Component<Props> {
  static defaultProps = {
    disableDismissButton: false,
    color: 'dark',
  }

  render() {
    const {
      classes,
      className,
      disableDismissButton,
      message,
      color,
      buttons,
      onCloseClick,
      ...otherProps
    } = this.props

    return (
      <div className={cx(classes.root, className)} {...otherProps}>
        <div className={classes.message}>{message}</div>
        <div className={classes.buttons}>
          {buttons}
          {!disableDismissButton && (
            <SnackButton
              key="dismiss"
              icon={<CloseIcon />}
              onClick={onCloseClick}
            />
          )}
        </div>
      </div>
    )
  }
}

export default injectStyles(styles)(SnackDumb)
