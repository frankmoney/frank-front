// @flow strict-local
// spellchecker:ignore mmaa
import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import { injectStyles } from 'utils/styles'
import Paper from 'components/kit/Paper'
import CardTitle from '../CardTitle'
import TextButton from '../../../../components/kit/Button/TextButton'
import BankItem from './BankItem'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: 40,
  },
  title: {
    marginBottom: 48,
  },
  text: {
    opacity: 0.5,
  },
}

const BankCard = ({ accounts, classes, className }) => (
  <Paper type="card" className={cx(classes.root, className)}>
    <CardTitle className={classes.title} text="Bank accounts" />
    {accounts && accounts.map(data => <BankItem {...data} />)}
    <div className={classes.contact}>
      <span className={classes.text}>
        To merge several bank accounts into one frank account,<br />please
      </span>
      <TextButton label="contact our support team." color="blue" />
    </div>
  </Paper>
)

BankCard.defaultProps = {
  accounts: [
    {
      bankLink: 'http://chase.com',
      accountName: 'Save the ocean',
      accountFourDigits: 6713,
      accountStatus: 'disconnected',
      accountBalance: 9120,
      accountLastUpdate: '20180908',
      accountNextUpdate: '20180908',
    },
    {
      bankLink: 'http://chase.com',
      accountName: 'Charity Water',
      accountFourDigits: 1038,
      accountStatus: 'connected',
      accountBalance: 15290,
      accountLastUpdate: '20180908',
      accountNextUpdate: '20180908',
    },
  ],
}

export default compose(injectStyles(styles))(BankCard)
