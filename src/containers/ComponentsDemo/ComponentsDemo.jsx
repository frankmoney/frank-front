import React from 'react'
import { Currency, Paper } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import CurrencyDelta from 'components/CurrencyDelta'
import CurrencyProvider from 'components/CurrencyProvider'
import Field from 'components/Field'
import FieldLabel from 'components/FieldLabel'
import TextField from 'components/TextBox'

const Item = injectStyles({
  root: {
    margin: 5,
    padding: 5,
    background: '#e9e9e9',
  },
  wrap: {
    background: '#efefef',
  },
})(({ classes, children }) => (
  <Paper className={classes.root}>
    <div className={classes.wrap}>{children}</div>
  </Paper>
))

const styles = theme => ({
  root: {
    ...theme.fontRegular(14),
  },
})

const ComponentsDemo = ({ classes }) => (
  <div className={classes.root}>
    <Item>
      <Currency value={1625.4} />
    </Item>
    <Item>
      <CurrencyDelta symbol="$" value={-1234.5} />
    </Item>
    <Item>
      <CurrencyProvider code="USD">
        <CurrencyDelta value={123456.789} />
      </CurrencyProvider>
    </Item>
    <Item>
      <FieldLabel title="Recipient" hint="Had been reviewed previously" />
    </Item>
    <Item>
      <TextField style={{ width: 200 }} />
    </Item>
    <Item>
      <TextField style={{ width: 200 }} expand="vertically" />
    </Item>
    <Item>
      <Field
        style={{ width: 400, background: '#fff' }}
        label={
          <FieldLabel title="Recipient" hint="Had been reviewed previously" />
        }
      >
        <TextField />
      </Field>
    </Item>
    <Item>
      <Field
        style={{ width: 400, background: '#fff' }}
        title="Description"
        hint="Added from similar payment"
      >
        <TextField expand="vertically" />
      </Field>
    </Item>
  </div>
)

export default injectStyles(styles)(ComponentsDemo)
