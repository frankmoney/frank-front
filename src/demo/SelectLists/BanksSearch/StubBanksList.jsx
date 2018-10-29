import { withProps } from 'recompose'
import BankList from 'components/BankList/index'
import data from './banks.json'

export default withProps({ banks: data })(BankList)
