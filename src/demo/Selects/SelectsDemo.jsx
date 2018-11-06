// @flow
import { MoreHoriz } from 'material-ui-icons'
import React from 'react'
import * as R from 'ramda'
import { toRenderProps, withState } from 'recompose'
import FilterSelect from 'components/kit/FilterSelect'
import ButtonMenu from 'components/kit/ButtonMenu'
import Button from 'components/kit/Button'
import Modal from 'components/kit/Modal'
import Paper from 'components/kit/Paper'
import MenuItem from 'components/kit/Menu/MenuItem'
import SelectField from 'components/kit/SelectField'
import ToggleButton from 'components/kit/ToggleButton'
import Demo, { Row } from 'demo/Demo'
import { injectStyles } from 'utils/styles'

const styles = {}

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

const ModalState = toRenderProps(withState('open', 'toggle', false))

const SelectListsDemo = () => (
  <Demo>
    <h1>ButtonMenu</h1>
    <Row centered>
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
    <h1>Filter Select</h1>
    <Row centered>
      <FilterSelect defaultValue="date">
        <MenuItem value="date" label="Date" />
        <MenuItem value="name" label="Name" />
        <MenuItem value="total" label="Total" />
      </FilterSelect>
    </Row>
    <h1>Modal</h1>
    <ModalState>
      {({ open, toggle }) => (
        <Row centered>
          <>
            <Button onClick={() => toggle(true)} label="Open modal" />
            <Modal open={open} onClose={() => toggle(false)}>
              <Paper
                type="modal"
                style={{
                  width: 400,
                  height: 500,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                This is a modal press ESC to leave
                <ButtonMenu
                  arrowAt="center"
                  alignByArrow
                  renderButton={renderEllipsisButton}
                >
                  <MenuItem
                    label="Publish"
                    onSelect={fakeAction('published')}
                  />
                  <MenuItem
                    color="red"
                    label="Delete"
                    onSelect={fakeAction('deleted')}
                  />
                </ButtonMenu>
                <ModalState>
                  {({ open: openSecond, toggle: toggleSecond }) => (
                    <>
                      <Button
                        onClick={() => toggleSecond(true)}
                        label="Open modal"
                      />
                      <Modal
                        open={openSecond}
                        onClose={() => toggleSecond(false)}
                      >
                        <Paper
                          type="modal"
                          style={{
                            width: 200,
                            height: 300,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          This is a Second modal
                        </Paper>
                      </Modal>
                    </>
                  )}
                </ModalState>
              </Paper>
            </Modal>
          </>
        </Row>
      )}
    </ModalState>
  </Demo>
)

export default injectStyles(styles)(SelectListsDemo)
