import createMuiTheme from 'material-ui/styles/createMuiTheme'

export default frankTheme =>
  createMuiTheme({
    typography: {
      fontFamily: frankTheme.fontFamily,
    },
    overrides: {
      // still used in Table component
      MuiCheckbox: {
        colorPrimary: {
          color: 'rgba(0,0,0,0.2)',
          '&$checked': {
            color: frankTheme.colors.primary,
          },
          '&$disabled': {
            color: 'rgba(0,0,0,0.1)',
          },
        },
        disabled: {
          color: 'rgba(0,0,0,0.1)',
        },
      },
      MuiRadio: {
        colorPrimary: {
          color: 'rgba(0,0,0,0.2)',
          '&$checked': {
            color: frankTheme.colors.primary,
          },
        },
        disabled: {
          color: 'rgba(0,0,0,0.2)',
        },
      },
      MuiSwitchBase: {
        root: {
          width: 'unset',
          height: 'unset',
        },
      },
    },
  })
