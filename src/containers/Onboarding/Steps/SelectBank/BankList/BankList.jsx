import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import { getHostname } from 'utils/url'
import BankLogo from '../../../BankLogo'

const styles = theme => ({
  root: {
    width: 740,
  },
  bank: {
    display: 'flex',
    alignItems: 'center',
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
  bankSelected: {
    cursor: 'unset',
    backgroundColor: '#20284A',
    '& $name': {
      color: '#fff',
    },
    '& $website': {
      color: '#fff',
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
      </div>
    ))}
  </div>
)

export default injectStyles(styles)(BankList)
