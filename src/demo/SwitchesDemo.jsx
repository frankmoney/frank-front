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
      <Checkbox hover />
      <Checkbox defaultChecked />
      <Checkbox defaultChecked hover />
      <Checkbox disabled />
    </Row>
    <Row centered>
      <Checkbox color="green" />
      <Checkbox color="green" hover />
      <Checkbox color="green" defaultChecked />
      <Checkbox color="green" defaultChecked hover />
      <Checkbox color="green" disabled />
    </Row>
    <Row centered>
      <Checkbox label="On" />
      <Checkbox label="On" hover />
      <Checkbox label="On" defaultChecked />
      <Checkbox label="On" defaultChecked hover />
      <Checkbox label="On" disabled />
    </Row>
    <Row centered>
      <Checkbox label="On" color="green" />
      <Checkbox label="On" color="green" hover />
      <Checkbox label="On" color="green" defaultChecked />
      <Checkbox label="On" color="green" defaultChecked hover />
      <Checkbox label="On" color="green" disabled />
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
