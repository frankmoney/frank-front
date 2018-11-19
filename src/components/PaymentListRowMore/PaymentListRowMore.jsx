// @flow
import React from 'react'
import ShowMoreIcon from 'material-ui-icons/MoreHoriz'
import cx from 'classnames'
import Button from 'components/kit/Button'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { ROW_HEIGHT } from 'components/PaymentListRow'

const styles = theme => ({
  root: {
    display: 'flex',
    height: ROW_HEIGHT,
    alignItems: 'center',
    ...theme.fontRegular(16, 20),
  },
})

type Props = {|
  ...InjectStylesProps,
  //
  label: String,
  onClick: MouseEvent => void,
|}

const PaymentListRowMore = ({
  theme,
  classes,
  className,
  label,
  loading,
  onClick,
  ...otherProps
}: Props) => (
  <div className={cx(classes.root, className)} {...otherProps}>
    <Button
      stretch
      icon={<ShowMoreIcon />}
      label={label}
      onClick={onClick}
      loading={loading}
    />
  </div>
)

export default injectStyles(styles)(PaymentListRowMore)
