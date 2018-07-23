import colors from './colors'

const DISABLED_BUTTON_COLORS = {
  backgroundColor: '#F6F7F8',
  color: colors.buttonDisabledGrey,
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
      backgroundColor: colors.green,
      // TODO: wait for the finished design
      '&:hover, &:active': {
        border: 'none',
        boxShadow: 'none',
        backgroundColor: colors.lightGreen,
        color: colors.green,
      },
      '&$disabled': {
        ...DISABLED_BUTTON_COLORS,
      },
    },
    secondary: {
      color: colors.black,
      border: 'none',
      boxShadow: 'none',
      backgroundColor: colors.buttonGrey,
      '&:hover, &:active': {
        backgroundColor: colors.buttonGrey,
        border: 'none',
        boxShadow: 'none',
        color: colors.blue,
      },
      '&$disabled': {
        ...DISABLED_BUTTON_COLORS,
      },
    },
  },
  IconButton: {
    round: {
      color: colors.black,
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