import React from 'react'
import cx from 'classnames'
import { Subject as DescriptionIcon } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'
import { FieldWithIcon as FieldContainer } from 'components/Field'
import TextBox from 'components/forms/TextBoxField'
import FieldIcon from 'components/FieldIcon'

const styles = theme => ({
  description: {},
  descriptionTextBox: {
    ...theme.fontRegular(20, 32),
    padding: [7, 0, 5, 0],
  },
})

const DescriptionField = ({ classes, className, placeholder, ...props }) => (
  <FieldContainer
    label={<FieldIcon iconComponent={DescriptionIcon} />}
    className={cx(classes.description, className)}
  >
    <TextBox
      className={classes.descriptionTextBox}
      expand="vertically"
      placeholder={placeholder}
      disableUnderline
      {...props}
    />
  </FieldContainer>
)

export default injectStyles(styles)(DescriptionField)
