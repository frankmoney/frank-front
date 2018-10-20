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
import ToggleButton from 'components/kit/ToggleButton'

const styles = {
  demo: {
    alignItems: 'center',
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 100,
    paddingTop: 100,
    '& > h1': {
      marginTop: 70,
      marginBottom: 70,
      fontSize: 60,
      lineHeight: 60,
      fontWeight: 500,
      '&:first-child': {
        marginTop: 0,
      },
    },
    '& > h2': {
      marginTop: 80,
      marginBottom: 60,
      fontSize: 40,
      lineHeight: 50,
      fontWeight: 500,
    },
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    width: 900,
    '& > *': {
      marginRight: 20,
    },
    marginBottom: 20,
  },
  button: {
    width: 160,
  },
}

const ButtonsDemo = ({ classes }) => (
  <div className={classes.demo}>
    <h1>Button</h1>
    <div className={classes.row}>
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
    </div>
    <div className={classes.row}>
      <Button className={classes.button} label="Submit" color="gray" />
      <Button className={classes.button} label="Submit" color="gray" hover />
      <Button className={classes.button} label="Submit" color="gray" active />
      <Button className={classes.button} label="Submit" color="gray" disabled />
      <Button className={classes.button} label="Submit" color="gray" loading />
    </div>
    <div className={classes.row}>
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
    </div>
    <div className={classes.row}>
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
    </div>
    <div className={classes.row}>
      <Button className={classes.button} label="Submit" color="red" />
      <Button className={classes.button} label="Submit" color="red" hover />
      <Button className={classes.button} label="Submit" color="red" active />
      <Button className={classes.button} label="Submit" color="red" disabled />
      <Button className={classes.button} label="Submit" color="red" loading />
    </div>
    <div className={classes.row}>
      <Button className={classes.button} label="Submit" color="blue" />
      <Button className={classes.button} label="Submit" color="blue" hover />
      <Button className={classes.button} label="Submit" color="blue" active />
      <Button className={classes.button} label="Submit" color="blue" disabled />
      <Button className={classes.button} label="Submit" color="blue" loading />
    </div>
    <div className={classes.row}>
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
    </div>
    <div className={classes.row}>
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
    </div>
    <h2>IconButton</h2>
    <div className={classes.row}>
      <IconButton icon={<MoreHoriz />} />
      <IconButton icon={<MoreHoriz />} hover />
      <IconButton icon={<MoreHoriz />} active />
      <IconButton icon={<MoreHoriz />} disabled />
      <IconButton icon={<MoreHoriz />} loading />
    </div>
    <div className={classes.row}>
      <IconButton icon={<MoreHoriz />} color="lightGreen" />
      <IconButton icon={<MoreHoriz />} color="lightGreen" hover />
      <IconButton icon={<MoreHoriz />} color="lightGreen" active />
      <IconButton icon={<MoreHoriz />} color="lightGreen" disabled />
      <IconButton icon={<MoreHoriz />} color="lightGreen" loading />
    </div>
    <div className={classes.row}>
      <IconButton icon={<MoreHoriz />} color="lightBlue" />
      <IconButton icon={<MoreHoriz />} color="lightBlue" hover />
      <IconButton icon={<MoreHoriz />} color="lightBlue" active />
      <IconButton icon={<MoreHoriz />} color="lightBlue" disabled />
      <IconButton icon={<MoreHoriz />} color="lightBlue" loading />
    </div>
    <h2>ToggleButton</h2>
    <div className={classes.row}>
      <ToggleButton label="Submit" icon={<ChatBubble />} />
      <ToggleButton
        defaultOn
        colorOn="green"
        label="Submit"
        icon={<ChatBubble />}
      />
      <ToggleButton.Icon icon={<MoreHoriz />} />
      <ToggleButton.Icon defaultOn colorOn="lightGreen" icon={<MoreHoriz />} />
    </div>
    <h2>Different Buttons</h2>
    <div className={classes.row}>
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
    </div>
  </div>
)

export default injectStyles(styles)(ButtonsDemo)
