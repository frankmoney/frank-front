import React from 'react'
import Snack from 'components/kit/Snack'

const MailTo = ({ children, email, ...otherProps }) => (
  <a style={{ color: 'white' }} href={`mailto:${email}`} {...otherProps}>
    {children}
  </a>
)

const GeneralErrorSnack = ({ supportEmail, ...otherProps }) => (
  <Snack
    color="red"
    message={
      supportEmail ? (
        <span>
          Something went wrong, please{' '}
          <MailTo email={supportEmail}>drop us the line</MailTo>
        </span>
      ) : (
        'Something went wrong'
      )
    }
    {...otherProps}
  />
)

export default GeneralErrorSnack
