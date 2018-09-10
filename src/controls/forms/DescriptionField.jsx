import React from 'react'
import cx from 'classnames'
import { withProps } from 'recompose'
import { Field } from 'redux-form/immutable'
import { Subject as DescriptionIcon } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'
import { FieldWithIcon as FieldContainer } from 'components/Field'
import TextBox from 'components/TextBox'
import FieldIcon from 'components/FieldIcon'

const styles = theme => ({
  description: {},
  descriptionTextBox: {
    ...theme.fontRegular(20, 32),
    padding: [7, 0, 5, 0],
  },
})

const DescriptionIconLabel = withProps({ iconComponent: DescriptionIcon })(
  FieldIcon
)

const TextField = ({ classes, className, placeholder, input }) => (
  <FieldContainer
    label={DescriptionIconLabel}
    className={cx(classes.description, className)}
  >
    <TextBox
      className={classes.descriptionTextBox}
      expand="vertically"
      placeholder={placeholder}
      disableUnderline
      {...input}
    />
  </FieldContainer>
)

const StyledTextField = injectStyles(styles)(TextField)

const BigTextField = ({ ...props }) => (
  <Field component={StyledTextField} {...props} />
)

export default BigTextField
