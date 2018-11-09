export default theme => ({
  root: {
    padding: [40, 30],
  },
  header: {
    display: 'flex',
    position: 'relative',
    marginBottom: 43,
    ...theme.fontRegular(22),
  },
  createdAt: {
    flex: 1,
    color: '#20284A',
    opacity: 0.3,
  },
  info: {
    display: 'inline-flex',
    textAlign: 'right',
    whiteSpace: 'nowrap',
  },
  infoButton: {
    color: '#D3D5D9',
    display: 'inline-flex',
    height: 22,
    marginLeft: 12,
    width: 22,
  },
  body: {},
  field: {
    display: 'block',
    ...theme.fontRegular(14, 16),
  },
  recipient: {
    display: 'table-cell',
    width: '50%',
    minWidth: 400,
    paddingRight: 20,
  },
  peerName: {
    ...theme.fontMedium(22),
  },
  peerItem: {
    position: 'relative',
  },
  peerItemIcon: {
    display: 'none',
    position: 'absolute',
    left: 0,
    top: 0,
    width: 22,
    height: 22,
    color: theme.colors.green,
    '$peerName &': {
      display: 'block',
    },
  },
  peerItemName: {
    '$peerName &': {
      paddingLeft: 30, // space for icon
    },
  },
  peerTextBox: {
    ...theme.fontMedium(22, 30),
  },
  category: {
    display: 'table-cell',
    width: '50%',
    paddingLeft: 20,
  },
  categorySelect: {
    height: 'auto',
    ...theme.fontMedium(22, 26),
  },
  description: {
    marginTop: 42,
  },
  descriptionTextBox: {
    ...theme.fontRegular(22, 30),
  },
  footer: {
    paddingTop: 56,
    display: 'flex',
    '&:after': {
      content: '" "',
      display: 'table',
      clear: 'both',
    },
  },
  useForSimilar: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  useForSimilarHint: {
    marginLeft: 15,
    color: '#20284A',
    opacity: 0.4,
    ...theme.fontRegular(16, 22),
  },
  buttons: {
    display: 'flex',
    whiteSpace: 'nowrap',
    '& > *': {
      marginLeft: 10,
    },
  },
})
