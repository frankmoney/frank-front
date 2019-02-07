// @flow strict
import React from 'react'
import cx from 'classnames'
import IconArrowBack from 'material-ui-icons/ArrowBack'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = theme => ({
  root: {
    cursor: 'pointer',
    display: 'flex',
    outline: 'none',
    alignItems: 'center',
    ...theme.fontRegular(20, 26),
  },
  title: {
    color: '#252B43',
    marginLeft: 9,
  },
  small: {
    fontSize: 18,
    paddingBottom: 2,
  },
  icon: {
    color: '#A8AAB4',
    marginRight: -4,
  },
})

type EmptyCb = () => void

type Props = {|
  ...InjectStylesProps,
  //
  name: string,
  onClick?: EmptyCb,
  small?: boolean,
|}

const CategoryName = ({ classes, className, name, onClick, small }: Props) => (
  <div
    className={cx(classes.root, { [classes.small]: small }, className)}
    onClick={onClick}
    role="button"
    tabIndex={0}
  >
    <IconArrowBack className={classes.icon} />
    <div className={classes.title}>{name}</div>
  </div>
)

export default injectStyles(styles)(CategoryName)
