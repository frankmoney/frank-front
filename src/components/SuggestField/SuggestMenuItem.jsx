// @flow
import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { CustomMenuItem } from '@frankmoney/components'

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
  template,
  count,
  countType,
  selected,
}: Props) => (
  <CustomMenuItem className={classes.menuItem} selected={selected}>
    <div className={classes.label}>
      {text ? (
        <>{text}</>
      ) : (
        <span className={classes.template}>Use “{template}”</span>
      )}
    </div>
    <div className={classes.counter}>
      {count} {countType}
      {(count === 0 || count > 1) && 's'}
    </div>
  </CustomMenuItem>
)

SuggestMenuItem.defaultProps = {
  count: 0,
  countType: 'payment',
}

export default injectStyles(styles)(SuggestMenuItem)
