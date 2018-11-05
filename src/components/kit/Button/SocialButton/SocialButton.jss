export default theme => ({
  root: {
    ...theme.fontMedium(16),
    display: 'inline-flex',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 2,
  },
  hover: {},
  active: {},
  icon: {},
  label: {},

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
    paddingRight: 21,
    background: 'none',

    '&:hover, &$hover': {
      background: 'none',
    },
    '&:active, &$active': {
      background: 'none',
    },

    '&$facebook': {
      paddingLeft: 11,
    },
    '&$twitter': {
      paddingLeft: 12,
    },
    '&$email': {
      paddingLeft: 12,
      '& > $icon': {
        width: 20,
        height: 20,
      },
    },
  },
  large: {
    width: 140,
    height: 50,
    paddingRight: 37,
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
      transform: 'scale(1.18)',
    },

    '&$facebook': {
      paddingLeft: 18,
    },
    '&$twitter': {
      paddingLeft: 20,
    },
  },
})
