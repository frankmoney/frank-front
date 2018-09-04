import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import PeerTypeFilter from './PeerTypeFilter'
import SortByFilter from './SortByFilter'

const styles = theme => ({
  root: {
    ...theme.fontMedium(18, 26),
    color: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    '&>:not(:first-child)': {
      marginLeft: 25,
    },
  },
})

const DirectoryFilter = ({ classes, className }) => (
  <div className={cx(classes.root, className)}>
    <PeerTypeFilter />
    <SortByFilter />
  </div>
)

export default injectStyles(styles)(DirectoryFilter)
