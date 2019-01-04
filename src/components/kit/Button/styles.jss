const DISABLED_COLORS = {
  backgroundColor: 'rgba(37,43,67,0.04)',
  color: 'rgba(37, 43, 67, 0.2)',
}

// eslint-disable-next-line import/prefer-default-export
export const applyColors = theme => ({
  green: {
    backgroundColor: '#21CB61',
    color: '#fff',
    transition: theme.transition('background-color'),
    '&:hover, &$hover': {
      backgroundColor: '#1EB757',
    },
    '&:focus, &$focus': {
      backgroundColor: '#1EB757',
    },
    '&:active, &$active, &$loading': {
      backgroundColor: '#1AA24E',
    },
    '&$disabled': {
      ...DISABLED_COLORS,
    },
  },

  gray: {
    backgroundColor: 'rgba(37, 43, 67, 0.04)',
    color: '#252B43',
    transition: theme.transition('background-color'),
    '&:hover, &$hover': {
      backgroundColor: 'rgba(37, 43, 67, 0.1)',
    },
    '&:focus, &$focus': {
      backgroundColor: 'rgba(37, 43, 67, 0.1)',
    },
    '&:active, &$active, &$loading': {
      backgroundColor: 'rgba(37, 43, 67, 0.15)',
    },
    '&$disabled': {
      ...DISABLED_COLORS,
    },
    '& $spinner': {
      color: '#626A78',
    },
  },

  red: {
    backgroundColor: '#C70000',
    color: '#fff',
    transition: theme.transition('background-color'),
    '&:hover, &$hover': {
      backgroundColor: '#B30000',
    },
    '&:focus, &$focus': {
      backgroundColor: '#B30000',
    },
    '&:active, &$active, &$loading': {
      backgroundColor: '#9F0000',
    },
    '&$disabled': {
      ...DISABLED_COLORS,
    },
  },

  blue: {
    backgroundColor: '#4C51F3',
    color: '#fff',
    transition: theme.transition('background-color'),
    '&:hover, &$hover': {
      backgroundColor: '#4449DB',
    },
    '&:focus, &$focus': {
      backgroundColor: '#4449DB',
    },
    '&:active, &$active, &$loading': {
      backgroundColor: '#3D49C2',
    },
    '&$disabled': {
      ...DISABLED_COLORS,
    },
  },

  lightGreen: {
    backgroundColor: 'rgba(33, 203, 97, 0.08)',
    color: '#21CB61',
    transition: theme.transition('background-color'),
    '&:hover, &$hover': {
      backgroundColor: 'rgba(33, 203, 97, 0.16)',
    },
    '&:focus, &$focus': {
      backgroundColor: 'rgba(33, 203, 97, 0.16)',
    },
    '&:active, &$active, &$loading': {
      backgroundColor: 'rgba(33, 203, 97, 0.22)',
    },
    '&$disabled': {
      ...DISABLED_COLORS,
    },
    '& $spinner': {
      color: '#21CB61',
    },
  },

  lightBlue: {
    backgroundColor: 'rgba(76, 81, 243, 0.06)',
    color: '#4C51F3',
    transition: theme.transition('background-color'),
    '&:hover, &$hover': {
      backgroundColor: 'rgba(76, 81, 243, 0.12)',
    },
    '&:focus, &$focus': {
      backgroundColor: 'rgba(76, 81, 243, 0.12)',
    },
    '&:active, &$active, &$loading': {
      backgroundColor: 'rgba(76, 81, 243, 0.18)',
    },
    '&$disabled': {
      ...DISABLED_COLORS,
    },
    '& $spinner': {
      color: '#4C51F3',
    },
  },

  lightGray: {
    backgroundColor: '#F6F7F7',
    color: '#A2A5AF',
    transition: theme.transition('background-color'),
    '&:hover, &$hover': {
      backgroundColor: '#E9EAEC',
      color: '#9B9EA8',
    },
    '&:focus, &$focus': {
      backgroundColor: '#E9EAEC',
      color: '#9B9EA8',
    },
    '&:active, &$active, &$loading': {
      backgroundColor: '#E9EAEC',
      color: '#9B9EA8',
    },
    '&$disabled': {
      ...DISABLED_COLORS,
    },
    '& $spinner': {
      color: '#4C51F3',
    },
  },
})
