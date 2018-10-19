const DISABLED_COLORS = {
  backgroundColor: 'rgba(37,43,67,0.04)',
  color: 'rgba(37, 43, 67, 0.2)',
}

export const applyColors = theme => ({
  green: {
    backgroundColor: '#21CB61',
    color: '#fff',
    transition: theme.transition('background-color'),
    '&:hover, &$hover': {
      backgroundColor: '#1EB757',
    },
    '&:active, &$active': {
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
    '&:active, &$active': {
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
    '&:active, &$active': {
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
    '&:active, &$active': {
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
    '&:active, &$active': {
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
    '&:active, &$active': {
      backgroundColor: 'rgba(76, 81, 243, 0.18)',
    },
    '&$disabled': {
      ...DISABLED_COLORS,
    },
    '& $spinner': {
      color: '#4C51F3',
    },
  },
})
