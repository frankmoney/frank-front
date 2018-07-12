import React from 'react'
import { Currency, Paper } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import CategorySelect from 'components/CategorySelect'
import CurrencyDelta from 'components/CurrencyDelta'
import CurrencyProvider from 'components/CurrencyProvider'
import Field from 'components/Field'
import FieldLabel from 'components/FieldLabel'
import InboxCard from 'components/InboxCard'
import TextBox from 'components/TextBox'

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
      <TextBox style={{ width: 200 }} />
    </Item>
    <Item>
      <TextBox style={{ width: 200 }} expand="vertically" />
    </Item>
    <Item>
      <CategorySelect />
    </Item>
    <Item>
      <Field
        style={{ width: 400, background: '#fff' }}
        label={
          <FieldLabel title="Recipient" hint="Had been reviewed previously" />
        }
      >
        <TextBox />
      </Field>
    </Item>
    <Item>
      <Field
        style={{ width: 400, background: '#fff' }}
        title="Description"
        hint="Added from similar payment"
      >
        <TextBox expand="vertically" />
      </Field>
    </Item>
    <CurrencyProvider code="USD">
      <Item>
        <InboxCard
          style={{ width: 850 }}
          createdAt="2018-01-01 19:05"
          delta={1392.32}
        />
      </Item>
      <Item>
        <InboxCard
          style={{ width: 850 }}
          createdAt="2018-01-01 05:00"
          delta={-124}
          recipientName="Adidas Group"
          categoryAddedFromSimilar
          categoryId="marketing"
          description="Something cool"
          descriptionAddedFromSimilar
          useForSimilar
        />
      </Item>
      <Item>
        <InboxCard
          style={{ width: 850 }}
          createdAt="2018-02-25 00:00"
          delta={-1244.548}
          recipientReviewed
          recipientName="Readymag"
          categoryAddedFromSimilar
          categoryId="marketing"
          description={'Something\r\nvery\r\nCOOL'}
          descriptionAddedFromSimilar
          useForSimilar
        />
      </Item>
    </CurrencyProvider>
  </div>
)

export default injectStyles(styles)(ComponentsDemo)
