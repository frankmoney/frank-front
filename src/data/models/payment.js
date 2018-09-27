import PropTypes from 'prop-types'

export const mapPayment = ({ ...payment }) => ({
  createdAt: '2018-01-01 05:00',
  categoryAddedFromSimilar: true,
  ...payment,
})

export const paymentProps = {
  amount: PropTypes.number.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  peerName: PropTypes.string.isRequired,
  postedOn: PropTypes.string.isRequired,
}
