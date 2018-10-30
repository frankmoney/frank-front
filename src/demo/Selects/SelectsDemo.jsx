// @flow
import { MoreHoriz } from 'material-ui-icons'
import React from 'react'
import * as R from 'ramda'
import { injectStyles } from '@frankmoney/ui'
import Select from 'components/kit/Select'
import SelectValue from 'components/kit/Select/SelectValue'
import ButtonMenu from 'components/kit/ButtonMenu'
import MenuItem from 'components/kit/Menu/MenuItem'
import Field from 'components/kit/fields/Field'
import ToggleButton from 'components/kit/ToggleButton'

const styles = {
  demo: {
    alignItems: 'center',
    background: '#fff',
    display: 'flex',
    color: '#252B43',
    flexDirection: 'column',
    width: 900,
    margin: '0 auto',
    paddingBottom: 300,
    paddingTop: 140,
    '& > h1': {
      fontSize: 60,
      lineHeight: 60,
      fontWeight: 500,
      '&:first-child': {
        marginTop: 0,
      },
    },
    '& > h2': {
      marginBottom: 50,
      fontSize: 40,
      lineHeight: 50,
      fontWeight: 500,
    },
  },
  hints: {
    fontSize: 16,
    lineHeight: 24,
    '& b': {
      fontWeight: 500,
    },
  },
  rowContent: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      marginRight: 30,
    },
  },
  row: {
    composes: '$rowContent',
    width: '100%',
    marginBottom: 50,
  },
  rowCentered: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 50,
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

const renderSelectValue = ({ value, getAnchorProps, getInputProps }) => (
  <SelectValue value={ROLE_TEXT[value]} {...getAnchorProps(getInputProps())} />
)
const renderFieldValue = ({
  value,
  getAnchorProps,
  active,
  getInputProps,
}) => (
  <Field floatingLabel="Role" {...getAnchorProps()} focus={active}>
    <SelectValue
      stretch
      active={active}
      style={{ width: 270 }}
      value={ROLE_TEXT[value]}
      {...getInputProps()}
    />
  </Field>
)

const renderMultiSelectValue = values =>
  !values || values.length === 0
    ? 'None selected'
    : values.map(value => ROLE_TEXT[value]).join(',')

const SelectListsDemo = ({ classes }) => (
  <div className={classes.demo}>
    <h1>ButtonMenu</h1>
    <div className={classes.rowCentered}>
      <ButtonMenu arrowEnd alignByArrow renderButton={renderEllipsisButton}>
        <MenuItem label="Publish" onSelect={fakeAction('published')} />
        <MenuItem color="red" label="Delete" onSelect={fakeAction('deleted')} />
      </ButtonMenu>
    </div>
    <h1>Select</h1>
    <div className={classes.row}>
      <Select align="start" renderInput={renderFieldValue}>
        <MenuItem value="admin" label="Administrator" />
        <MenuItem value="manager" label="Manager" />
        <MenuItem value="observer" label="Observer" />
      </Select>
      {/* <Select */}
      {/* defaultValue={['manager', 'observer']} */}
      {/* multiple */}
      {/* align="start" */}
      {/* renderValue={renderMultiSelectValue} */}
      {/* > */}
      {/* <MenuItem value="admin" label="Administrator" /> */}
      {/* <MenuItem value="manager" label="Manager" /> */}
      {/* <MenuItem value="observer" label="Observer" /> */}
      {/* </Select> */}
    </div>
  </div>
)

export default injectStyles(styles)(SelectListsDemo)
