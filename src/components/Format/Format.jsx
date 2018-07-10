import React from 'react'

const Format = ({ format, value }) => {
  switch (format) {
    case '$':
      return (
        <span>

        </span>
      )
    default:
      return <span>{value}</span>
  }
}
