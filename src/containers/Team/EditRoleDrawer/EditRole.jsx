import React from 'react'
import { Button } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import Drawer from 'components/Drawer'
import AccountsField from '../form/AccountsField'
import AdminField from '../form/AdminField'
import CanInviteField from '../form/CanInviteField'
import ACTIONS from './actions'
import {
  loadedSelector,
  loadingSelector,
  accountsSelector,
  lastNameSelector,
  firstNameSelector,
  adminSelector,
  canInviteSelector,
  accountIdsSelector,
} from './selectors'

const mapStateToProps = createStructuredSelector({
  loaded: loadedSelector,
  loading: loadingSelector,
  accounts: accountsSelector,
  lastName: lastNameSelector,
  firstName: firstNameSelector,
  admin: adminSelector,
  canInvite: canInviteSelector,
  accountIds: accountIdsSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    load: ACTIONS.load,
    leave: ACTIONS.leave,
    handleDoneClick: ACTIONS.submit,
    handleAdminChange: admin => ACTIONS.change({ admin }),
    handleCanInviteChange: canInvite => ACTIONS.change({ canInvite }),
    handleAccountsChange: accountIds => ACTIONS.change({ accountIds }),
  },
])

const styles = {
  footer: {
    boxShadow: 'none',
  },
}

const EditRole = ({
  classes,
  accounts,
  lastName,
  firstName,
  admin,
  canInvite,
  accountIds,
  handleAdminChange,
  handleCanInviteChange,
  handleAccountsChange,
  handleDoneClick,
}) => (
  <>
    <Drawer.Header>
      <Drawer.Title>Edit role</Drawer.Title>
    </Drawer.Header>
    <Drawer.Body>
      <AdminField checked={admin} onChange={handleAdminChange} />
      {admin || (
        <>
          <AccountsField
            accounts={accounts}
            selection={accountIds}
            onChange={({ target: { value, checked } }) =>
              handleAccountsChange(
                checked
                  ? R.uniq(R.append(value, accountIds))
                  : R.without([value], accountIds)
              )
            }
          />
          <CanInviteField
            checked={canInvite}
            onChange={handleCanInviteChange}
          />
        </>
      )}
    </Drawer.Body>
    <Drawer.Footer className={classes.footer}>
      Editing {firstName} {lastName}
      <Button fat type="primary" label="Done" onClick={handleDoneClick} />
    </Drawer.Footer>
  </>
)

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentWillMount() {
      if (!this.props.loaded) {
        this.props.load({ id: this.props.id })
      }
    },
    componentWillUnmount() {
      this.props.leave()
    },
  }),
  injectStyles(styles)
)(EditRole)
