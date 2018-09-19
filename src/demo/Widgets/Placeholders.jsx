import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import storiesPlaceholder from './stories-placeholder.jpg'

const styles = {
  stories: {
    background: `url("${storiesPlaceholder}")`,
    height: '100%',
    width: '100%',
  },
}

// eslint-disable-next-line import/prefer-default-export
export const StoriesPlaceholder = injectStyles(styles)(
  ({ classes, className }) => <div className={cx(classes.stories, className)} />
)
