import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import colors from 'styles/colors'
import ChartIcon from './Chart.svg'
import CloseIcon from './Close.svg'
import LiveIndicator from './LiveIndicator'

const SIDES_PADDING = 20

const styles = theme => ({
  root: {
    ...theme.fontRegular(16, 26),
    color: colors.black,
    background: '#FFFFFF',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    width: 375,
    height: 720,
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.07)',
    padding: [0, SIDES_PADDING, 59],
    position: 'relative',
  },
  header: {
    display: 'flex',
    position: 'relative',
    borderBottom: '1px solid #E9EAEC',
    marginBottom: 21,
    minHeight: 62,
  },
  headerItem: {
    ...theme.fontRegular(20, 26),
    color: '#A8AAB4',
    cursor: 'pointer',
    padding: [19, 1, 0],
    '&:not(:first-child)': {
      marginLeft: 16,
    },
    '&$active': {
      color: '#252B43',
      borderBottom: '1px solid #252B43',
      marginBottom: -1,
    },
  },
  active: {},
  live: {
    right: 0,
    top: 21,
  },
  footer: {
    alignItems: 'center',
    background: colors.black,
    borderRadius: [0, 0, 8, 8],
    bottom: -1,
    display: 'flex',
    height: 60,
    left: 0,
    padding: [10, SIDES_PADDING, 10],
    position: 'absolute',
    width: '100%',
  },
  chartIcon: {
    color: '#FFFFFF',
    marginRight: 19,
  },
  footerTitle: {
    ...theme.fontMedium(16, 20),
    color: '#FFFFFF',
    position: 'relative',
    top: 1,
  },
  footerSubtitle: {
    ...theme.fontRegular(14, 20),
    color: '#9295A1',
  },
  closeIcon: {
    color: '#666B7B',
    position: 'absolute',
    right: SIDES_PADDING,
  },
})

const ButtonWidget = ({ classes, className, content: Content }) => (
  <div className={cx(classes.root, className)}>
    <div className={classes.header}>
      <div className={cx(classes.headerItem, classes.active)}>Stories</div>
      <div className={classes.headerItem}>Expenses</div>
      <div className={classes.headerItem}>Income</div>
      <LiveIndicator className={classes.live} />
    </div>
    <Content />
    <div className={classes.footer}>
      <ChartIcon className={classes.chartIcon} />
      <div>
        <div className={classes.footerTitle}>Real-time report</div>
        <div className={classes.footerSubtitle}>Verified by Frank</div>
      </div>
      <CloseIcon className={classes.closeIcon} />
    </div>
  </div>
)

ButtonWidget.propTypes = {
  content: PropTypes.element,
}

export default injectStyles(styles)(ButtonWidget)
