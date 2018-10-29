import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import { Check } from 'material-ui-icons'
import { getHostname } from 'utils/url'
import BankLogo from 'components/BankLogo'

const ITEM_HEIGHT = 90

const styles = theme => ({
  bank: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    height: ITEM_HEIGHT,
    borderRadius: 8,
    padding: [0, 20],
    transition: theme.transition('background-color'),
    cursor: 'pointer',
  },
  logo: {
    width: 50,
  },
  name: {
    ...theme.fontMedium(20, 28),
    width: 290,
    marginLeft: 18,
    color: '#3C4361',
  },
  website: {
    marginLeft: 40,
    ...theme.fontRegular(18, 26),
    color: '#3C4361',
    opacity: 0.5,
    textDecoration: 'none',
  },
  check: {
    visible: 'collapse',
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 21,
    color: '#fff',
  },
  selected: {
    cursor: 'unset',
    backgroundColor: '#20284A',
    boxShadow: '0px 2px 10px rgba(47, 60, 113, 0.25)',
    '& $name': {
      color: '#fff',
    },
    '& $website': {
      color: '#fff',
    },
    '& $check': {
      visible: 'visible',
    },
  },
  active: {
    '&:not($selected)': {
      backgroundColor: 'rgba(37, 43, 67, 0.04)',
    },
  },
})

const BankListItem = ({
  className,
  classes,
  theme,
  selected,
  active,
  id,
  name,
  logoUrl,
  website,
  ...otherProps
}) => (
  <div
    className={cx(
      classes.bank,
      selected && classes.selected,
      active && classes.active,
      className
    )}
    {...otherProps}
  >
    <BankLogo src={logoUrl} alt={name} className={classes.logo} />
    <div className={classes.name}>{name}</div>
    <a href={website} target="_blank" className={classes.website}>
      {getHostname(website)}
    </a>
    {selected && <Check className={classes.check} />}
  </div>
)

BankListItem.height = ITEM_HEIGHT

export default injectStyles(styles)(BankListItem)
