// @flow strict-local
import PieTotalSelect from 'components/OverviewPieChart/PieTotalSelect'
import reconnect from 'utils/reconnect'
import { pieTotalSelector } from '../../selectors'
import * as ACTIONS from '../../actions'

const ConnectedPieTotalSelect = reconnect(
  {
    value: pieTotalSelector,
  },
  {
    onChange: ACTIONS.selectPieTotal,
  }
)(PieTotalSelect)

export default ConnectedPieTotalSelect
