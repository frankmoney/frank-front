import React from 'react'
import { createPlainObjectSelector } from '@frankmoney/utils'
import { getFormValues } from 'redux-form/immutable'
import Button from 'components/kit/Button'
import reconnect from 'utils/reconnect'

const EchoFormDataButton = ({ form, data, onClick, ...props }) => (
  <Button onClick={event => onClick(event, data)} {...props} />
)

export default reconnect((_, props) => ({
  data: createPlainObjectSelector(getFormValues(props.form)),
}))(EchoFormDataButton)
