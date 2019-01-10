// @flow strict-local
import React from 'react'
import ButtonWidget from 'containers/widgets/ButtonWidget'
import InlineWidget from 'containers/widgets/InlineWidget'
import Demo, { Row } from 'demo/Demo'

const WidgetsDemo = () => (
  <Demo>
    <h2>Button widget</h2>
    <Row centered>
      <ButtonWidget accountId={4} open />
    </Row>

    <h2>Button widget (closed)</h2>
    <Row centered>
      <ButtonWidget accountId={18} />
    </Row>

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

export default WidgetsDemo
