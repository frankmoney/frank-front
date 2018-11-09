export default theme => ({
  root: {
    minHeight: '100vh',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 110,
    paddingBottom: 100,
    backgroundColor: '#FAFAFA',
  },
  container: {
    width: 660,
  },
  chartCard: {
    marginBottom: 35,
  },
  header: {
    justifyContent: 'space-between',
    paddingRight: 30,
  },
  tabs: {
    marginBottom: 55,
  },
  table: {
    opacity: props => (props.listDisabled ? 0.5 : 1),
    pointerEvents: props => (props.listDisabled ? 'none' : 'unset'),
  },
  tablePagerWrap: {
    marginTop: 50,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  loader: {},
})
