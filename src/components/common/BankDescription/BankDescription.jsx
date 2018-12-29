// @flow strict-local
import React from 'react'
import cx from 'classnames'
import BankLogo from 'components/BankLogo'
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
  //
  description: string,
  logoUrl?: string,
  name?: string,
|}

const BankDescription = ({
  classes,
  className,
  bankDescription,
  bankLogo,
  bankName,
}: Props) => (
  <div className={cx(classes.root, className)}>
    {bankLogo && <BankLogo className={classes.icon} src={bankLogo} />}
    <div className={classes.description}>
      <span className={classes.descriptionAccent}>
        {bankName || 'Banking description'}:{' '}
      </span>
      <span className={classes.descriptionText}>{bankDescription}</span>
    </div>
  </div>
)

export default injectStyles(styles)(BankDescription)
