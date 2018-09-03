import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import storiesPlaceholder from './stories-placeholder.jpg'
import piechartPlaceholder from './piechart-placeholder.jpg'

const styles = {
  stories: {
    background: `url("${storiesPlaceholder}")`,
    height: '100%',
    width: '100%',
  },

  charts: {
    background: `url("${piechartPlaceholder}")`,
    backgroundSize: 'contain',
    height: '100%',
    width: '100%',
  },
}

const StoriesPlaceholder = injectStyles(styles)(({ classes, className }) => (
  <div className={cx(classes.stories, className)} />
))

const ChartPlaceholder = injectStyles(styles)(({ classes, className }) => (
  <div className={cx(classes.charts, className)} />
))

export { StoriesPlaceholder, ChartPlaceholder }
