import React from 'react'
import cx from 'classnames'
import { Subject as DescriptionIcon } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'
import Editor from 'components/Editor'
import { FieldWithIcon as FieldContainer } from 'components/Field'
import ReduxFormControl from 'components/kit/ReduxFormControl'
import FieldIcon from 'components/FieldIcon'
import TextBox from 'components/forms/TextBoxField'

const styles = theme => ({
  description: {},
  descriptionRichTextBox: {
    ...theme.fontRegular(20, 32),
    width: 770,
    flexShrink: 0,
    boxSizing: 'content-box',
    paddingRight: 150,
    // pixel perfect
    marginLeft: -2,
  },
  descriptionPlainTextBox: {
    ...theme.fontRegular(20, 32),
    flexShrink: 0,
    padding: [10, 0, 4, 0],
  },
})

const DescriptionField = ({ classes, className, richEditor, ...props }) => (
  <FieldContainer
    label={<FieldIcon iconComponent={DescriptionIcon} />}
    className={cx(classes.description, className)}
  >
    {richEditor ? (
      <ReduxFormControl.Editor
        component={Editor}
        className={classes.descriptionRichTextBox}
        {...props}
      />
    ) : (
      <TextBox
        className={classes.descriptionPlainTextBox}
        expand="vertically"
        disableUnderline
        {...props}
      />
    )}
  </FieldContainer>
)

export default injectStyles(styles)(DescriptionField)
