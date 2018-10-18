// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'

const styles = theme => ({
  item: {
    ...theme.fontRegular(20, 26),
    color: '#A8AAB4',
    cursor: 'pointer',
    outline: 'none',
    padding: [18, 0, 0],
    '&:not(:first-child)': {
      marginLeft: 24,
    },
  },
  active: {
    color: '#252B43',
    borderBottom: '1px solid #252B43',
    marginBottom: -1,
  },
})

type EmptyCb = () => void

type Props = {
  active: boolean,
  classes: Object,
  className: ?string,
  key: string | number,
  name: string,
  onClick: ?EmptyCb,
}

const HeaderItem = ({
  active,
  classes,
  className,
  key,
  name,
  onClick,
}: Props) => {
  const stateProps = active
    ? {}
    : {
        onClick,
        role: 'button',
        tabIndex: 0,
      }
  return (
    <div
      className={cx(classes.item, { [classes.active]: active }, className)}
      key={key}
      {...stateProps}
    >
      {name}
    </div>
  )
}

export default injectStyles(styles)(HeaderItem)
