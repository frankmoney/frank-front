export default theme => ({
  root: {
    padding: 30,
    '&:hover $roleWrap': {
      display: ({ large, acl: { remove, editRole } }) =>
        !large && (remove || editRole) ? 'none' : 'block',
    },
    '&:hover $overlay': {
      display: ({ large, acl: { remove, editRole } }) =>
        !large && (remove || editRole) ? 'flex' : 'none',
    },
  },
  body: {
    display: 'flex',
    alignItems: 'center',
  },
  avatarWrap: {
    marginRight: 15,
  },
  avatar: {
    width: ({ large }) => (large ? 90 : 60),
    height: ({ large }) => (large ? 90 : 60),
  },
  mainWrap: {
    flex: 1,
  },
  name: {
    ...theme.fontMedium(22, 34),
  },
  nameLarge: {
    ...theme.fontMedium(28, 46),
  },
  edit: {
    marginTop: 13,
    verticalAlign: 'top',
  },
  editIcon: {
    width: 22,
    height: 22,
  },
  email: {
    color: 'rgba(37, 43, 67, .5)',
    ...theme.fontRegular(18),
  },
  roleWrap: {
    textAlign: 'right',
    ...theme.fontRegular(18, 46),
  },
  admin: {
    color: '#21CB61',
  },
  overlay: {
    display: 'none',
    alignItems: 'center',
  },
  editRoleButton: {
    extend: 'button',
    '&:hover': {
      extend: 'buttonActive',
    },
    '&:active': {
      extend: 'buttonActive',
    },
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  changePasswordButton: {
    extend: 'button',
    '&:hover': {
      extend: 'buttonActive',
    },
    '&:active': {
      extend: 'buttonActive',
    },
  },
  removeButton: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  removeIcon: {
    width: 22,
    height: 22,
  },
  button: {
    ...theme.fontMedium(16, 22),
    backgroundColor: 'rgba(37, 43, 67, 0.04)',
    border: 0,
  },
  buttonActive: {
    backgroundColor: 'rgba(37, 43, 67, 0.04)',
    border: 0,
    color: '#4C51F3',
  },
})
