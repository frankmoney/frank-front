// @flow strict-local
import React from 'react'
import cx from 'classnames'
import BankLogo from 'components/BankLogo'
import { type PaymentSource } from 'data/models/payment'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 38,
  },
  icon: {
    width: 38,
    height: 38,
    minWidth: 38,
    minHeight: 38,
    marginRight: 16,
  },
  description: {
    ...theme.fontRegular(13, 20),
    color: theme.colors.black,
  },
  descriptionAccent: {
    fontWeight: 500,
    opacity: 0.6,
  },
  descriptionText: {
    textTransform: 'uppercase',
    opacity: 0.4,
  },
})

type Props = {|
  ...InjectStylesProps,
  ...PaymentSource,
  //
  logoClassName?: string,
  textClassName?: string,
|}

const BankDescription = ({
  classes,
  className,
  bankDescription,
  bankLogo,
  bankName,
  logoClassName,
  textClassName,
}: Props) => (
  <div className={cx(classes.root, className)}>
    {bankLogo && (
      <BankLogo className={cx(classes.icon, logoClassName)} src={bankLogo} />
    )}
    <div className={cx(classes.description, textClassName)}>
      <span className={classes.descriptionAccent}>
        {bankName || 'Banking description'}:{' '}
      </span>
      <span className={classes.descriptionText}>
        {bankDescription || 'No description yet'}
      </span>
    </div>
  </div>
)

export default injectStyles(styles)(BankDescription)
