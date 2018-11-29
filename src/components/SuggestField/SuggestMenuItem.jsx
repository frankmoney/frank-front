// @flow
import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { Check as SuggestedIcon } from 'material-ui-icons'
import MenuItemBase from 'components/kit/Menu/MenuItemBase'

const styles = theme => ({
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    color: theme.colors.black,
  },
  label: {
    flex: 'auto',
  },
  counter: {
    opacity: 0.4,
  },
  template: {
    opacity: 0.4,
  },
})

type Props = {
  classes: {},
  text: string,
  template: string,
  count: number,
  countType: string,
  selected: boolean,
}

const SuggestMenuItem = ({
  classes,
  text,
  count,
  countType,
  suggested,
  ...otherProps
}: Props) => (
  <MenuItemBase className={classes.menuItem} {...otherProps}>
    <div className={classes.label}>
      {count !== 0 ? (
        <>{text}</>
      ) : (
        <span className={classes.template}>Use “{text}”</span>
      )}
      {/* suggested && <SuggestedIcon /> */}
    </div>

    <div className={classes.counter}>
      {count} {countType}
      {(count === 0 || count > 1) && 's'}
    </div>
  </MenuItemBase>
)

SuggestMenuItem.defaultProps = {
  count: 0,
  countType: 'payment',
}

export default injectStyles(styles)(SuggestMenuItem)
