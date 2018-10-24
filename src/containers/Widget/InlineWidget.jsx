// @flow
import React from 'react'
import * as R from 'ramda'
import cx from 'classnames'
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
    margin: [0, -15],
    padding: [0, 15],
    '$size400 &': {
      overflowY: 'scroll',
    },
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
  stories: {
    overflowY: 'scroll',
    margin: [0, -18],
    padding: [0, 18],
  },
  storyRoot: {
    marginBottom: 20,
    borderRadius: 5,
    overflow: 'hidden',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.1)',
    '$size400 &, $size500 &': {
      flexDirection: 'row',
    },
    '$size625 &, $size800 &': {
      flexDirection: 'row-reverse',
      flex: [1, 1],
    },
    '$size400 &': {
      minHeight: 168,
    },
    '$size500 &': {
      minHeight: 212,
    },
  },
  storyWithImage: {
    '$size400 &, $size500 &': {
      boxShadow: 'unset',
    },
  },
  storyImage: {
    '$size400 &, $size500 &': {
      position: 'absolute',
      '&::before': {
        display: 'block',
        content: '" "',
        position: 'absolute',
        backgroundColor: 'black',
        opacity: 0.3,
        width: '100%',
        height: '100%',
      },
    },
    '$size625 &, $size800 &': {
      height: 'unset',
    },
  },
  storyTitle: {
    ...theme.fontSemibold(22, 26),
    marginBottom: 10,
    '$size400 $storyWithImage &, $size500 $storyWithImage &': {
      color: 'white',
    },
    '$size400 &': {
      padding: [20, 20],
    },
    '$size500 &': {
      padding: [20, 20],
      ...theme.fontSemibold(26, 30),
    },
    '$size625 &': {
      padding: [20, 20, 0],
    },
    '$size800 &': {
      padding: [20, 20, 0],
    },
  },
  storyStats: {
    ...theme.fontRegular(16, 30),
    '$size400 &, $size500 &': {
      position: 'absolute',
      bottom: 0,
      left: 0,
    },
    '$size400 $storyWithImage &, $size500 $storyWithImage &': {
      color: 'white',
    },
    '$size400 &': {
      padding: [20, 15],
    },
    '$size500 &': {
      padding: [20, 15],
    },
    '$size625 &': {
      padding: [20, 15],
    },
    '$size800 &': {
      padding: [20, 15],
    },
  },
  storyText: {
    '$size400 &, $size500 &': {
      display: 'none',
    },
    '$size625 &': {
      padding: [0, 20],
      marginBottom: 20,
    },
    '$size800 &': {
      padding: [0, 20],
      marginBottom: 20,
    },
  },
})

type Props = {
  size: 400 | 500 | 625 | 800,
  classes: Object,
}

const barsHeight = R.cond([
  [R.equals(500), R.always(146)],
  [R.equals(625), R.always(198)],
  [R.equals(800), R.always(203)],
  [R.T, R.always(0)],
])

const InlineWidget = ({ classes, size }: Props) => (
  <Widget
    className={cx(classes.root, {
      [classes.size400]: size === 400,
      [classes.size500]: size === 500,
      [classes.size625]: size === 625,
      [classes.size800]: size === 800,
    })}
    barChartClassName={classes.barChart}
    barsFooterPadding={10}
    barsHeight={barsHeight(size)}
    barsWidth={size > 500 ? 516 : 468}
    contentClassName={classes.content}
    paymentListClassName={classes.payments}
    paymentsPeriodClassName={classes.paymentsPeriodSelect}
    showBarChart={size > 400}
    showCategoryCount={size > 400}
    storiesClassName={classes.stories}
    storyClassNames={{
      root: classes.storyRoot,
      image: classes.storyImage,
      withImage: classes.storyWithImage,
      title: classes.storyTitle,
      text: classes.storyText,
      stats: classes.storyStats,
    }}
    widgetSize={size}
  />
)

export default injectStyles(styles)(InlineWidget)
