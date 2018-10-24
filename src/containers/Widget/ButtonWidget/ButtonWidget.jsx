// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import Widget from 'containers/Widget/Widget'
import colors from 'styles/colors'
import Expander from './Expander'
import ButtonWidgetCategoryList from './ButtonWidgetCategoryList'

const WIDTH = 375

const styles = theme => ({
  // Wrapper
  root: {
    ...theme.fontRegular(16, 26),
    background: '#FFFFFF',
    border: '1px solid #fff',
    borderRadius: 8,
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.07)',
    color: colors.black,
    display: 'flex',
    flexDirection: 'column',
    height: 720,
    padding: [0, 18, 59],
    position: 'relative',
    width: WIDTH,
  },
  expender: {
    margin: [0, -1],
    width: WIDTH,
  },
  // Actual widget content
  contentRoot: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  period: {
    display: 'flex',
    padding: [4, 0, 11, 2],
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    margin: [0, -15],
    overflowY: 'scroll',
    padding: [0, 15],
  },
  pieChart: {
    margin: [15, 'auto'],
    position: 'relative',
  },
  overviewFooter: {
    ...theme.fontRegular(18, 26),
    margin: [18, 0, 13],
  },
  overviewFooterSeeAll: {
    flexGrow: 1,
    marginRight: -2,
    textAlign: 'right',
  },
  payments: {
    margin: [-3, -9, 0],
  },
  stories: {
    overflowY: 'scroll',
    marginRight: -20,
    paddingRight: 20,
  },
  storyRoot: {
    marginBottom: 30,
  },
  storyImage: {
    borderRadius: 5,
    marginBottom: 15,
    overflow: 'hidden',
  },
  storyTitle: {
    ...theme.fontSemibold(22, 28),
    marginBottom: 10,
  },
  storyStats: {
    ...theme.fontRegular(16, 30),
    marginBottom: 10,
  },
})

type Props = {
  expanded: boolean, // demo flag
  // Styles
  classes: Object,
  className: ?string,
}

type State = { expanded: boolean }

class ButtonWidget extends React.PureComponent<Props, State> {
  static defaultProps = {
    expanded: false,
  }

  state = {
    expanded: this.props.expanded,
  }

  handleClose = () => this.setState({ expanded: false })
  handleOpen = () => this.setState({ expanded: true })

  render() {
    const { classes, className } = this.props
    const { expanded } = this.state

    if (!expanded) {
      return (
        <Expander
          closed
          onClick={this.handleOpen}
          title="We’re transparent"
          subtitle="See realtime report"
        />
      )
    }

    return (
      <div className={cx(classes.root, className)}>
        <Widget
          barsFooterPadding={12}
          barsHeight={196}
          barsWidth={337}
          CategoryList={ButtonWidgetCategoryList}
          className={classes.contentRoot}
          contentClassName={classes.content}
          OverviewFooterClasses={{
            root: classes.overviewFooter,
            seeAll: classes.overviewFooterSeeAll,
          }}
          OverviewFooterProps={{
            hideIcon: true,
            hideVerifiedBy: true,
          }}
          paymentListClassName={classes.payments}
          paymentsPeriodClassName={classes.period}
          pieChartClassName={classes.pieChart}
          pieChartRootComponent={React.Fragment}
          showBarChart
          showCategoryCount
          showOverviewTotals
          storiesClassName={classes.stories}
          storyClassNames={{
            root: classes.storyRoot,
            image: classes.storyImage,
            title: classes.storyTitle,
            stats: classes.storyStats,
          }}
          widgetSize={WIDTH}
        />
        <Expander className={classes.expender} onClose={this.handleClose} />
      </div>
    )
  }
}

export default injectStyles(styles)(ButtonWidget)
