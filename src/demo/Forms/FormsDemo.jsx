// @flow
import React from 'react'
import { injectStyles } from 'utils/styles'
import Demo, { Row } from 'demo/Demo'
import BasicForm from './BasicForm'

const styles = {}

const FormsDemo = () => (
  <Demo gray>
    <h1>Form</h1>
    <Row centered>
      <BasicForm />
    </Row>
  </Demo>
)

export default injectStyles(styles)(FormsDemo)
