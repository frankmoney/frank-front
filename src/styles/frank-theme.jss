const DISABLED_BUTTON_COLORS = {
  backgroundColor: '#F6F7F8',
  color: '#CCCED4',
}

export default {
  Button: {
    disabled: {
      border: 'none',
    },
    primary: {
      color: '#fff',
      border: 'none',
      boxShadow: 'none',
      backgroundColor: '#21CB61',
      // TODO: wait for the finished design
      '&:hover, &:active': {
        border: 'none',
        boxShadow: 'none',
        backgroundColor: '#EFFBF4',
        color: '#21CB61',
      },
      '&$disabled': {
        ...DISABLED_BUTTON_COLORS,
      },
    },
    secondary: {
      color: '#252B43',
      border: 'none',
      boxShadow: 'none',
      backgroundColor: '#F6F7F7',
      '&:hover, &:active': {
        backgroundColor: '#F6F7F7',
        border: 'none',
        boxShadow: 'none',
        color: '#484DE7',
      },
      '&$disabled': {
        ...DISABLED_BUTTON_COLORS,
      },
    },
  },
  IconButton: {
    round: {
      color: '#252B43',
    },
  },
  Paper: {
    paper: {
      background: '#fff',
      borderRadius: 8,
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.07)',
      padding: [30, 40],
    },
  },
}
