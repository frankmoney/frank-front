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
    <h2>Labels</h2>
    <Row centered>
      <Switch label="Switch" />
      <Switch label="Switch" hover />
      <Switch label="Switch" disabled />
    </Row>
    <Row centered>
      <Switch defaultChecked label="Switch" />
      <Switch defaultChecked label="Switch" hover />
      <Switch defaultChecked label="Switch" disabled />
    </Row>
    <h2>Larger</h2>
    <Row centered>
      <Switch larger label="Switch" />
      <Switch larger label="Switch" hover />
      <Switch larger label="Switch" disabled />
    </Row>
    <Row centered>
      <Switch larger defaultChecked label="Switch" />
      <Switch larger defaultChecked label="Switch" hover />
      <Switch larger defaultChecked label="Switch" disabled />
    </Row>
    <h2>Category colored</h2>
    <Row centered>
      <Switch defaultChecked color="#FF9C28" />
      <Switch defaultChecked color="#00DCEA" />
      <Switch defaultChecked color="#4C51F3" />
    </Row>
  </Demo>
)

export default injectStyles(styles)(SwitchesDemo)
