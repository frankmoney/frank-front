// @flow
import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import {
  CheckCircle,
  Check,
  MoreHoriz,
  ChatBubble,
  List,
} from 'material-ui-icons'
import Button, { IconButton } from 'components/kit/Button'
import Spinner from 'components/kit/Spinner'
import ToggleButton from 'components/kit/ToggleButton'
import Demo, { Row } from 'demo/Demo'

const styles = {
  button: {
    width: 160,
  },
}

const ButtonsDemo = ({ classes }) => (
  <Demo>
    <h1>Button</h1>
    <Row>
      <Button className={classes.button} label="Submit" color="green" />
      <Button className={classes.button} label="Submit" color="green" hover />
      <Button className={classes.button} label="Submit" color="green" active />
      <Button
        className={classes.button}
        label="Submit"
        color="green"
        disabled
      />
      <Button className={classes.button} label="Submit" color="green" loading />
    </Row>
    <Row>
      <Button className={classes.button} label="Submit" color="gray" />
      <Button className={classes.button} label="Submit" color="gray" hover />
      <Button className={classes.button} label="Submit" color="gray" active />
      <Button className={classes.button} label="Submit" color="gray" disabled />
      <Button className={classes.button} label="Submit" color="gray" loading />
    </Row>
    <Row>
      <Button className={classes.button} label="Submit" color="red" />
      <Button className={classes.button} label="Submit" color="red" hover />
      <Button className={classes.button} label="Submit" color="red" active />
      <Button className={classes.button} label="Submit" color="red" disabled />
      <Button className={classes.button} label="Submit" color="red" loading />
    </Row>
    <Row>
      <Button className={classes.button} label="Submit" color="blue" />
      <Button className={classes.button} label="Submit" color="blue" hover />
      <Button className={classes.button} label="Submit" color="blue" active />
      <Button className={classes.button} label="Submit" color="blue" disabled />
      <Button className={classes.button} label="Submit" color="blue" loading />
    </Row>
    <Row>
      <Button className={classes.button} label="Submit" color="lightBlue" />
      <Button
        className={classes.button}
        label="Submit"
        color="lightBlue"
        hover
      />
      <Button
        className={classes.button}
        label="Submit"
        color="lightBlue"
        active
      />
      <Button
        className={classes.button}
        label="Submit"
        color="lightBlue"
        disabled
      />
      <Button
        className={classes.button}
        label="Submit"
        color="lightBlue"
        loading
      />
    </Row>
    <Row>
      <Button className={classes.button} label="Submit" color="lightGreen" />
      <Button
        className={classes.button}
        label="Submit"
        color="lightGreen"
        hover
      />
      <Button
        className={classes.button}
        label="Submit"
        color="lightGreen"
        active
      />
      <Button
        className={classes.button}
        label="Submit"
        color="lightGreen"
        disabled
      />
      <Button
        className={classes.button}
        label="Submit"
        color="lightGreen"
        loading
      />
    </Row>
    <Row>
      <Button
        className={classes.button}
        label="Submit"
        color="green"
        icon={<CheckCircle />}
      />
      <Button
        className={classes.button}
        label="Submit"
        color="green"
        icon={<CheckCircle />}
        hover
      />
      <Button
        className={classes.button}
        label="Submit"
        color="green"
        icon={<CheckCircle />}
        active
      />
      <Button
        className={classes.button}
        label="Submit"
        color="green"
        icon={<CheckCircle />}
        disabled
      />
      <Button
        className={classes.button}
        label="Submit"
        color="green"
        icon={<CheckCircle />}
        loading
      />
    </Row>
    <Row>
      <Button
        className={classes.button}
        label="Submit"
        color="gray"
        icon={<CheckCircle />}
      />
      <Button
        className={classes.button}
        label="Submit"
        color="gray"
        icon={<CheckCircle />}
        hover
      />
      <Button
        className={classes.button}
        label="Submit"
        color="gray"
        icon={<CheckCircle />}
        active
      />
      <Button
        className={classes.button}
        label="Submit"
        color="gray"
        icon={<CheckCircle />}
        disabled
      />
      <Button
        className={classes.button}
        label="Submit"
        color="gray"
        icon={<CheckCircle />}
        loading
      />
    </Row>
    <h2>IconButton</h2>
    <Row>
      <IconButton icon={<MoreHoriz />} />
      <IconButton icon={<MoreHoriz />} hover />
      <IconButton icon={<MoreHoriz />} active />
      <IconButton icon={<MoreHoriz />} disabled />
      <IconButton icon={<MoreHoriz />} loading />
    </Row>
    <Row>
      <IconButton icon={<MoreHoriz />} color="lightGreen" />
      <IconButton icon={<MoreHoriz />} color="lightGreen" hover />
      <IconButton icon={<MoreHoriz />} color="lightGreen" active />
      <IconButton icon={<MoreHoriz />} color="lightGreen" disabled />
      <IconButton icon={<MoreHoriz />} color="lightGreen" loading />
    </Row>
    <Row>
      <IconButton icon={<MoreHoriz />} color="lightBlue" />
      <IconButton icon={<MoreHoriz />} color="lightBlue" hover />
      <IconButton icon={<MoreHoriz />} color="lightBlue" active />
      <IconButton icon={<MoreHoriz />} color="lightBlue" disabled />
      <IconButton icon={<MoreHoriz />} color="lightBlue" loading />
    </Row>
    <h2>ToggleButton</h2>
    <Row>
      <ToggleButton label="Submit" icon={<ChatBubble />} />
      <ToggleButton
        defaultOn
        colorOn="green"
        label="Submit"
        icon={<ChatBubble />}
      />
      <ToggleButton.Icon icon={<MoreHoriz />} />
      <ToggleButton.Icon defaultOn colorOn="lightGreen" icon={<MoreHoriz />} />
    </Row>
    <h2>Spinner</h2>
    <Row>
      <Spinner size={45} />
      <Spinner size={25} />
      <Spinner />
      <Spinner size={18} />
    </Row>
    <h2>Different Buttons</h2>
    <Row>
      <Button
        className={classes.button}
        label="Publish"
        color="green"
        icon={<Check />}
      />
      <Button
        className={classes.button}
        label="Discuss"
        icon={<ChatBubble />}
        counter={2}
      />
      <Button
        className={classes.button}
        label="Discuss"
        icon={<ChatBubble />}
        counter={99}
      />
      <Button label="839 similar payments" icon={<List />} />
    </Row>
  </Demo>
)

export default injectStyles(styles)(ButtonsDemo)
