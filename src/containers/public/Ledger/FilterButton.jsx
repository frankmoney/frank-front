import React from 'react'
import cx from 'classnames'
import { Tune as FilterIcon } from 'material-ui-icons'
import { compose } from 'recompose'
import { injectStyles } from '@frankmoney/ui'
import reconnect from 'utils/reconnect'
import { IconPlainButton } from 'components/kit/Button'
import * as ACTIONS from './actions'

const styles = {
  icon: {
    width: 24,
    height: 24,
  },
}

const FilterButton = ({ classes, className, onToggleFilter }) => (
  <IconPlainButton
    className={cx(classes.icon, className)}
    icon={<FilterIcon />}
    onClick={() => onToggleFilter()}
  />
)

export default compose(
  reconnect(
    {},
    {
      onToggleFilter: ACTIONS.filtersOpen,
    }
  ),
  injectStyles(styles)
)(FilterButton)
