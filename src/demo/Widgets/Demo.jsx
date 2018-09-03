import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import ButtonWidget from 'containers/Widget/ButtonWidget'
import Chart from 'containers/Widget/Chart'
import InlineWidget from 'containers/Widget/InlineWidget'
import Title from 'containers/Ledger/GraphOverviewCard/Title'
import { ChartPlaceholder, StoriesPlaceholder } from './Placeholders'

const styles = {
  demo: {
    alignItems: 'center',
    background: '#EBEBEB',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 100,
    '& > h2': {
      marginTop: 50,
    },
  },
}

const WidgetsDemo = ({ classes }) => (
  <div className={classes.demo}>
    <Title>Button widget</Title>
    <ButtonWidget
      stories={StoriesPlaceholder}
      charts={ChartPlaceholder}
      expanded
    />

    <Title>Button widget (closed)</Title>
    <ButtonWidget stories={StoriesPlaceholder} charts={ChartPlaceholder} />

    <Title>Inline widget 400x275</Title>
    <InlineWidget size={400} stories={StoriesPlaceholder} />

    <Title>Inline widget 500x345</Title>
    <InlineWidget size={500} stories={StoriesPlaceholder} />

    <Title>Inline widget 500x345 bars</Title>
    <InlineWidget paymentList size={500} stories={StoriesPlaceholder} />

    <Title>Inline widget 625x430</Title>
    <InlineWidget size={625} stories={StoriesPlaceholder} />

    <Title>Inline widget 625x430 bars</Title>
    <InlineWidget paymentList size={625} stories={StoriesPlaceholder} />

    <Title>Inline widget 800x550</Title>
    <InlineWidget size={800} stories={StoriesPlaceholder} />

    <Title>Inline widget 800x550 bars</Title>
    <InlineWidget paymentList size={800} stories={StoriesPlaceholder} />
  </div>
)

export default injectStyles(styles)(WidgetsDemo)
