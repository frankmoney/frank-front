import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { compose, defaultProps, setStatic } from 'recompose'
import renderProp from 'utils/renderProp'

const styles = {
  root: {
    display: 'flex',
  },
  title: {
    flex: 1,
  },
  buttons: {
    flex: 0,
  },
}

const DrawerHeader = ({
  classes,
  title,
  titleLineClamp,
  caption,
  buttons,
  onClose,
}) => (
  <div className={classes.root}>
    <div className={classes.title}>
      {renderProp(title, { lineClamp: titleLineClamp, children: caption })}
    </div>
    <div className={classes.buttons}>{renderProp(buttons, { onClose })}</div>
  </div>
)

export default compose(
  defaultProps({
    title: Title,
  }),
  injectStyles(styles),
  setStatic('Title', Title)
)(DrawerHeader)
