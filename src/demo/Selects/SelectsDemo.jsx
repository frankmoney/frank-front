// @flow
import React from 'react'
import * as R from 'ramda'
import { MoreHoriz } from 'material-ui-icons'
import FilterSelect from 'components/kit/FilterSelect'
import ButtonMenu from 'components/kit/ButtonMenu'
import MenuItem from 'components/kit/Menu/MenuItem'
import SelectField from 'components/kit/SelectField'
import ToggleButton from 'components/kit/ToggleButton'
import CategoryTypeSelect from 'components/CategoryTypeSelect'
import CategorySelect from 'components/CategorySelect'
import Demo, { Row } from 'demo/Demo'
import { DEFAULT_CATEGORIES, UNCATEGORIZED_CATEGORY } from 'const'
// eslint-disable-next-line no-alert
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

const CATEGORIES = DEFAULT_CATEGORIES.map((cat, idx) => ({ id: idx, ...cat }))
const CATEGORIES_UNCATEGORIZED = [UNCATEGORIZED_CATEGORY, ...CATEGORIES]

const SelectsDemo = () => (
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
      <FilterSelect defaultValue="date" dropdownWidth={220}>
        <MenuItem value="date" label="Date" />
        <MenuItem value="name" label="Name" />
        <MenuItem value="total" label="Total" />
      </FilterSelect>
    </Row>
    <h1>Category Select</h1>
    <h2>Placeholder</h2>
    <Row centered>
      <CategorySelect categories={CATEGORIES} />
    </Row>
    <h2>Default value</h2>
    <Row centered>
      <CategorySelect
        categories={CATEGORIES_UNCATEGORIZED}
        defaultValue={UNCATEGORIZED_CATEGORY.id}
      />
    </Row>
    <h2>Container and dropdown overflow</h2>
    <Row centered>
      <CategorySelect
        categories={CATEGORIES}
        defaultValue={2}
        style={{ maxWidth: 180 }}
        dropdownWidth={150}
      />
    </Row>
    <h1>Category type select</h1>
    <Row centered>
      <CategoryTypeSelect />
    </Row>
  </Demo>
)

export default SelectsDemo
