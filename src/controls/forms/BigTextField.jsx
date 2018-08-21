import React from 'react'
import cx from 'classnames'
import { Field } from 'redux-form/immutable'
import { injectStyles } from '@frankmoney/ui'
import FieldContainer from 'components/Field'
import TextBox from 'components/TextBox'

const styles = theme => ({
  title: {},
  titleTextBox: {
    ...theme.fontSemibold(40, 46),
  },
})

const TextField = ({ classes, className, label, input }) => (
  <FieldContainer className={cx(classes.title, className)} title={label}>
    <TextBox className={classes.titleTextBox} {...input} />
  </FieldContainer>
)

const StyledTextField = injectStyles(styles)(TextField)

const BigTextField = ({ ...props }) => (
  <Field component={StyledTextField} {...props} />
)

export default BigTextField
