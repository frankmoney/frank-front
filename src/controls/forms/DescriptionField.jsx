import React from 'react'
import cx from 'classnames'
import { Subject as DescriptionIcon } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'
import Editor from 'components/Editor'
import { FieldWithIcon as FieldContainer } from 'components/Field'
import ReduxFormControl from 'components/kit/ReduxFormControl'
import FieldIcon from 'components/FieldIcon'

const styles = theme => ({
  description: {},
  descriptionTextBox: {
    ...theme.fontRegular(20, 32),
    width: '100%',
    // padding: [7, 0, 5, 0],
  },
})

const DescriptionField = ({ classes, className, ...props }) => (
  <FieldContainer
    label={<FieldIcon iconComponent={DescriptionIcon} />}
    className={cx(classes.description, className)}
  >
    <ReduxFormControl.Editor
      component={Editor}
      className={classes.descriptionTextBox}
      {...props}
    />
  </FieldContainer>
)

export default injectStyles(styles)(DescriptionField)
