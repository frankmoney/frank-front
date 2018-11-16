import colors from './colors'

export default {
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
