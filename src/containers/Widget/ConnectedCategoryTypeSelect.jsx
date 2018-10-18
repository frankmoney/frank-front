// @flow
import React from 'react'
import * as R from 'ramda'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CategoryTypeSelect from 'components/CategoryTypeSelect'
import { categoryTypeSelector } from './selectors'
import * as ACTIONS from './actions'

const ConnectedCategoryTypeSelect = ({ categoryType, className, onChange }) => (
  <CategoryTypeSelect
    className={className}
    onChange={onChange}
    value={categoryType}
  />
)

const mapStateToProps = createStructuredSelector({
  categoryType: categoryTypeSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    onChange: ACTIONS.selectCategoryType,
  },
])

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedCategoryTypeSelect)
