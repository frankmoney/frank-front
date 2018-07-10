import React from 'react'
import { Drawer } from '@frankmoney/components'
import IconClose from '@frankmoney/components/lib/Drawer/IconClose'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import Clamp from 'shiitake'
import { connect } from 'react-redux'
import { push as pushLocation } from 'react-router-redux'
import { compose } from 'recompose'
import { ROUTES } from 'const'
import styles from './DrawersDemo.jss'

const Drawer1 = ({ classes, open, handleClose }) => (
  <Drawer
    open={open}
    onClose={handleClose}
    title="To provide users with the correct guidance to complete a purchase, the proposed system would use Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis fringilla urna, vel rutrum ligula lobortis non. Maecenas velit libero, accumsan ac nulla ut, malesuada viverra mi. Pellentesque feugiat urna quis augue tempus pharetra. Donec ac elementum ex. Ut et lectus mauris. Cras non ultrices sem. Nullam justo tellus, efficitur ut condimentum eget, gravida posuere felis. Phasellus ut eros ac nisi hendrerit elementum vel ac metus"
    renderHeader={({
      classes: drawerClasses,
      title,
      onClose,
      disableClose,
    }) => (
      <div className={cx(classes.title, drawerClasses.title)}>
        <Clamp className={classes.titleText} lines={3}>
          {title}
        </Clamp>
        <IconClose className={classes.maximizeButton} onClick={onClose} />
        {onClose &&
          !disableClose && (
            <IconClose
              className={drawerClasses.closeButton}
              onClick={onClose}
            />
          )}
      </div>
    )}
  >
    <h3>Drawer 1</h3>
  </Drawer>
)

export default compose(
  connect(
    null,
    dispatch => ({
      handleClose: () => dispatch(pushLocation(ROUTES.demo.drawers.root)),
    })
  ),
  injectStyles(styles)
)(Drawer1)
