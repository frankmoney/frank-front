import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import { compose, defaultProps } from 'recompose'
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

const DrawerBase = ({
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

export default compose(
  defaultProps({
    title:
      'To provide users with the correct guidance to complete a purchase, the proposed system would use Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis fringilla urna, vel rutrum ligula lobortis non. Maecenas velit libero, accumsan ac nulla ut, malesuada viverra mi. Pellentesque feugiat urna quis augue tempus pharetra. Donec ac elementum ex. Ut et lectus mauris. Cras non ultrices sem. Nullam justo tellus, efficitur ut condimentum eget, gravida posuere felis. Phasellus ut eros ac nisi hendrerit elementum vel ac metus',
    items: [
      {
        value: '+99.00',
        title: 'Readymag',
        categoryName: 'Program expenses',
        categoryColor: '#f2733d',
        date: '2018-04-14',
      },
      {
        value: '-1,625.00',
        title: 'TBW Marketing',
        categoryName: 'Marketing',
        categoryColor: '#8725fb',
        date: '2018-04-13',
      },
      {
        green: true,
        value: '+25,000.00',
        title: 'Simple',
        categoryName: 'Investments',
        categoryColor: '#eccd5f',
        date: '2018-04-12',
      },
      {
        value: '-1,625.00',
        title: 'Google AdWords',
        categoryName: 'Program expenses',
        categoryColor: '#f2733d',
        date: '2018-03-11',
      },
      {
        value: '-1,625.00',
        title: 'Yandex Advertising',
        categoryName: 'Other expenses',
        categoryColor: '#1ba0fc',
        date: '2018-03-04',
      },
      {
        value: '-1,625.00',
        title: 'One Two Three Four Five Six Seven',
        categoryName: 'Marketing',
        categoryColor: '#8725fb',
        date: '2018-03-01',
      },
      {
        green: true,
        value: '+25,000.00',
        title: 'Readymag',
        categoryName: 'Investments',
        categoryColor: '#eccd5f',
        date: '2018-02-23',
      },
    ],
  }),
  injectStyles(style)
)(DrawerBase)
