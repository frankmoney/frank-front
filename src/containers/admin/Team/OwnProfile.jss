export default theme => ({
  root: {
    height: 210,
    display: 'flex',
    flexWrap: 'wrap',
    padding: [0, 30],
    placeItems: 'center',
    placeContent: 'center',
  },
  avatar: {
    marginRight: 15,
  },
  avatarComponent: {
    width: 90,
    height: 90,
  },
  info: {
    flex: 1,
  },
  name: {
    ...theme.fontMedium(28, 46),
  },
  email: {
    color: 'rgba(37, 43, 67, .5)',
    ...theme.fontRegular(18),
  },
  role: {
    textAlign: 'right',
    color: 'rgba(37, 43, 67, 0.5)',
    ...theme.fontMedium(18, 46),
  },
  footer: {
    paddingTop: 25,
    flexBasis: '100%',
  },
  changePasswordButton: {
    '&:hover': {
      backgroundColor: 'rgba(76, 81, 243, 0.07)',
      color: '#4C51F3',
    },
    '&:active': {
      backgroundColor: 'rgba(76, 81, 243, 0.07)',
      color: '#4C51F3',
    },
  },
  changePasswordPopup: {
    width: 350,
  },
  changePasswordPopupField: {
    paddingBottom: 30,
  },
  changePasswordPopupInput: {
    display: 'flex',
    ...theme.fontRegular(18),
  },
  changePasswordPopupButtons: {
    display: 'flex',
    placeContent: 'space-between',
  },
  changePasswordPopupButton: {
    width: 135,
  },
})
