import { TextField } from '@frankmoney/components'
import { compose, mapProps } from 'recompose'
import { injectStyles } from '@frankmoney/ui'

const styles = {
  dropdownPaper: {
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
  },
}

export default compose(
  injectStyles(styles),
  mapProps(({ classes, ...props }) => ({
    ...props,
    select: true,
    inputRefKeyName: 'node',
    SelectProps: {
      MenuProps: {
        PopoverClasses: {
          paper: classes.dropdownPaper,
        },
      },
    },
  }))
)(TextField)
