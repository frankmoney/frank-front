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
    negative: {
      color: 'white',
      border: 'none',
      boxShadow: 'none',
      backgroundColor: colors.black,
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
  GiantButton: {
    root: {
      fontSize: 18,
      fontWeight: 500,
      color: '#fff',
      backgroundColor: '#4C51F3',
      '&:hover, &:active': {
        backgroundColor: '#4C51F3',
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
  PopupDialog: {
    container: {
      padding: [35, 40],
    },
  },
  DialogTitle: {
    title: {
      fontWeight: 600,
    },
  },
  Breadcrumbs: {
    separator: {
      width: 22,
      height: 22,
      margin: [5, 11, 0, 13],
      opacity: 0.4,
      color: '#252B43',
      transform: 'unset',
    },
  },
  BreadcrumbItem: {
    breadcrumb: {
      color: '#252B43',
      '&:last-child:not(:first-child)': {
        fontWeight: 400,
        color: '#252B43',
      },
    },
  },
  HeaderFilter: {
    value: {
      '&:hover': {
        color: colors.black,
      },
    },
  },
  SidebarMenuItem: {
    menuItem: {
      color: colors.black,
      opacity: props => (props.disabled ? 0.5 : 1),
      '&:hover': {
        color: '#4C51F3',
      },
      '&:not(:first-child)': {
        marginTop: 10,
      },
    },
    menuItemActive: {
      color: '#4C51F3',
    },
    iconLeft: {
      marginRight: 15,
    },
  },
  SidebarBottomMenu: {
    backgroundColor: '#FFF',
    color: colors.black,
  },
}
