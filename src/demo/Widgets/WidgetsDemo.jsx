// @flow strict-local
import React from 'react'
import ButtonWidget from 'components/widgets/ButtonWidget'
import InlineWidget from 'components/widgets/InlineWidget'
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

const PUBLIC_ACCOUNT_ID = 1

const WidgetsDemo = ({ classes }) => (
  <Demo className={classes.demo}>
    <h2 className={classes.buttonDemo}>Button widget ➘</h2>
    <ButtonWidget accountId={PUBLIC_ACCOUNT_ID} zIndex={100} />

    <h2>Inline widget 280x190</h2>
    <Row centered>
      <InlineWidget accountId={PUBLIC_ACCOUNT_ID} width={280} />
    </Row>

    <h2>Inline widget 350px</h2>
    <Row centered>
      <InlineWidget accountId={PUBLIC_ACCOUNT_ID} width={350} />
    </Row>

    <h2>Inline widget 400x275</h2>
    <Row centered>
      <InlineWidget accountId={PUBLIC_ACCOUNT_ID} width={400} />
    </Row>

    <h2>Inline widget 450px</h2>
    <Row centered>
      <InlineWidget accountId={PUBLIC_ACCOUNT_ID} width={450} />
    </Row>

    <h2>Inline widget 500x345</h2>
    <Row centered>
      <InlineWidget accountId={PUBLIC_ACCOUNT_ID} width={500} />
    </Row>

    <h2>Inline widget 625x430</h2>
    <Row centered>
      <InlineWidget accountId={PUBLIC_ACCOUNT_ID} width={625} />
    </Row>

    <h2>Inline widget 700px</h2>
    <Row centered>
      <InlineWidget accountId={PUBLIC_ACCOUNT_ID} width={700} />
    </Row>

    <h2>Inline widget 800x550</h2>
    <Row centered>
      <InlineWidget accountId={PUBLIC_ACCOUNT_ID} width={800} />
    </Row>
  </Demo>
)

export default injectStyles(styles)(WidgetsDemo)
