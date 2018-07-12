import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import Drawer from 'components/Drawer'
import Item from './Item'

const style = theme => ({
  modeTitle: {},
  modeCategory: {},
  title: {
    ...theme.fontMedium(26, 34),
    '&$modeTitle': {
      ...theme.fontMedium(40, 46),
    },
    '&$modeCategory': {
      ...theme.fontMedium(40, 46),
    },
  },
})

const RecipientCategoryDrawer = ({
  classes,
  mode,
  title,
  titleClamp,
  items,
  ...otherProps
}) => (
  <Drawer {...otherProps}>
    <Drawer.Header
      buttons={
        <>
          <Drawer.MaximizeButton />
          <Drawer.CloseButton />
        </>
      }
    >
      <Drawer.Title
        className={cx(
          classes.title,
          mode === 'title' && classes.modeTitle,
          mode === 'category' && classes.modeCategory
        )}
        clamp={titleClamp}
      >
        {title}
      </Drawer.Title>
    </Drawer.Header>
    <Drawer.Body>
      {items.map(item => <Item mode={mode} {...item} />)}
    </Drawer.Body>
  </Drawer>
)

export default injectStyles(style)(RecipientCategoryDrawer)
