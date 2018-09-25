export default theme => ({
  container: {
    border: '1px solid rgba(37, 43, 67, 0.05)',
    boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
    padding: [35, 40, 15, 40],
  },
  header: {
    display: 'flex',
  },
  title: {
    ...theme.fontMedium(28, 28),
    flex: [2, 1],
  },
  dateRange: {
    color: 'rgba(37, 43, 67, 0.3)',
  },
})
