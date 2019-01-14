// @flow strict-local
import React from 'react'
import ButtonWidget from 'widget/components/ButtonWidget'
import InlineWidget from 'containers/widgets/InlineWidget'
import Demo, { Row } from 'demo/Demo'
import { injectStyles } from 'utils/styles'

const styles = {
  demo: {},
  buttonDemo: {
    '$demo > &': {
      margin: [40, 0, -25],
    },
  },
}

const WidgetsDemo = ({ classes }) => (
  <Demo className={classes.demo}>
    <h2 className={classes.buttonDemo}>Button widget ➘</h2>
    <ButtonWidget accountId={18} />

    <h2>Inline widget 280x190</h2>
    <Row centered>
      <InlineWidget accountId={4} size={280} />
    </Row>

    <h2>Inline widget 400x275</h2>
    <Row centered>
      <InlineWidget accountId={4} size={400} />
    </Row>

    <h2>Inline widget 500x345</h2>
    <Row centered>
      <InlineWidget accountId={4} size={500} />
    </Row>

    <h2>Inline widget 625x430</h2>
    <Row centered>
      <InlineWidget accountId={4} size={625} />
    </Row>

    <h2>Inline widget 800x550</h2>
    <Row centered>
      <InlineWidget accountId={4} size={800} />
    </Row>
  </Demo>
)

export default injectStyles(styles)(WidgetsDemo)
