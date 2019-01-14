// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { compose, defaultProps } from 'recompose'
import colors from 'styles/colors'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import CloseIcon from './close.svg'
import ChevronUpIcon from './chevron-up.svg'
import ChartIcon from './chart.svg'
import styles from './ButtonWidgetToggle.jss'

type EmptyCb = () => void

type Props = {|
  ...InjectStylesProps,
  //
  onClick?: EmptyCb,
  onClose?: EmptyCb,
  open: boolean,
  subtitle?: string,
  title?: string,
  color?: string,
|}

const ButtonWidgetToggle = ({
  classes,
  className,
  onClick,
  expanded,
  subtitle,
  title,
}: Props) => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <div
    className={cx(classes.root, { [classes.expanded]: expanded }, className)}
    onClick={onClick}
  >
    <ChartIcon className={classes.chartIcon} />
    <ChevronUpIcon className={classes.chevronIcon} />
    <div>
      <div className={classes.title}>{title || 'Real-time report'}</div>
      <div className={classes.subtitle}>{subtitle}</div>
    </div>
    <CloseIcon className={classes.closeIcon} />
  </div>
)

export default compose(
  defaultProps({ color: colors.black }),
  injectStyles(styles)
)(ButtonWidgetToggle)
