export default theme => ({
  root: {
    width: 850,
    margin: 20,
    background: '#FFFFFF',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.07)',
    borderRadius: 8,
  },
  header: {
    display: 'flex',
    padding: 40,
    ...theme.fontRegular(22, 20),
  },
  headerDateTime: {
    flex: 1,
    color: '#20284A',
    opacity: 0.3,
  },
  headerInfo: {
    textAlign: 'right',
    whiteSpace: 'nowrap',
  },
  headerInfoIcon: {
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
  bodyRecipientWrap: {
    display: 'inline-block',
    width: '50%',
  },
  bodyRecipientCheckIcon: {
    marginRight: 5,
    color: '#21CB61',
    verticalAlign: 'bottom',
  },
  bodyCategoryWrap: {
    display: 'inline-block',
    width: '50%',
    // paddingBottom: 10,
    // borderBottom: '1px solid rgba(32, 40, 74, 0.12)',
  },
  bodyDescriptionWrap: {
    marginTop: 40,
    paddingBottom: 10,
    borderBottom: '1px solid rgba(32, 40, 74, 0.12)',
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
  footerToggleWrap: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  footerToggleHint: {
    marginLeft: 15,
    color: '#20284A',
    opacity: 0.4,
    ...theme.fontRegular(16, 22),
  },
  footerButtons: {
    flex: 0,
    whiteSpace: 'nowrap',
  },
  fieldHint: {
    marginBottom: 10,
    color: '#D7D9DF',
    ...theme.fontRegular(14, 14),
    '& strong': {
      marginRight: 5,
      color: '#9094A5',
      ...theme.fontMedium(14, 14),
    },
  },
  field: {
    ...theme.fontMedium(22, 22),
  },
})
