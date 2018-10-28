import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import Paper from 'components/kit/Paper'
import MenuItem from 'components/kit/Menu/MenuItem'
import Menu from 'components/kit/Menu'
import OptionsList from 'components/kit/OptionsList'
import BanksSearch from './BanksSearch/BanksSearch'

const styles = {
  demo: {
    alignItems: 'center',
    background: '#fff',
    display: 'flex',
    color: '#252B43',
    flexDirection: 'column',
    width: 900,
    margin: '0 auto',
    paddingBottom: 300,
    paddingTop: 140,
    '& > h1': {
      fontSize: 60,
      lineHeight: 60,
      fontWeight: 500,
      '&:first-child': {
        marginTop: 0,
      },
    },
    '& > h2': {
      marginBottom: 50,
      fontSize: 40,
      lineHeight: 50,
      fontWeight: 500,
    },
  },
  hints: {
    fontSize: 16,
    lineHeight: 24,
    '& b': {
      fontWeight: 500,
    },
  },
  rowContent: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      marginRight: 30,
    },
  },
  row: {
    composes: '$rowContent',
    width: '100%',
    marginBottom: 50,
  },
  rowCentered: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 50,
  },
}

const SelectsDemo = ({ classes }) => (
  <div className={classes.demo}>
    <h1>Menu</h1>
    <h2>Menu item states</h2>
    <div className={classes.rowCentered}>
      <div className={classes.rowContent}>
        <Paper type="list" style={{ width: 200 }}>
          <MenuItem label="Normal" />
          <MenuItem selected label="Selected" />
          <MenuItem active label="Active" />
        </Paper>
        <Paper type="list" style={{ width: 200 }}>
          <MenuItem label="Normal" color="#28B15C" />
          <MenuItem selected label="Selected" color="#28B15C" />
          <MenuItem active label="Active" color="#28B15C" />
        </Paper>
      </div>
    </div>
    <h2>Hover and selection logic</h2>
    <div className={classes.rowCentered}>
      <div className={classes.rowContent}>
        <Menu defaultValue="manager" autoFocus style={{ width: 200 }}>
          <MenuItem value="admin" label="Administrator" />
          <MenuItem value="manager" label="Manager" />
          <MenuItem value="observer" label="Observer" />
        </Menu>
        <div className={classes.hints} style={{ width: 200 }}>
          Try combination both hover and <b>Up</b>/<b>Down</b> or <b>Enter</b>{' '}
          keys
        </div>
      </div>
    </div>
    <h2>Any appearance same logic</h2>
    <div className={classes.rowCentered}>
      <OptionsList defaultValue="2">
        <OptionsList.Item primaryText="Potato" value="1" />
        <OptionsList.Item primaryText="Tomato" value="2" />
        <OptionsList.Item primaryText="Peach" value="3" />
        <OptionsList.Item primaryText="Apple" value="4" />
      </OptionsList>
    </div>
    <h2>Dynamic items and overflow</h2>
    <div className={classes.rowCentered}>
      <BanksSearch />
    </div>
  </div>
)

export default injectStyles(styles)(SelectsDemo)
