export default theme => ({
  root: {
    background: '#fff',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.07)',
    borderRadius: 8,
  },
  header: {
    display: 'flex',
    padding: [40, 37, 42, 40],
    ...theme.fontRegular(22, 20),
  },
  createdAt: {
    flex: 1,
    color: '#20284A',
    opacity: 0.3,
  },
  info: {
    textAlign: 'right',
    whiteSpace: 'nowrap',
  },
  infoButton: {
    width: 22,
    height: 22,
    marginLeft: 12,
    verticalAlign: 'bottom',
    color: 'rgba(37, 43, 67, 0.3)',
  },
  body: {
    marginLeft: 40,
    marginRight: 40,
  },
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
  recipientName: {
    position: 'relative',
    paddingLeft: 30, // space for icon
    ...theme.fontMedium(22),
  },
  recipientReviewedIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 22,
    height: 22,
    color: '#21cb61',
  },
  recipientTextBox: {
    ...theme.fontMedium(22),
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
    ...theme.fontRegular(22),
  },
  footer: {
    padding: [60, 40, 40, 40],
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
  },
  moreButton: {
    marginLeft: 10,
  },
  discussButton: {
    marginLeft: 10,
    color: '#000',
    backgroundColor: 'rgba(37, 43, 67, 0.04)',
    boxShadow: 'none',
    '&:hover': {
      color: '#484DE7',
      backgroundColor: 'rgba(37, 43, 67, 0.04)',
      boxShadow: 'none',
    },
  },
  doneButton: {
    marginLeft: 10,
    backgroundColor: '#21CB61',
    boxShadow: 'none', // TODO: remove in the kit
    '&:hover': {
      backgroundColor: '#EFFBF4',
      color: '#21CB61',
      boxShadow: 'none',
    },
  },
  buttonIcon: {
    marginRight: 15,
    verticalAlign: 'bottom',
  },
})
