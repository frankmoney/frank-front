import { withProps } from 'recompose'
import DrawerBase from 'components/DrawerBase'

export default withProps({
  mode: 'category',
  title: 'Readymag',
  items: [
    {
      value: '-99.00',
      categoryName: 'Program expenses',
      categoryColor: '#f2733d',
      date: '2018-04-14',
    },
    {
      value: '-1,625.00',
      categoryName: 'Marketing',
      categoryColor: '#8725fb',
      date: '2018-04-13',
    },
    {
      green: true,
      value: '+25,000.00',
      categoryName: 'Investments',
      categoryColor: '#f3c823',
      date: '2018-04-12',
    },
    {
      value: '-1,625.00',
      categoryName: 'Program expenses',
      categoryColor: '#f2733d',
      date: '2018-04-13',
    },
    {
      value: '-1,625.00',
      categoryName: 'Other expenses',
      categoryColor: '#1ba0fc',
      date: '2018-04-12',
    },
    {
      value: '-1,625.00',
      categoryName: 'Marketing',
      categoryColor: '#8725fb',
      date: '2018-04-13',
    },
    {
      green: true,
      value: '+25,000.00',
      categoryName: 'Investments',
      categoryColor: '#63cd23',
      date: '2018-04-12',
    },
    {
      value: '-1,625.00',
      categoryName: 'Consulting',
      categoryColor: '#875e20',
      date: '2018-04-13',
    },
    {
      value: '-1,625.00',
      categoryName: 'Investments',
      categoryColor: '#f3c823',
      date: '2018-04-12',
    },
    {
      value: '-1,625.00',
      categoryName: 'Other expenses',
      categoryColor: '#1ba0fc',
      date: '2018-04-13',
    },
    {
      value: '-1,625.00',
      categoryName: 'Software',
      categoryColor: '#d85c8e',
      date: '2018-04-12',
    },
    {
      value: '-1,625.00',
      categoryName: 'Marketing',
      categoryColor: '#8725fb',
      date: '2018-04-13',
    },
    {
      green: true,
      value: '+25,000.00',
      categoryName: 'Investments',
      categoryColor: '#f3c823',
      date: '2018-04-12',
    },
  ],
})(DrawerBase)
