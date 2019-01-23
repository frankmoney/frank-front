// @flow
import React from 'react'
import { withState, toRenderProps } from 'recompose'
import { Public as PublicIcon, Edit as EditIcon } from 'material-ui-icons'
import Snack from 'components/kit/Snack'
import SnackDumb from 'components/kit/Snack/SnackDumb'
import { injectStyles } from 'utils/styles'
import Demo, { Row } from 'demo/Demo'
import ToggleButton from 'components/kit/ToggleButton'
import Switch from 'components/kit/Switch'

const styles = {
  snacks: {
    '& > *': {
      marginBottom: 30,
    },
    marginBottom: 30,
  },
}

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

const SnacksDemo = ({ classes }) => (
  <Demo gray>
    <SnackPlaygroundState>
      {({ timeoutOn, changeTimeoutOn }) => (
        <>
          <h1>Snacks</h1>
          <Row centered>
            <div className={classes.snacks}>
              <SnackDumb message="Copied to clipboard" />
              <SnackDumb color="red" message="Something went wrong" />
              <SnackDumb
                color="blue"
                message="2 payments selected"
                buttons={[
                  <Snack.Button
                    key="edit"
                    tooltip="Edit"
                    icon={<EditIcon />}
                  />,
                  <Snack.Button
                    key="public"
                    tooltip="Publish"
                    icon={<PublicIcon />}
                  />,
                ]}
              />
            </div>
          </Row>
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

export default injectStyles(styles)(SnacksDemo)
