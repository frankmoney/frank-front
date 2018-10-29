import { MoreHoriz } from 'material-ui-icons'
import { createPortal } from 'react-dom'
import React from 'react'
import * as R from 'ramda'
import { injectStyles } from '@frankmoney/ui'
import Backdrop from 'components/kit/Backdrop'
import ArrowPaper from 'components/kit/ArrowPaper'
import Menu from 'components/kit/Menu/Menu'
import MenuItem from 'components/kit/Menu/MenuItem'
import Paper from 'components/kit/Paper'
import PopupBase from 'components/kit/PopupBase'
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

const REVERSE_DIRECTION = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
}

const PaperPopup = ({
  place,
  arrow,
  align = 'center',
  popup,
  children,
  renderPopup,
}) => {
  const PaperComponent = arrow ? ArrowPaper : Paper

  return (
    <PopupBase place={place} align={align} distance={15}>
      {popupProps => {
        const { open, close, getPopupProps, getArrowProps } = popupProps
        return (
          <>
            {typeof children === 'function' && children(popupProps)}
            {open &&
              createPortal(
                <Backdrop transparent onClick={close}>
                  <PaperComponent
                    {...getPopupProps()}
                    arrowProps={arrow && getArrowProps()}
                    direction={REVERSE_DIRECTION[place]}
                    align={align}
                  >
                    {popup || renderPopup(popupProps)}
                  </PaperComponent>
                </Backdrop>,
                document.body
              )}
          </>
        )
      }}
    </PopupBase>
  )
}

const ButtonMenu = ({
  classes,
  children,
  menuProps = { style: { width: 250 } },
  popupProps,
  ...props
}) => (
  <PaperPopup
    renderPopup={({ close }) => (
      <Menu autoFocus {...menuProps} onSelectElement={close}>
        {children}
      </Menu>
    )}
    {...popupProps}
  >
    {({ open, toggle, getAnchorProps }) => (
      <ToggleButton.Icon
        icon={<MoreHoriz />}
        on={open}
        onClick={toggle}
        {...getAnchorProps(props)}
      />
    )}
  </PaperPopup>
)

const alertMessage = R.memoizeWith(R.identity, msg => () => alert(msg))

const SelectListsDemo = ({ classes }) => (
  <div className={classes.demo}>
    <h1>ButtonMenu</h1>
    <div className={classes.rowCentered}>
      <ButtonMenu>
        <MenuItem onSelect={alertMessage('published')} label="Publish" />
        <MenuItem
          color="red"
          onSelect={alertMessage('deleted')}
          label="Delete"
        />
      </ButtonMenu>
    </div>
  </div>
)

export default injectStyles(styles)(SelectListsDemo)
