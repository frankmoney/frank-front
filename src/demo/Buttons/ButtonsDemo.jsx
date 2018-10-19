import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { CheckCircle, MoreHoriz } from 'material-ui-icons'
import Title from 'containers/Ledger/ChartCard/Title'
import Button, { IconButton } from 'components/kit/Button'

const styles = {
  demo: {
    alignItems: 'center',
    background: '#EBEBEB',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 100,
    '& > h2': {
      marginTop: 50,
    },
  },
  row: {
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
    <Title>Buttons</Title>
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
  </div>
)

export default injectStyles(styles)(ButtonsDemo)
