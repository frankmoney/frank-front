import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import Title from 'containers/Ledger/GraphOverviewCard/Title'
import ButtonWidget from './ButtonWidget'
import InlineWidget from './InlineWidget'
import StoriesPlaceholder from './StoriesPlaceholder'

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
    <ButtonWidget content={StoriesPlaceholder} expanded />

    <Title>Button widget (closed)</Title>
    <ButtonWidget content={StoriesPlaceholder} />

    <Title>Inline widget 400x275</Title>
    <InlineWidget size={400} content={StoriesPlaceholder} />

    <Title>Inline widget 500x345</Title>
    <InlineWidget size={500} content={StoriesPlaceholder} />

    <Title>Inline widget 625x430</Title>
    <InlineWidget size={625} content={StoriesPlaceholder} />

    <Title>Inline widget 800x550</Title>
    <InlineWidget size={800} content={StoriesPlaceholder} />
  </div>
)

export default injectStyles(styles)(WidgetsDemo)
