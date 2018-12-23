// @flow
import React from 'react'
import { withState, toRenderProps } from 'recompose'
import Snack from 'components/kit/Snack'
import { injectStyles } from 'utils/styles'
import Demo, { Row } from 'demo/Demo'
import ToggleButton from 'components/kit/ToggleButton'
import Switch from 'components/kit/Switch'

const styles = {}

const ToggleState = toRenderProps(withState('on', 'changeOn', false))
const SnackPlaygroundState = toRenderProps(
  withState('timeoutOn', 'changeTimeoutOn', false)
)

const ToggleSnackButton = ({ snackName, timeoutOn }) => (
  <ToggleState>
    {({ on, changeOn }) => (
      <>
        <Snack
          shown={on}
          message={snackName}
          dismissByTimeout={timeoutOn ? 3000 : null}
          onDismiss={() => changeOn(false)}
        />
        <ToggleButton on={on} onClick={() => changeOn(!on)} label={snackName} />
      </>
    )}
  </ToggleState>
)

const FormsDemo = () => (
  <Demo gray>
    <SnackPlaygroundState>
      {({ timeoutOn, changeTimeoutOn }) => (
        <>
          <h1>Snacks</h1>
          <Row centered>
            <Switch
              checked={timeoutOn}
              label="Close automatically"
              onChange={changeTimeoutOn}
            />
          </Row>
          <Row centered>
            <ToggleSnackButton snackName="Snack 1" timeoutOn={timeoutOn} />
            <ToggleSnackButton snackName="Snack 2" timeoutOn={timeoutOn} />
            <ToggleSnackButton snackName="Snack 3" timeoutOn={timeoutOn} />
            <ToggleSnackButton snackName="Snack 4" timeoutOn={timeoutOn} />
          </Row>
        </>
      )}
    </SnackPlaygroundState>
  </Demo>
)

export default injectStyles(styles)(FormsDemo)
