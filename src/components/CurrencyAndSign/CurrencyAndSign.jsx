import React from 'react'

const CurrencyAndSign = ({ value, currency, ...otherProps }) => (
  <span
    dangerouslySetInnerHTML={{
      __html: (Number(value) < 0 ? '&minus;' : '&plus;') + currency,
    }}
    {...otherProps}
  />
)

CurrencyAndSign.defaultProps = {
  currency: '$',
}

export default CurrencyAndSign
