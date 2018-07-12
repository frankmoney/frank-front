import React from 'react'
import cx from 'classnames'
import { Currency } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import Card from 'containers/Card'
import CategorySelect from 'components/CategorySelect'
import CurrencyDelta from 'components/CurrencyDelta'
import CurrencyProvider from 'components/CurrencyProvider'
import Field from 'components/Field'
import FieldLabel from 'components/FieldLabel'
import InboxCard from 'components/InboxCard'
import TextBox from 'components/TextBox'
import Title from 'containers/Ledger/GraphOverviewCard/Title'

const styles = theme => ({
  root: {
    ...theme.fontRegular(14),
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    '&:not(:last-child)': {
      marginBottom: 20,
    },
  },
  card: {
    marginTop: 35,
    width: 850,
    '&:last-child': {
      marginBottom: 180,
    },
  },
})

const Item = injectStyles(styles)(({ classes, children }) => (
  <div className={classes.item}>{children}</div>
))

const DemoCard = injectStyles(styles)(({ children, classes, className }) => (
  <Card className={cx(classes.card, className)}>{children}</Card>
))

const ComponentsDemo = ({ classes }) => (
  <div className={classes.root}>
    <DemoCard>
      <Title>Currency formatter</Title>
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
    </DemoCard>

    <DemoCard>
      <Title>FieldLabel</Title>
      <Item>
        <FieldLabel title="Recipient" hint="Had been reviewed previously" />
      </Item>
      <Item>
        <TextBox style={{ width: 200 }} />
      </Item>
      <Item>
        <TextBox style={{ width: 200 }} expand="vertically" />
      </Item>
    </DemoCard>

    <DemoCard>
      <Title>Field TextField</Title>
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
    </DemoCard>

    <DemoCard>
      <Title>CategorySelect</Title>
      <CategorySelect />
    </DemoCard>

    <CurrencyProvider code="USD">
      <InboxCard
        className={classes.card}
        createdAt="2018-01-01 19:05"
        delta={1392.32}
      />

      <InboxCard
        className={classes.card}
        createdAt="2018-01-01 05:00"
        delta={-124}
        recipientName="Adidas Group"
        categoryAddedFromSimilar
        categoryId="marketing"
        description="Something cool"
        descriptionAddedFromSimilar
        useForSimilar
      />

      <InboxCard
        className={classes.card}
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
    </CurrencyProvider>
  </div>
)

export default injectStyles(styles)(ComponentsDemo)
