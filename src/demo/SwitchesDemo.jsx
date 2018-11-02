// @flow
import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import Demo, { Row } from 'demo/Demo'
import Checkbox from 'components/kit/Checkbox'

const styles = {}

const SwitchesDemo = () => (
  <Demo>
    <h1>Checkbox</h1>
    <Row centered>
      <Checkbox />
      <Checkbox defaultChecked />
      <Checkbox disabled />
    </Row>
  </Demo>
)

export default injectStyles(styles)(SwitchesDemo)
