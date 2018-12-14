import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { Public as PublicIcon } from 'material-ui-icons'
import Paper from 'components/kit/Paper'
import Menu, { MenuItem, MenuItemSeparator } from 'components/kit/Menu'
import ArrowMenu from 'components/kit/ArrowMenu'
import OptionsList from 'components/kit/OptionsList'
import CategoryMenuItem from 'components/CategoryMenuItem'
import Demo from 'demo/Demo'
import BanksSearch from './BanksSearch/BanksSearch'
import BanksMenu from './BanksSearch/StubBanksMenu'

const styles = {
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

const SelectListsDemo = ({ classes }) => (
  <Demo>
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
        <Paper type="list" style={{ width: 200 }}>
          <MenuItem icon={<PublicIcon />} label="Normal" />
          <MenuItem selected icon={<PublicIcon />} label="Selected" />
          <MenuItem active icon={<PublicIcon />} label="Active" />
        </Paper>
        <Paper type="list" style={{ width: 200 }}>
          <CategoryMenuItem label="Normal" color="#8725FB" />
          <CategoryMenuItem selected label="Selected" color="#E34498" />
          <CategoryMenuItem active label="Active" color="#F2733D" />
        </Paper>
      </div>
    </div>
    <h2>Hover and selection logic</h2>
    <div className={classes.rowCentered}>
      <div className={classes.rowContent}>
        <Menu defaultValue="manager" style={{ width: 200 }}>
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
    <h2>Item overflow</h2>
    <div className={classes.rowCentered}>
      <div className={classes.rowContent}>
        <Menu defaultValue="manager" style={{ width: 200 }}>
          <MenuItem
            value="admin"
            label="Administrator Administrator Administrator"
          />
          <MenuItem value="manager" label="Manager Manager Manager" />
          <MenuItem value="observer" label="Observer Observer Observer" />
        </Menu>
        <Menu defaultValue={0} style={{ width: 200 }}>
          <MenuItem
            icon={<PublicIcon />}
            label="Normal Normal Normal"
            value={0}
          />
          <MenuItem
            selected
            icon={<PublicIcon />}
            label="Selected Selected Selected"
            value={1}
          />
          <MenuItem
            active
            icon={<PublicIcon />}
            label="Active Active Active"
            value={2}
          />
        </Menu>
        <Menu defaultValue={0} style={{ width: 200 }}>
          <CategoryMenuItem
            label="Normal Normal Normal"
            color="#8725FB"
            value={0}
          />
          <CategoryMenuItem
            selected
            label="Selected Selected Selected"
            color="#E34498"
            value={1}
          />
          <CategoryMenuItem
            active
            label="Active Active Active"
            color="#F2733D"
            value={2}
          />
        </Menu>
      </div>
    </div>
    <h2>List separator</h2>
    <div className={classes.rowCentered}>
      <Menu style={{ width: 200 }}>
        <CategoryMenuItem label="Marketing" color="#FF7970" value={0} />
        <CategoryMenuItem label="Street outreach" color="#F8C018" value={1} />
        <CategoryMenuItem
          active
          label="Advertising"
          color="#19DAE7"
          value={2}
        />
        <MenuItemSeparator />
        <CategoryMenuItem active label="Grants" color="#21CB61" value={3} />
        <CategoryMenuItem active label="Donations" color="#049371" value={4} />
      </Menu>
    </div>
    <h2>Max visible items</h2>
    <div className={classes.rowCentered}>
      <BanksMenu maxVisibleItems={5} style={{ width: 300 }} />
    </div>
    <h2>Mix with non selectable items</h2>
    <div className={classes.rowCentered}>
      <ArrowMenu
        defaultValue="manager"
        title="Choose role"
        style={{ width: 200 }}
      >
        <MenuItem value="admin" label="Administrator" />
        <MenuItem value="manager" label="Manager" />
        <MenuItem value="observer" label="Observer" />
        <MenuItem
          color="red"
          label="Delete user"
          onSelect={() => alert('user has been deleted!')}
        />
      </ArrowMenu>
    </div>
    <h2>Any appearance same logic</h2>
    <div className={classes.rowCentered}>
      <OptionsList defaultValue={2}>
        <OptionsList.Item primaryText="Potato" value={1} />
        <OptionsList.Item primaryText="Tomato" value={2} />
        <OptionsList.Item primaryText="Peach" value={3} />
        <OptionsList.Item primaryText="Apple" value={4} />
      </OptionsList>
    </div>
    <h2>Dynamic items and overflow</h2>
    <div className={classes.rowCentered}>
      <BanksSearch />
    </div>
  </Demo>
)

export default injectStyles(styles)(SelectListsDemo)
