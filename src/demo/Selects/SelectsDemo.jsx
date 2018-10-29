// @flow
import { MoreHoriz } from 'material-ui-icons'
import React from 'react'
import * as R from 'ramda'
import { injectStyles } from '@frankmoney/ui'
import ButtonMenu from 'components/kit/ButtonMenu'
import MenuItem from 'components/kit/Menu/MenuItem'
import ToggleButton from 'components/kit/ToggleButton'

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

const fakeAction = R.memoizeWith(R.identity, msg => () => alert(msg))

const SelectListsDemo = ({ classes }) => (
  <div className={classes.demo}>
    <h1>ButtonMenu</h1>
    <div className={classes.rowCentered}>
      <ButtonMenu
        arrow
        renderButton={({ open, toggle, getAnchorProps }) => (
          <ToggleButton.Icon
            icon={<MoreHoriz />}
            on={open}
            onClick={toggle}
            {...getAnchorProps()}
          />
        )}
      >
        <MenuItem
          color="#E34498"
          onSelect={fakeAction('published')}
          label="Publish"
        />
        <MenuItem color="red" onSelect={fakeAction('deleted')} label="Delete" />
      </ButtonMenu>
    </div>
  </div>
)

export default injectStyles(styles)(SelectListsDemo)
