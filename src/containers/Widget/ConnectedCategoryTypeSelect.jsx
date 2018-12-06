// @flow
import React from 'react'
import * as R from 'ramda'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CategoryTypeSelect from 'components/CategoryTypeSelect'
import { pieTotalSelector } from './selectors'
import * as ACTIONS from './actions'

const ConnectedCategoryTypeSelect = ({ categoryType, className, onChange }) => (
  <CategoryTypeSelect
    className={className}
    onChange={onChange}
    value={categoryType}
  />
)

const mapStateToProps = createStructuredSelector({
  categoryType: pieTotalSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    onChange: ACTIONS.selectPieTotal,
  },
])

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedCategoryTypeSelect)
