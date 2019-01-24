import React from 'react'
import MultiEditResultSnack from './MultiEditResultSnack'
import MultiEditSelectionSnack from './MultiEditSelectionSnack'
import MultiEditConfirmDialog from './MultiEditConfirmDialog'
import MultiEditPaymentDialog from './MultiEditPaymentDialog'

const MultiEditSnack = ({ categories }) => (
  <>
    <MultiEditPaymentDialog categories={categories} />
    <MultiEditConfirmDialog />
    <MultiEditResultSnack id="result" />
    <MultiEditSelectionSnack id="selection" />
  </>
)

export default MultiEditSnack
