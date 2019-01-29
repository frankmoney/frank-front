const FULL_CELL_HEIGHT = 110

const styles = theme => ({
  root: {
    color: theme.colors.black,
    textDecoration: 'none',
    height: FULL_CELL_HEIGHT,
    maxHeight: FULL_CELL_HEIGHT,
    minHeight: FULL_CELL_HEIGHT,
  },
  checkbox: {
    marginRight: 13,
  },
  cellLeft: {
    width: '70%',
    marginRight: 20,
  },
  cellRight: {
    width: '30%',
  },
  description: {
    ...theme.fontRegular(20, 36),
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  emptyDescription: {
    color: 'rgba(32, 40, 74, 0.5)',
    '$editable &': {
      color: 'rgba(32, 40, 74, 0.3)',
    },
    '$editable:hover &': {
      color: 'rgba(32, 40, 74, 0.4)',
    },
  },
  pendingDescription: {
    color: 'rgba(32, 40, 74, 0.5)',
  },
  info: {
    marginTop: 12,
    display: 'flex',
    alignItems: 'center',
  },
  client: {
    marginRight: 20,
    ...theme.fontMedium(16),
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  category: {
    ...theme.fontMedium(16),
    whiteSpace: 'nowrap',
  },
  categoryIcon: {
    height: 12,
    marginBottom: -1,
    width: 12,
  },
  sum: {
    ...theme.fontRegular(20, 30),
    textAlign: 'right',
    display: 'block',
  },
  icons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  date: {
    ...theme.fontRegular(16, 26),
    color: 'rgba(37, 43, 67, 0.3)',
  },
  status: {
    marginLeft: 10,
  },
  unverified: {
    '& $description:not($emptyDescription):not($pendingDescription), & $category, & $client': {
      opacity: 0.5,
    },
  },
  editable: {},
})

export default styles
