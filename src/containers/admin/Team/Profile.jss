export default theme => ({
  root: {
    height: 120,
    display: 'flex',
    padding: [0, 30],
    alignItems: 'center',
    '&:hover $removeButton': {
      visibility: 'visible',
    },
  },
  avatar: {
    marginRight: 17,
  },
  avatarComponent: {
    width: 60,
    height: 60,
  },
  info: {
    flex: 1,
  },
  name: {
    ...theme.fontMedium(22, 31),
    color: '#252B43',
  },
  email: {
    color: 'rgba(37,43,67,0.4)',
    ...theme.fontRegular(20),
  },
  removeButton: {
    visibility: 'hidden',
  },
})
