export default theme => ({
  root: {
    height: 119,
    display: 'flex',
    padding: [0, 30],
    alignItems: 'center',
  },
  avatar: {
    marginRight: 15,
  },
  avatarComponent: {
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
    ...theme.fontMedium(18, 46),
  },
  menu: {
    color: 'rgba(37, 43, 67, 0.5)',
  },
  menuDeleteUserItem: {
    color: '#ff3939',
  },
})
