import { createTheme } from '@frankmoney/ui'
import { fontFaceGraphik, GRAPHIK_FONT_FAMILY } from '@frankmoney/fonts'
import colors from './colors'
import zIndex from './zIndex'

const fontFaces = fontFaceGraphik({})

export default () => {
  const frankTheme = createTheme({
    colors: {
      primary: colors.blue,
      secondary: colors.yellow,
      error: colors.red,
      ...colors,
    },
    fontFaces,
    fontFamily: GRAPHIK_FONT_FAMILY,
    zIndex,
  })

  return {
    ...frankTheme,
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
        color: 'rgba(37, 43, 67, 0.4)',
        opacity: 1,
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
    Calendar: {
      week: {
        '& > *:not(:last-child)': {
          marginRight: 2,
        },
      },
    },
    CalendarHeader: {
      dayLabel: {
        color: 'rgba(37, 43, 67, 0.5)',
        '&:not(:last-child)': {
          marginRight: 2,
        },
      },
      switchHeader: {
        marginBottom: 0,
      },
      switchHeaderMonth: {
        color: '#252B43',
      },
      daysHeader: {
        marginTop: -4,
        marginBottom: 2,
      },
      button: {
        color: 'rgba(37, 43, 67, 0.5)',
        '&:hover': {
          backgroundColor: 'transparent',
          color: '#252B43',
        },
      },
    },
    CalendarDay: {
      day: {
        color: '#252B43',
      },
      selected: {
        color: frankTheme.colors.primary,
        backgroundColor: 'rgba(37, 43, 67, 0.05)',
        pointerEvents: 'none',
      },
      disabled: {
        color: 'rgba(37, 43, 67, 0.2)',
      },
    },
  }
}
