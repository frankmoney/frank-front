import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { CheckCircle } from 'material-ui-icons'

const styles = {
  root: {
    display: 'block', // override if root component set to 'a' for example
    cursor: 'pointer',
    width: 130,
    height: 130,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  selected: {
    cursor: 'unset',
    '& $overlay': {
      visibility: 'visible',
    },
  },
  overlay: {
    visibility: 'collapse',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayIconBackdrop: {
    width: 30,
    height: 30,
    background: '#fff',
    borderRadius: '50%',
    position: 'relative',
  },
  overlayIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: 40,
    height: 37,
    color: '#21CB61',
  },
}

const ImageListItem = ({
  classes,
  className,
  selected,
  value,
  label,
  ...otherProps
}) => (
  <div className={cx(classes.root, selected && classes.selected, className)}>
    <img className={classes.image} alt={label || value} {...otherProps} />
    <div className={classes.overlay}>
      <div className={classes.overlayIconBackdrop}>
        <CheckCircle className={classes.overlayIcon} />
      </div>
    </div>
  </div>
)

export default injectStyles(styles)(ImageListItem)
