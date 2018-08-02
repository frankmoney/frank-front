import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import colors from 'styles/colors'
import LiveIndicator from './LiveIndicator'

const styles = theme => ({
  root: {
    ...theme.fontRegular(16, 26),
    color: colors.black,
    background: '#FFFFFF',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',

    border: '1px solid #E9EAEC',
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
    width: 800,
    height: 550,
    minHeight: 550,
  },
  header: {
    display: 'flex',
    position: 'relative',
    borderBottom: '1px solid #E9EAEC',
    minHeight: 60,
    marginBottom: 14,
  },
  headerItem: {
    ...theme.fontRegular(20, 26),
    color: '#A8AAB4',
    cursor: 'pointer',
    padding: [16, 2, 0],
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
})

const InlineWidget = ({ classes, className, content: Content, size }) => (
  <div
    className={cx(
      classes.root,
      {
        [classes.size400]: size === 400,
        [classes.size500]: size === 500,
        [classes.size625]: size === 625,
        [classes.size800]: size === 800,
      },
      className
    )}
  >
    <div className={classes.header}>
      <div className={classes.headerItem}>Spending</div>
      <div className={cx(classes.headerItem, classes.active)}>Stories</div>
      <LiveIndicator />
    </div>
    <Content />
  </div>
)

InlineWidget.propTypes = {
  content: PropTypes.element,
  size: PropTypes.oneOf([400, 500, 625, 800]).isRequired,
}

export default injectStyles(styles)(InlineWidget)
