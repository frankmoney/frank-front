import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import ButtonWidget from 'containers/widgets/ButtonWidget'
import InlineWidget from 'containers/widgets/InlineWidget'
import Title from 'containers/admin/Ledger/ChartCard/Title'

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
    <ButtonWidget expanded />

    <Title>Button widget (closed)</Title>
    <ButtonWidget />

    <Title>Inline widget 400x275</Title>
    <InlineWidget size={400} />

    <Title>Inline widget 500x345</Title>
    <InlineWidget size={500} />

    <Title>Inline widget 625x430</Title>
    <InlineWidget size={625} />

    <Title>Inline widget 800x550</Title>
    <InlineWidget size={800} />
  </div>
)

export default injectStyles(styles)(WidgetsDemo)
