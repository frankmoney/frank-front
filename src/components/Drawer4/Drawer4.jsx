import { withProps } from 'recompose'
import DrawerBase from 'components/DrawerBase'

export default withProps({
  title:
    'To provide users with the correct guidance to complete a purchase, the proposed system would use Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis fringilla urna, vel rutrum ligula lobortis non. Maecenas velit libero, accumsan ac nulla ut, malesuada viverra mi. Pellentesque feugiat urna quis augue tempus pharetra. Donec ac elementum ex. Ut et lectus mauris. Cras non ultrices sem. Nullam justo tellus, efficitur ut condimentum eget, gravida posuere felis. Phasellus ut eros ac nisi hendrerit elementum vel ac metus',
  titleClamp: 3,
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
      categoryColor: '#fc1891',
      date: '2018-02-23',
    },
  ],
})(DrawerBase)
