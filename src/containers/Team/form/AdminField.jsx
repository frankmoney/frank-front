import React from 'react'
import { Switch } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import InfoIcon from 'material-ui-icons/InfoOutline'
import colors from 'styles/colors'
import Field from './Field'

const styles = {
  infoIcon: {
    position: 'absolute',
    top: -1,
    right: -30,
    width: 22,
    height: 22,
    color: '#d3d5d9',
  },
}

const AdminField = ({ classes, checked, onChange }) => (
  <Field
    title={
      <>
        Administrator
        <InfoIcon className={classes.infoIcon} />
      </>
    }
  >
    <Switch
      color={colors.green}
      checked={checked}
      onChange={({ target }) => onChange(target.checked)}
    />
  </Field>
)

export default injectStyles(styles)(AdminField)
