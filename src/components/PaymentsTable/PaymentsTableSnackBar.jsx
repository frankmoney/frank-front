import React from 'react'
import { withPropsOnChange } from 'recompose'
import {
  Edit as IconMultipleEdit,
  Close as IconDismiss,
} from 'material-ui-icons'
import { SnackBar, SnackBarIconButton } from '@frankmoney/components'

export default withPropsOnChange(
  ['selectedIds', 'onEditSelected', 'onDismiss'],
  props => ({
    shown: props.selectedIds.length,
    message: <span>{`${props.selectedIds.length} payments selected`}</span>,
    theme: 'grey',
    buttons: [
      <SnackBarIconButton
        iconComponent={IconMultipleEdit}
        onClick={props.onEditSelected}
      />,
      <SnackBarIconButton
        iconComponent={IconDismiss}
        onClick={props.onDismiss}
      />,
    ],
  })
)(SnackBar)
