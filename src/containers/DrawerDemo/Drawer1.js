import { withProps } from 'recompose'
import RecipientCategoryDrawer from 'components/RecipientCategoryDrawer'
import colors from 'styles/colors'

export default withProps({
  mode: 'category',
  title: 'Readymag',
  items: [
    {
      value: '-99.00',
      categoryName: 'Program expenses',
      categoryColor: colors.orange,
      date: '2018-04-14',
    },
    {
      value: '-1,625.00',
      categoryName: 'Marketing',
      categoryColor: colors.purple,
      date: '2018-04-13',
    },
    {
      green: true,
      value: '+25,000.00',
      categoryName: 'Investments',
      categoryColor: colors.yellow,
      date: '2018-04-12',
    },
    {
      value: '-1,625.00',
      categoryName: 'Program expenses',
      categoryColor: colors.orange,
      date: '2018-04-13',
    },
    {
      value: '-1,625.00',
      categoryName: 'Other expenses',
      categoryColor: colors.brightBlue,
      date: '2018-04-12',
    },
    {
      value: '-1,625.00',
      categoryName: 'Marketing',
      categoryColor: colors.purple,
      date: '2018-04-13',
    },
    {
      green: true,
      value: '+25,000.00',
      categoryName: 'Investments',
      categoryColor: colors.green,
      date: '2018-04-12',
    },
    {
      value: '-1,625.00',
      categoryName: 'Consulting',
      categoryColor: colors.brown,
      date: '2018-04-13',
    },
    {
      value: '-1,625.00',
      categoryName: 'Investments',
      categoryColor: colors.yellow,
      date: '2018-04-12',
    },
    {
      value: '-1,625.00',
      categoryName: 'Other expenses',
      categoryColor: colors.brightBlue,
      date: '2018-04-13',
    },
    {
      value: '-1,625.00',
      categoryName: 'Software',
      categoryColor: colors.magenta,
      date: '2018-04-12',
    },
    {
      value: '-1,625.00',
      categoryName: 'Marketing',
      categoryColor: colors.purple,
      date: '2018-04-13',
    },
    {
      green: true,
      value: '+25,000.00',
      categoryName: 'Investments',
      categoryColor: colors.yellow,
      date: '2018-04-12',
    },
  ],
})(RecipientCategoryDrawer)
