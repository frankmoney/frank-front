import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import { Check } from 'material-ui-icons'
import { getHostname } from 'utils/url'
import BankLogo from '../../../BankLogo'

const styles = theme => ({
  root: {
    width: 740,
  },
  bank: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    height: 90,
    borderRadius: 8,
    padding: [0, 20],
    transition: theme.transition('background-color'),
    cursor: 'pointer',
    '&:hover:not($bankSelected)': {
      backgroundColor: 'rgba(37, 43, 67, 0.04)',
    },
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
  bankSelected: {
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
})

const BankList = ({ className, classes, selectedId, onBankSelect, banks }) => (
  <div className={cx(classes.root, className)}>
    {banks.map(({ code: id, name, mediumLogoUrl: logoUrl, url: website }) => (
      <div
        className={cx(classes.bank, selectedId === id && classes.bankSelected)}
        key={id}
        onClick={() => onBankSelect(id)}
      >
        <BankLogo src={logoUrl} alt={name} className={classes.logo} />
        <div className={classes.name}>{name}</div>
        <a href={website} target="_blank" className={classes.website}>
          {getHostname(website)}
        </a>
        <Check className={classes.check} />
      </div>
    ))}
  </div>
)

export default injectStyles(styles)(BankList)
