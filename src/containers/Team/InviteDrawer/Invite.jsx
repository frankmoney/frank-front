import React from 'react'
import { Button } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import SendIcon from 'material-ui-icons/Send'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import Drawer from 'components/Drawer'
import AccountsField from '../form/AccountsField'
import AdminField from '../form/AdminField'
import CanInviteField from '../form/CanInviteField'
import EmailField from '../form/EmailField'
import NoteField from '../form/NoteField'
import ACTIONS from './actions'
import {
  loadedSelector,
  loadingSelector,
  accountsSelector,
  adminSelector,
  canInviteSelector,
  accountIdsSelector,
  emailSelector,
  noteSelector,
} from './selectors'

const mapStateToProps = createStructuredSelector({
  loaded: loadedSelector,
  loading: loadingSelector,
  accounts: accountsSelector,
  admin: adminSelector,
  canInvite: canInviteSelector,
  accountIds: accountIdsSelector,
  email: emailSelector,
  note: noteSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    load: ACTIONS.load,
    leave: ACTIONS.leave,
    handleDoneClick: ACTIONS.submit,
    handleAdminChange: admin => ACTIONS.change({ admin }),
    handleCanInviteChange: canInvite => ACTIONS.change({ canInvite }),
    handleAccountsChange: accountIds => ACTIONS.change({ accountIds }),
    handleEmailChange: email => ACTIONS.change({ email }),
    handleNoteChange: note => ACTIONS.change({ note }),
  },
])

const styles = theme => ({
  footer: {
    boxShadow: 'none',
  },
  sendHint: {
    ...theme.fontRegular(14, 20),
    color: 'rgba(37, 43, 67, .5)',
  },
})

const Invite = ({
  classes,
  accounts,
  admin,
  canInvite,
  accountIds,
  email,
  note,
  handleAdminChange,
  handleCanInviteChange,
  handleAccountsChange,
  handleEmailChange,
  handleNoteChange,
  handleDoneClick,
}) => (
  <>
    <Drawer.Header>
      <Drawer.Title>Invite a teammate</Drawer.Title>
    </Drawer.Header>
    <Drawer.Body>
      <EmailField value={email} onChange={handleEmailChange} />
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
      <NoteField value={note} onChange={handleNoteChange} />
    </Drawer.Body>
    <Drawer.Footer className={classes.footer}>
      <div className={classes.sendHint}>
        We will notify you via email when<br />
        your teammate accepts your invitation
      </div>
      <Button
        fat
        type="primary"
        label="Send invitation"
        icon={SendIcon}
        onClick={handleDoneClick}
      />
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
)(Invite)
