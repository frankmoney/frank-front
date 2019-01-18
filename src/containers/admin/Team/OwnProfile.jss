export default theme => ({
  root: {
    height: 210,
    display: 'flex',
    flexWrap: 'wrap',
    padding: [0, 30],
    placeItems: 'center',
    placeContent: 'center',
  },
  userPicWrapper: {
    marginRight: 15,
  },
  userPic: {
    width: 90,
    height: 90,
    ...theme.fontMedium(30),
  },
  info: {
    flex: 1,
  },
  name: {
    ...theme.fontMedium(28, 46),
    color: '#252B43',
  },
  email: {
    color: 'rgba(37,43,67,0.4)',
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
})
