export default {
  root: {
    paddingLeft: 40,
  },
  hover: {},
  active: {},
  icon: {
    transform: 'none',
    top: 'unset',
    width: 'unset',
    height: 'unset',
  },

  facebook: {
    border: '1px solid #E3EBFF',
    color: '#3159B4',
    '&:hover, &$hover': {
      borderColor: '#C7D8FF',
    },
    '&:active, &$active': {
      borderColor: '#B4CBFF',
    },
  },
  twitter: {
    border: '1px solid #D3F3FF',
    color: '#00AAEC',
    '&:hover, &$hover': {
      borderColor: '#B2EAFF',
    },
    '&:active, &$active': {
      borderColor: '#91E0FF',
    },
  },
  email: {
    border: '1px solid #EBECEE',
    color: '#3E4561',
    '&:hover, &$hover': {
      borderColor: '#CFD0D6',
    },
    '&:active, &$active': {
      borderColor: '#BEBFC7',
    },
  },

  small: {
    width: 110,
    height: 40,
    background: 'none',
    '&:hover, &$hover': {
      background: 'none',
    },
    '&:active, &$active': {
      background: 'none',
    },
    '& $icon': {
      left: 12,
      maxWidth: 20,
      maxHeight: 20,
    },
  },
  large: {
    width: 140,
    height: 50,
    color: '#797D8B',
    background: '#F6F7F7',
    border: 'none',
    '&:hover, &$hover': {
      color: '#252B43',
      background: '#F2F2F4',
    },
    '&:active, &$active': {
      color: '#252B43',
      background: '#EEEEF0',
    },
    '& $icon': {
      left: 20,
      transform: 'scale(1.18)',
    },
  },
}
