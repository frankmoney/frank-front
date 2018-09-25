import React from 'react'
import cx from 'classnames'
import { withProps } from 'recompose'
import { Subject as DescriptionIcon } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'
import { FieldWithIcon as FieldContainer } from 'components/Field'
import TextBox from 'components/forms/TextBoxField'
import FieldIcon from 'components/FieldIcon'

const styles = theme => ({
  title: {},
  titleTextBox: {
    ...theme.fontRegular(20, 32),
    padding: [10, 0, 4, 0],
  },
})

const TitleIconLabel = withProps({
  iconComponent: DescriptionIcon,
})(FieldIcon)

const TextField = ({ classes, className, placeholder, ...props }) => (
  <FieldContainer
    label={TitleIconLabel}
    className={cx(classes.title, className)}
  >
    <TextBox
      className={classes.titleTextBox}
      placeholder={placeholder}
      disableUnderline
      expand="vertically"
      {...props}
    />
  </FieldContainer>
)

export default injectStyles(styles)(TextField)
