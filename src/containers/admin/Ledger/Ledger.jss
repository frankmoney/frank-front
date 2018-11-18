export default theme => ({
  root: {
    minHeight: '100vh',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 110,
    paddingBottom: 100,
  },
  container: {
    width: 850,
  },
  searchCard: {
    marginBottom: 35,
  },
  overviewCard: {
    marginBottom: 35,
  },
  header: {
    justifyContent: 'space-between',
    paddingRight: 30,
  },
  tablePagerWrap: {
    marginTop: 50,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  emptyPlaceholder: {
    marginTop: 150,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    flexDirection: 'column',
  },
  emptyPlaceholderLabel: {
    ...theme.fontRegular(22),
    color: 'rgba(0,0,0,0.5)',
    marginBottom: 30,
  },
  table: {
    opacity: props => (props.listDisabled ? 0.5 : 1),
    pointerEvents: props => (props.listDisabled ? 'none' : 'unset'),
    position: 'unset',
  },
  loader: {},
})
