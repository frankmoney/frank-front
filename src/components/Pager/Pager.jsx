/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { injectStyles } from '@frankmoney/ui'
import { isDate, noop, zip } from 'lodash'
import {
  FirstPage as IconFirstPage,
  ChevronLeft as IconLeft,
  ChevronRight as IconRight,
} from 'material-ui-icons'
import { compose, withHandlers, setPropTypes, defaultProps } from 'recompose'
import { addMonths, subMonths } from 'date-fns'
import { DOTS, getPages, getMonthPages, formatMonthSequence } from './utils'
import styles from './Pager.jss'

const formatters = {
  numbers: values => values,
  months: formatMonthSequence,
}

const increment = {
  numbers: num => num + 1,
  months: date => addMonths(date, 1),
}

const decrement = {
  numbers: num => num - 1,
  months: date => subMonths(date, 1),
}

const paginators = {
  numbers: getPages,
  months: getMonthPages,
}

const equal = {
  numbers: (one, two) => one === two,
  months: (one, two) => +one === +two,
}

const combineWithFormat = (values, format) => zip(values, format(values))
const MIN_PAGES = 4

const Pager = ({
  className,
  classes,
  type,
  start,
  total,
  current,
  format,
  reverse,
  onPageSelect,
  handleStartClick,
  handleLeftClick,
  handleRightClick,
}) => {
  if (!total || !current || total < current) {
    return null
  }
  if (
    type === 'months' &&
    (!isDate(start) || !isDate(total) || !isDate(current))
  ) {
    throw new Error('start,end,total props should be dates')
  }

  let pages = paginators[type](current, start, total, MIN_PAGES)

  if (reverse) {
    pages = pages.reverse()
  }

  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.navGroup}>
        {current &&
          type === 'numbers' &&
          pages.indexOf(start) === -1 && (
            <div
              className={cx(classes.nav, classes.navFirst)}
              onClick={handleStartClick}
              key="first"
            >
              <IconFirstPage className={classes.navIcon} />
            </div>
          )}
        {current &&
          (reverse ? current < total : current > start) && (
            <div
              className={cx(classes.nav, classes.navPrev)}
              onClick={handleLeftClick}
              key="left"
            >
              <IconLeft className={classes.navIcon} />
            </div>
          )}
      </div>
      <div className={classes.pagesWrap}>
        {combineWithFormat(pages, format || formatters[type]).map(
          ([value, formatted], idx) =>
            value !== DOTS ? (
              <div
                className={cx(
                  classes.page,
                  equal[type](value, current) && classes.pageCurrent,
                  classes.pageNum
                )}
                onClick={
                  !equal[type](value, current)
                    ? () => onPageSelect(value)
                    : noop
                }
                key={value}
              >
                {formatted}
              </div>
            ) : (
              <div className={cx(classes.dots)} key={`dots+${idx}`}>
                {formatted}
              </div>
            )
        )}
      </div>
      <div className={classes.navGroup}>
        {current &&
          (reverse ? current > start : current < total) && (
            <div
              className={cx(classes.nav, classes.navNext)}
              onClick={handleRightClick}
              key="right"
            >
              <IconRight className={classes.navIcon} />
            </div>
          )}
      </div>
    </div>
  )
}

export default compose(
  setPropTypes({
    total: PropTypes.any.isRequired,
    current: PropTypes.any.isRequired,
    start: PropTypes.any,
    type: PropTypes.oneOf(['numbers', 'months']),
    onPageSelect: PropTypes.func,
    format: PropTypes.func,
    reverse: PropTypes.bool,
  }),
  defaultProps({
    type: 'numbers',
    onPageSelect: noop,
    start: 1,
  }),
  injectStyles(styles),
  withHandlers({
    handleLeftClick: props => () => {
      const getLeftPage = (props.reverse ? increment : decrement)[props.type]

      props.onPageSelect(getLeftPage(props.current))
    },
    handleRightClick: props => () => {
      const getRightPage = (props.reverse ? decrement : increment)[props.type]

      props.onPageSelect(getRightPage(props.current))
    },
    handleStartClick: props => () => {
      props.onPageSelect(props.reverse ? props.total : props.start)
    },
  })
)(Pager)
