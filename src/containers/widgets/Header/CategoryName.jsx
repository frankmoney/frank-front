// @flow
import React from 'react'
import cx from 'classnames'
import { ArrowBack as IconArrowBack } from 'material-ui-icons'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = theme => ({
  root: {
    cursor: 'pointer',
    display: 'flex',
    outline: 'none',
    padding: [18, 0, 0],
  },
  title: {
    ...theme.fontRegular(20, 26),
    color: '#252B43',
    marginLeft: 9,
  },
  icon: {
    color: '#A8AAB4',
    margin: [1, 0, 0, -4],
  },
})

type EmptyCb = () => void

type Props = {|
  ...InjectStylesProps,
  //
  name: string,
  onClick?: EmptyCb,
|}

const CategoryName = ({ classes, className, name, onClick }: Props) => (
  <div
    className={cx(classes.root, className)}
    onClick={onClick}
    role="button"
    tabIndex={0}
  >
    <IconArrowBack className={classes.icon} />
    <div className={classes.title}>{name}</div>
  </div>
)

export default injectStyles(styles)(CategoryName)
