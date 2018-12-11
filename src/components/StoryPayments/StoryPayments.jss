export default theme => ({
  container: {
    border: '1px solid rgba(37, 43, 67, 0.05)',
    boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
    padding: [20, 0, 0, 0],
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 30,
    padding: [0, 30],
  },
  title: {
    ...theme.fontMedium(22, 22),
    flex: [2, 1],
  },
  dateRange: {
    color: 'rgba(37, 43, 67, 0.3)',
  },
  empty: {
    paddingBottom: 20,
    '& $header': {
      marginBottom: 0,
    },
  },
})
