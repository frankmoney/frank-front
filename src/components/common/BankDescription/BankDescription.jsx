// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import BankLogo from 'components/BankLogo'

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
  className?: string,
  name: string,
  description: string,
  logoUrl?: string,
|}

const BankDescription = ({
  classes,
  className,
  name,
  description,
  logoUrl,
}: Props) => (
  <div className={cx(classes.root, className)}>
    {logoUrl && <BankLogo className={classes.icon} src={logoUrl} />}
    <div className={classes.description}>
      <span className={classes.descriptionAccent}>
        {name || 'Banking description'}:{' '}
      </span>
      <span className={classes.descriptionText}>{description}</span>
    </div>
  </div>
)

BankDescription.defaultProps = {
  description:
    'ONLINE INTERNATIONAL WIRE TRANSFER A/C: BANK HAPOALIM B M TEL-AVIV' +
    'ISRAEL REF: BUSINESS EXPENSES TRN: 4597800186ES 07/05 WIRE_OUTGOING',
}

export default injectStyles(styles)(BankDescription)
