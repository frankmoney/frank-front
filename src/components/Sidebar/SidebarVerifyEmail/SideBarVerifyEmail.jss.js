export default theme => ({
  verifyEmail: {
    padding: [0, 24],
  },
  icon: {
    marginBottom: 14,
    color: 'black',
    width: 22,
    height: 22,
    position: 'relative',
    left: -2,
  },
  message: {
    marginBottom: 12,
    ...theme.fontRegular(16, 20),
    overflow: 'hidden',
  },
  messageEmphasize: {
    fontWeight: 500,
  },
  button: {
    ...theme.fontMedium(14, 20),
    textTransform: 'uppercase',
    color: 'rgba(0,0,0,0.34)',
    cursor: 'pointer',
    userSelect: 'none',
  },
})
