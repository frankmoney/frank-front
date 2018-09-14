export default theme => ({
  root: {
    height: 119,
    '& > *': {
      alignItems: 'center',
    },
  },
  avatar: {
    marginRight: 15,
  },
  avatarBody: {
    width: 60,
    height: 60,
  },
  info: {
    flex: 1,
  },
  name: {
    ...theme.fontMedium(22, 34),
  },
  email: {
    color: 'rgba(37, 43, 67, .5)',
    ...theme.fontRegular(18),
  },
  role: {
    textAlign: 'right',
    ...theme.fontRegular(18, 46),
  },
  menu: {
    width: 220,
  },
  menuDeleteUser: {
    color: '#ff3939',
  },
})
