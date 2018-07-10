import React from 'react'
import { withProps } from 'recompose'
import CategoryLabel from 'components/CategoryLabel'
import DrawerBase from 'components/DrawerBase'

export default withProps({
  mode: 'title',
  title: <CategoryLabel name="Marketing" color="#8725fb" size={26} />,
  items: [
    {
      value: '-99.00',
      title: 'Readymag',
      date: '2018-04-14',
    },
    {
      value: '-1,625.00',
      title: 'TBW Marketing',
      date: '2018-04-13',
    },
    {
      value: '-1,625.00',
      title: 'Simple',
      date: '2018-04-12',
    },
    {
      value: '-1,625.00',
      title: 'Google AdWords',
      date: '2018-03-11',
    },
    {
      value: '-1,625.00',
      title: 'Yandex Advertising',
      date: '2018-03-04',
    },
    {
      value: '-1,625.00',
      title: 'One Two Marketing',
      date: '2018-03-01',
    },
    {
      value: '-1,625.00',
      title: 'Readymag',
      date: '2018-02-23',
    },
  ],
})(DrawerBase)
