import React from 'react'
import Demo, { Row } from 'demo/Demo'
import Paper from 'components/kit/Paper'
import TextBox from 'components/kit/TextBox'
import LeftField from 'components/kit/fields/LeftField'
import { injectStyles } from 'utils/styles'
import MenuItem from 'components/kit/Menu/MenuItem'
import SelectField from 'components/kit/SelectField'

const styles = {
  playgroundWrap: {
    height: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  playground: {},
  states: {
    display: 'flex',
    alignItems: 'flex-start',
    width: 900,
    '& > *': {
      marginRight: 20,
      width: '100%',
      fontSize: 16,
      fontWeight: 500,
      color: '#252B43',
    },
    marginBottom: 35,
  },
  paper: {
    width: 600,
    padding: 40,
    '& > *:not(:last-child)': {
      marginBottom: 35,
    },
  },
  button: {
    width: 160,
  },
}

const FieldsDemo = ({ classes }) => {
  const states = (
    <div className={classes.states}>
      <div>Normal</div>
      <div>Focus</div>
      <div>Filled</div>
      <div>Error</div>
      <div>Error&Focus</div>
    </div>
  )

  return (
    <Demo gray>
      <h1>(WIP DO NOT USE)LeftField</h1>
      <h2>TextBox</h2>
      <Row>
        <Paper type="modal" className={classes.paper}>
          <LeftField stretch label="Name" placeholder="Type name">
            <TextBox />
          </LeftField>
          <LeftField stretch label="Name" placeholder="Type name" focus>
            <TextBox />
          </LeftField>
          <LeftField stretch defaultValue="Nick" label="Name">
            <TextBox />
          </LeftField>
        </Paper>
      </Row>
      <h2>Select</h2>
      <Row>
        <Paper type="modal" className={classes.paper}>
          <SelectField.Left
            stretchDropdown
            label="Role"
            placeholder="Select team role"
          >
            <MenuItem value="admin" label="Administrator" />
            <MenuItem value="manager" label="Manager" />
            <MenuItem value="observer" label="Observer" />
          </SelectField.Left>
        </Paper>
      </Row>
    </Demo>
  )
}

export default injectStyles(styles)(FieldsDemo)
