// @flow strict-local
// spellchecker:ignore mmaa
import React from 'react'
import cx from 'classnames'
import { compose } from 'recompose'
import reconnect from 'utils/reconnect'
import { injectStyles } from 'utils/styles'
import Paper from 'components/kit/Paper'
import CardTitle from '../CardTitle'
import TextButton from '../../../../components/kit/Button/TextButton'
import { accountsSelector } from '../selectors'
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
      <TextButton
        external
        href="mailto:support@frank.ly"
        label="contact our support team."
        color="blue"
      />
    </div>
  </Paper>
)

export default compose(
  reconnect({ accounts: accountsSelector }),
  injectStyles(styles)
)(BankCard)
