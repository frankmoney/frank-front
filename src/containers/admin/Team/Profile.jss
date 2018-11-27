export default theme => ({
  root: {
    height: 119,
    display: 'flex',
    padding: [0, 30],
    alignItems: 'center',
    '&:hover $removeButton': {
      visibility: 'visible',
    },
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
  removeButton: {
    visibility: 'hidden',
  },
  menu: {
    color: 'rgba(37, 43, 67, 0.5)',
  },
  menuDeleteUserItem: {
    color: '#ff3939',
  },
})
