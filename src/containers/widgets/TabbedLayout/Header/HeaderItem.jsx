// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = theme => ({
  item: {
    ...theme.fontRegular(20, 26),
    color: '#A8AAB4',
    cursor: 'pointer',
    outline: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    '&:not(:first-child)': {
      marginLeft: 24,
    },
  },
  active: {
    color: '#252B43',
    borderBottom: '1px solid #252B43',
    marginBottom: -1,
  },
  small: {
    fontSize: 18,
    paddingBottom: 2,
    '&:not(:first-child)': {
      marginLeft: 18,
    },
  },
})

type EmptyCb = () => void

type Props = {|
  ...InjectStylesProps,
  //
  active: boolean,
  key?: React.Key,
  name: string,
  onClick?: EmptyCb,
  small?: boolean,
|}

const HeaderItem = ({
  active,
  classes,
  className,
  key,
  name,
  onClick,
  small,
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
      className={cx(
        classes.item,
        {
          [classes.small]: small,
          [classes.active]: active,
        },
        className
      )}
      key={key}
      {...stateProps}
    >
      {name}
    </div>
  )
}

export default injectStyles(styles)(HeaderItem)
