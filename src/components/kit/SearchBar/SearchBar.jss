export default {
  root: {
    alignItems: 'center',
    display: 'flex',
    height: 60,
    padding: [0, 11],
    position: 'relative',
  },
  field: {
    flex: [2, 1],
    fontSize: 22,
    padding: [0, 0],
    '&::placeholder': {
      color: '#D3D5D9',
    },
  },
  icon: {
    fontSize: 26,
    marginRight: 15,
    color: 'rgba(0,0,0,0.2)',
  },
  spinner: {
    position: 'absolute',
    right: 15,
    top: 18,
    width: 24,
    height: 24,
  },
}
