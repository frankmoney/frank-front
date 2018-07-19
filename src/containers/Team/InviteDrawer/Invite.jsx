import React from 'react'
import { Button } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import SendIcon from 'material-ui-icons/Send'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { compose, lifecycle, withStateHandlers } from 'recompose'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'
import Drawer from 'components/Drawer'
import AccessField from '../form/AccessField'
import AdminField from '../form/AdminField'
import CanInviteField from '../form/CanInviteField'
import EmailField from '../form/EmailField'
import NoteField from '../form/NoteField'
import ACTIONS from './actions'
import {
  loadedSelector,
  loadingSelector,
  accessItemsSelector,
} from './selectors'

const mapStateToProps = createStructuredSelector({
  loaded: loadedSelector,
  loading: loadingSelector,
  accessItems: accessItemsSelector,
})

const mapDispatchToProps = R.partial(bindActionCreators, [
  {
    load: ACTIONS.load,
    leave: ACTIONS.leave,
    handleDoneClick: ACTIONS.submit,
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
  admin,
  canInvite,
  email,
  access,
  accessItems,
  note,
  handleAdminChange,
  handleCanInviteChange,
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
          <AccessField items={accessItems} access={access} />
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
        this.props.load()
      }
    },
    componentWillUnmount() {
      this.props.leave()
    },
  }),
  withStateHandlers(
    {
      admin: false,
      canInvite: false,
      email: '',
      access: {},
      note: '',
    },
    {
      handleAdminChange: () => checked => ({ admin: checked }),
      handleCanInviteChange: () => checked => ({ canInvite: checked }),
      handleEmailChange: () => value => ({ email: value }),
      handleNoteChange: () => value => ({ note: value }),
    }
  ),
  injectStyles(styles)
)(Invite)
