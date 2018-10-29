import React from 'react'
import * as R from 'ramda'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import HeaderFilterWithHint from 'components/HeaderFilterWithHint'
import MenuItemWithToggle from 'components/MenuItemWithToggle'
import colors from 'styles/colors'
import {
  includeRecipientsFilterSelector,
  includeDonorsFilterSelector,
  filterPeerTypeSelectedValueSelector,
} from '../selectors'
import * as ACTIONS from '../actions'

const PeerTypeFilter = ({
  selectedValue,
  includeDonors,
  toggleDonors,
  includeRecipients,
  toggleRecipients,
}) => (
  <HeaderFilterWithHint selectedValue={selectedValue} hint="Show">
    <MenuItemWithToggle
      toggleColor={colors.green}
      checked={includeDonors}
      onToggle={() => toggleDonors(!includeDonors)}
    >
      Donors
    </MenuItemWithToggle>
    <MenuItemWithToggle
      toggleColor={colors.green}
      checked={includeRecipients}
      onToggle={() => toggleRecipients(!includeRecipients)}
    >
      Recipients
    </MenuItemWithToggle>
  </HeaderFilterWithHint>
)

const mapStateToProps = createStructuredSelector({
  selectedValue: filterPeerTypeSelectedValueSelector,
  includeRecipients: includeRecipientsFilterSelector,
  includeDonors: includeDonorsFilterSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    toggleDonors: ACTIONS.toggleDonors,
    toggleRecipients: ACTIONS.toggleRecipients,
  },
])

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PeerTypeFilter)
