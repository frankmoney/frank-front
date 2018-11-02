// @flow
import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import Demo, { Row } from 'demo/Demo'
import Checkbox from 'components/kit/Checkbox'

const styles = {
  centered: {
    justifyContent: 'center',
  },
}

const SwitchesDemo = ({ classes }) => (
  <Demo>
    <h1>Checkbox</h1>
    <Row className={classes.centered}>
      <Checkbox />
      <Checkbox defaultChecked />
      <Checkbox disabled />
    </Row>
  </Demo>
)

export default injectStyles(styles)(SwitchesDemo)
