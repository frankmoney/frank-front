// @flow strict-local
import qs from 'querystring'
import React from 'react'
import { branch, compose, lifecycle, renderComponent } from 'recompose'
import { FixedHeader, BreadcrumbsItem } from '@frankmoney/components'
import { IconPlainButton } from 'components/kit/Button'
import Dialog, { ConfirmDialog } from 'components/kit/Dialog'
import AreaSpinner from 'components/AreaSpinner'
import Breadcrumbs from 'components/Breadcrumbs'
import ListLayoutContent from 'components/ListLayoutContent'
import Snack from 'components/kit/Snack'
import reconnect from 'utils/reconnect'
import { injectStyles } from 'utils/styles'
import ChangeTeamNamePopoverDialog from './ChangeTeamNamePopoverDialog'
import InviteButton from './InviteButton'
import InviteDrawer from './InviteDrawer'
import OwnProfile from './OwnProfile'
import Pencil from './Pencil.svg'
import ProfileList from './ProfileList'
import Welcome from './Welcome.svg'
import ACTIONS from './actions'
import {
  acceptingInviteSelector,
  welcomePopupOpenSelector,
  leaveTeamConfirmationPopupOpenSelector,
  canInviteSelector,
  inviteDrawerOpenSelector,
  invitesSelector,
  loadedSelector,
  loadingSelector,
  teamSelector,
  inviteCreatorSelector,
  inviteTeamSelector,
  otherProfilesSelector,
  ownProfileSelector,
  changeTeamNameSnackShownSelector,
} from './selectors'

const styles = theme => ({
  teamName: {
    ...theme.fontRegular(20),
  },
  changeTeamNameButton: {
    marginLeft: 10,
  },
  changeTeamNameButtonIcon: {
    width: 20,
    height: 20,
  },
  welcomePopup: {
    display: 'flex',
    width: 750,
  },
  welcomeLeft: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 50,
  },
  welcomeTitle: {
    marginBottom: 15,
  },
  welcomeMessage: {
    flex: 1,
  },
  welcomeButton: {
    width: 150,
    flexGrow: 0,
  },
  welcomeImage: {
    minWidth: 267,
  },
  strong: {
    fontWeight: 600,
  },
})

const Team = ({
  classes,
  acceptingInvite,
  welcomePopupOpen,
  leaveTeamConfirmationPopupOpen,
  canInvite,
  team,
  inviteCreator,
  inviteTeam,
  invites,
  ownProfile,
  otherProfiles,
  inviteDrawerOpen,
  acknowledgeInvite,
  acceptInvite,
  rejectInvite,
  changeTeamNameSnackShown,
  hideChangeTeamNameSnack,
}) => (
  <>
    <FixedHeader>
      <Breadcrumbs>
        <BreadcrumbsItem>
          Team:&nbsp;
          <span className={classes.teamName}>{team.name}</span>&nbsp;
          <ChangeTeamNamePopoverDialog>
            <IconPlainButton
              className={classes.changeTeamNameButton}
              icon={<Pencil className={classes.changeTeamNameButtonIcon} />}
            />
          </ChangeTeamNamePopoverDialog>
          <Snack
            color="dark"
            shown={changeTeamNameSnackShown}
            message="Your team's name was changed!"
            dismissByTimeout={3000}
            onDismiss={hideChangeTeamNameSnack}
          />
        </BreadcrumbsItem>
      </Breadcrumbs>
    </FixedHeader>

    <ListLayoutContent>
      {canInvite && <InviteButton />}
      <OwnProfile profile={ownProfile} />
      <ProfileList profiles={otherProfiles} invites={invites} />
    </ListLayoutContent>

    <Dialog className={classes.welcomePopup} open={welcomePopupOpen}>
      <div className={classes.welcomeLeft}>
        <Dialog.Title className={classes.welcomeTitle}>Welcome!</Dialog.Title>
        <Dialog.Message className={classes.welcomeMessage}>
          Congratulations on joining the{' '}
          <strong className={classes.strong}>{team.name}</strong> team!
        </Dialog.Message>
        <Dialog.Buttons>
          <Dialog.Button
            className={classes.welcomeButton}
            color="green"
            label="Get started"
            onClick={() => acknowledgeInvite()}
          />
        </Dialog.Buttons>
      </div>
      <Welcome className={classes.welcomeImage} />
    </Dialog>

    <ConfirmDialog
      title="Change team?"
      message={
        <>
          You are the only person left in{' '}
          <strong className={classes.strong}>{team.name}</strong> organization.
          Accepting{' '}
          <strong className={classes.strong}>{inviteCreator}&apos;s</strong>{' '}
          invitation from{' '}
          <strong className={classes.strong}>{inviteTeam}</strong> will leave
          your current organization empty, are you sure you want to continue?
        </>
      }
      confirmLabel="Change team"
      confirmButtonProps={{
        loading: acceptingInvite,
      }}
      cancelLabel="Cancel"
      cancelButtonProps={{
        disabled: acceptingInvite,
      }}
      open={leaveTeamConfirmationPopupOpen}
      onConfirm={() => acceptInvite()}
      onCancel={() => rejectInvite()}
    />

    <InviteDrawer open={inviteDrawerOpen} />
  </>
)

export default compose(
  reconnect(
    {
      loaded: loadedSelector,
      loading: loadingSelector,
      acceptingInvite: acceptingInviteSelector,
      welcomePopupOpen: welcomePopupOpenSelector,
      leaveTeamConfirmationPopupOpen: leaveTeamConfirmationPopupOpenSelector,
      canInvite: canInviteSelector,
      team: teamSelector,
      inviteCreator: inviteCreatorSelector,
      inviteTeam: inviteTeamSelector,
      ownProfile: ownProfileSelector,
      invites: invitesSelector,
      otherProfiles: otherProfilesSelector,
      inviteDrawerOpen: inviteDrawerOpenSelector,
      changeTeamNameSnackShown: changeTeamNameSnackShownSelector,
    },
    {
      load: ACTIONS.load,
      leave: ACTIONS.leave,
      acknowledgeInvite: ACTIONS.acknowledgeInvite,
      acceptInvite: ACTIONS.acceptInvite,
      rejectInvite: ACTIONS.rejectInvite,
      hideChangeTeamNameSnack: ACTIONS.hideChangeTeamNameSnack,
    }
  ),
  lifecycle({
    componentWillMount() {
      if (!this.props.loaded) {
        const query =
          this.props.location &&
          typeof this.props.location.search === 'string' &&
          qs.parse(this.props.location.search.substr(1))

        this.props.load({ inviteToken: query && query.i })
      }
    },
    componentWillUnmount() {
      this.props.leave()
    },
  }),
  branch(props => !props.loaded || props.loading, renderComponent(AreaSpinner)),
  injectStyles(styles)
)(Team)
