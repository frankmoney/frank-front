import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import {
  KeyboardArrowRight as SeparatorIcon,
  Cancel as RemoveIcon,
} from 'material-ui-icons'
import reconnect from 'utils/reconnect'
import { currentCategorySelector } from '../selectors'
import * as ACTIONS from '../actions'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    ...theme.fontMedium(16, 22),
    color: theme.colors.black,
  },
  overview: {
    opacity: 0.4,
  },
  separator: {
    opacity: 0.3,
    margin: [0, 4],
  },
  category: {
    color: ({ category: { color } }) => color,
  },
  remove: {
    cursor: 'pointer',
    width: 18,
    height: 18,
    marginLeft: 6,
    transition: theme.transition('opacity'),
    opacity: 0.2,
    '&:hover': {
      opacity: 1,
    },
  },
})

const CurrentCategory = ({ classes, className, category, cancelCategory }) => (
  <div className={cx(classes.root, className)}>
    <span className={classes.overview}>Overview</span>
    <SeparatorIcon className={classes.separator} />
    <span className={classes.category}>{category.name}</span>
    <RemoveIcon className={classes.remove} onClick={() => cancelCategory()} />
  </div>
)

export default compose(
  reconnect(
    {
      category: currentCategorySelector,
    },
    {
      cancelCategory: ACTIONS.cancelCategory,
    }
  ),
  injectStyles(styles)
)(CurrentCategory)
