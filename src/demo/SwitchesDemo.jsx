// @flow
import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import Demo, { Row } from 'demo/Demo'
import Checkbox from 'components/kit/Checkbox'
import Switch from 'components/kit/Switch'

const styles = {}

const SwitchesDemo = () => (
  <Demo>
    <h1>Checkbox</h1>
    <Row centered>
      <Checkbox />
      <Checkbox defaultChecked />
      <Checkbox disabled />
    </Row>
    <h1>Switch</h1>
    <Row centered>
      <Switch />
      <Switch hover />
      <Switch disabled />
    </Row>
    <Row centered>
      <Switch defaultChecked />
      <Switch defaultChecked hover />
      <Switch defaultChecked disabled />
    </Row>
  </Demo>
)

export default injectStyles(styles)(SwitchesDemo)
