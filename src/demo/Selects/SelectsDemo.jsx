// @flow
import { MoreHoriz } from 'material-ui-icons'
import React from 'react'
import * as R from 'ramda'
import ButtonMenu from 'components/kit/ButtonMenu'
import MenuItem from 'components/kit/Menu/MenuItem'
import SelectField from 'components/kit/SelectField'
import ToggleButton from 'components/kit/ToggleButton'
import Demo, { Row } from 'demo/Demo'
import { injectStyles } from 'utils/styles'

const styles = {
  centered: {
    justifyContent: 'space-around',
  },
}

const fakeAction = R.memoizeWith(R.identity, msg => () => alert(msg))

const renderEllipsisButton = popupState => (
  <ToggleButton.Icon
    icon={<MoreHoriz />}
    on={popupState.open}
    onClick={popupState.toggle}
    {...popupState.getAnchorProps()}
  />
)

export const ROLE_TEXT = {
  admin: 'Administrator',
  manager: 'Manager',
  observer: 'Observer',
}

const commaSeparatedValue = values =>
  !values || values.length === 0
    ? ''
    : values.map(value => ROLE_TEXT[value]).join(',')

const SelectListsDemo = ({ classes }) => (
  <Demo>
    <h1>ButtonMenu</h1>
    <Row className={classes.centered}>
      <ButtonMenu arrowEnd alignByArrow renderButton={renderEllipsisButton}>
        <MenuItem label="Publish" onSelect={fakeAction('published')} />
        <MenuItem color="red" label="Delete" onSelect={fakeAction('deleted')} />
      </ButtonMenu>
    </Row>
    <h1>Select</h1>
    <Row>
      <SelectField stretchDropdown label="Role" placeholder="Select team role">
        <MenuItem value="admin" label="Administrator" />
        <MenuItem value="manager" label="Manager" />
        <MenuItem value="observer" label="Observer" />
      </SelectField>
      <SelectField
        multiple
        formatValue={commaSeparatedValue}
        stretchDropdown
        label="Roles"
        placeholder="Select multiple roles"
      >
        <MenuItem value="admin" label="Administrator" />
        <MenuItem value="manager" label="Manager" />
        <MenuItem value="observer" label="Observer" />
      </SelectField>
    </Row>
  </Demo>
)

export default injectStyles(styles)(SelectListsDemo)
