import { compose, mapProps } from 'recompose'
import { MoreHoriz as ShowMoreIcon } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'
import { Button } from '@frankmoney/components'

const styles = {
  button: {
    width: '100%',
    marginTop: 5,
  },
}

export default compose(
  injectStyles(styles),
  mapProps(({ classes, ...props }) => ({
    type: 'secondary',
    fat: true,
    className: classes.button,
    icon: ShowMoreIcon,
    ...props,
  }))
)(Button)
