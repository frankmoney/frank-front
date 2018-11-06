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
    color: '#252B43',
    '&::placeholder': {
      color: '#D3D5D9',
    },
  },
  icon: {
    height: 28,
    width: 28,
    margin: [1, 14, 0, 1],
    color: '#D3D5D9',
  },
  spinner: {
    position: 'absolute',
    right: 15,
    top: 18,
    width: 24,
    height: 24,
  },
}
