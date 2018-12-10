import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import storiesPlaceholder from 'demo/Widgets/stories-placeholder.jpg'

const styles = {
  stories: {
    background: `url("${storiesPlaceholder}")`,
    display: 'flex',
    flexGrow: 1,
    height: '100%',
  },
}

const StoriesTab = ({ classes, className }) => (
  <div className={cx(classes.stories, className)} />
)

export default injectStyles(styles)(StoriesTab)
