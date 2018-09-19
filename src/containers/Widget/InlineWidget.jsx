import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import colors from 'styles/colors'
import Widget from './Widget'

const styles = theme => ({
  root: {
    ...theme.fontRegular(16, 26),
    background: '#FFFFFF',
    border: '1px solid #E9EAEC',
    borderRadius: 8,
    color: colors.black,
    display: 'flex',
    flexDirection: 'column',
    padding: [0, 18, 19],
  },
  size400: {
    width: 400,
    height: 275,
  },
  size500: {
    width: 500,
    height: 345,
  },
  size625: {
    width: 625,
    height: 430,
  },
  size800: {
    height: 550,
    minHeight: 550,
    width: 800,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflowY: 'scroll',
    margin: [0, -15],
    padding: [0, 15],
  },
  paymentsPeriodSelect: {
    marginTop: 4,
    paddingLeft: 2,
    textAlign: 'left',
  },
  barChart: {
    margin: [10, 'auto', 0],
    '$size500 &': {
      margin: [10, -3, 0],
    },
  },
  payments: {
    margin: [-5, 'auto', 0],
    width: 550,
    '$size400 &': {
      margin: [4, -8, 0],
      width: 'auto',
    },
    '$size500 &': {
      margin: [-5, -8, 0],
      width: 'auto',
    },
  },
})

const barsHeight = R.cond([
  [R.equals(500), R.always(146)],
  [R.equals(625), R.always(198)],
  [R.equals(800), R.always(203)],
  [R.T, R.always(0)],
])

// TODO: probably props should be more defensive
//       barsData,
//       categoryCount,
//       categoryType,
//       classes,
//       className,
//       currentCategoryColor,
//       currentCategoryName,
//       entriesCount,
//       onCategoryClick,
//       onCancelCategoryClick,
//       onCategoryTypeChange,
//       onPeriodChange,
//       onSeeAllClick,
//       stories: Stories,
//       period,
//       periods,
//       pieData,
//       size,
const InlineWidget = props => <Widget barsHeight={barsHeight} {...props} />

InlineWidget.propTypes = {
  categoryCount: PropTypes.number,
  categoryType: PropTypes.string,
  onCategoryClick: PropTypes.func.isRequired,
  onCategoryTypeChange: PropTypes.func.isRequired,
  onPeriodChange: PropTypes.func.isRequired,
  onSeeAllClick: PropTypes.func.isRequired,
  period: PropTypes.string.isRequired,
  periods: PropTypes.arrayOf(PropTypes.string).isRequired,
  size: PropTypes.oneOf([400, 500, 625, 800]).isRequired,
  stories: PropTypes.element,
  tab: PropTypes.oneOf(['payments', 'stories', 'about']),
}

InlineWidget.defaultProps = {
  tab: 'payments',
}

export default injectStyles(styles)(InlineWidget)
