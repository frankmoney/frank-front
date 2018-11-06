// @flow
import * as React from 'react'
import { createPortal } from 'react-dom'
import { MoreHoriz } from 'material-ui-icons'
import Demo from 'demo/Demo'
import Paper from 'components/kit/Paper'
import Button from 'components/kit/Button'
import ArrowPaper from 'components/kit/ArrowPaper'
import Popup from 'components/kit/PopupBase'
import TextTooltip from 'components/kit/TextTooltip'
import ToggleButton from 'components/kit/ToggleButton'
import TooltipBase from 'components/kit/TooltipBase'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = {
  row: {
    display: 'flex',
    alignItems: 'center',
    width: 900,
    '& > *': {
      marginRight: 20,
    },
    marginBottom: 20,
  },
  paper: {
    height: 150,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500,
    fontSize: 14,
  },
  arrowPaper: {
    height: 150,
    width: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500,
    fontSize: 14,
    marginRight: 90,
  },
  dropdownButton: {
    width: 80,
    height: 350,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:first-child': {
      marginLeft: 100,
    },
    '&:nth-child(2n)': {
      marginRight: 250,
    },
  },
}

class Portal extends React.Component<any> {
  render() {
    // $FlowFixMe: nullable document.body
    return createPortal(this.props.children, document.body)
  }
}

const REVERSE_DIRECTION = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
}

type DropdownButtonProps = {|
  ...InjectStylesProps,
  //
  align?: string,
  place: 'up' | 'down' | 'left' | 'right',
  arrowAlign?: 'start' | 'end',
|}

const DropdownButton = ({
  classes,
  place,
  arrowAlign,
  align = 'center',
}: DropdownButtonProps) => {
  const PaperComponent = arrowAlign ? ArrowPaper : Paper

  return (
    <Popup
      defaultOpen
      place={place}
      align={align}
      alignByArrow={!!arrowAlign}
      distance={15}
    >
      {({ open, toggle, getAnchorProps, getPopupProps, getArrowProps }) => (
        <>
          <ToggleButton.Icon
            icon={<MoreHoriz />}
            on={open}
            onClick={toggle}
            {...getAnchorProps()}
          />
          {open && (
            <Portal>
              <PaperComponent
                {...getPopupProps()}
                arrowProps={arrowAlign && getArrowProps()}
                className={classes.arrowPaper}
                direction={REVERSE_DIRECTION[place]}
                align={arrowAlign || align}
              >
                {place}:{arrowAlign || align}
              </PaperComponent>
            </Portal>
          )}
        </>
      )}
    </Popup>
  )
}

const TooltipButton = props => (
  <TextTooltip text="Tooltip" {...props}>
    <Button label={`${props.place}:${props.align}`} />
  </TextTooltip>
)

type CustomTooltipButtonProps = {|
  align?: string,
  place?: 'up' | 'down' | 'left' | 'right',
|}

const CustomTooltipButton = ({
  place = 'up',
  align = 'center',
}: CustomTooltipButtonProps) => (
  <TooltipBase
    popupAccessible
    defaultVisible
    place={place}
    align={align}
    distance={4}
  >
    {({ open, getTargetProps, targetEl, getTooltipProps }) => (
      <>
        <Button
          color="green"
          label={`Custom & same width & keep hover`}
          {...getTargetProps()}
        />
        {open && (
          <Portal>
            <Paper
              type="tooltip"
              {...getTooltipProps({
                style: {
                  width: targetEl && targetEl.clientWidth,
                  height: 150,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              })}
            >
              <Button label="Interact" />
            </Paper>
          </Portal>
        )}
      </>
    )}
  </TooltipBase>
)

const PopupsDemo = ({ classes }) => (
  <Demo>
    <h1>Paper</h1>
    <div className={classes.row}>
      <Paper className={classes.paper} type="card">
        Card
      </Paper>
      <Paper className={classes.paper} type="modal">
        Modal
      </Paper>
      <Paper className={classes.paper} type="popup">
        Popup
      </Paper>
      <Paper className={classes.paper} type="list">
        List
      </Paper>
      <Paper className={classes.paper} type="tooltip">
        Tooltip
      </Paper>
      <Paper className={classes.paper} type="drawer">
        Drawer
      </Paper>
    </div>
    <h1>ArrowPaper</h1>
    <div className={classes.row}>
      <ArrowPaper direction="up" align="start" className={classes.arrowPaper}>
        up:start
      </ArrowPaper>
      <ArrowPaper direction="down" align="start" className={classes.arrowPaper}>
        down:start
      </ArrowPaper>
      <ArrowPaper
        direction="right"
        align="start"
        className={classes.arrowPaper}
      >
        right:start
      </ArrowPaper>
      <ArrowPaper direction="left" align="start" className={classes.arrowPaper}>
        left:start
      </ArrowPaper>
    </div>
    <div className={classes.row}>
      <ArrowPaper direction="up" className={classes.arrowPaper}>
        up:center
      </ArrowPaper>
      <ArrowPaper direction="down" className={classes.arrowPaper}>
        down:center
      </ArrowPaper>
      <ArrowPaper direction="right" className={classes.arrowPaper}>
        right:center
      </ArrowPaper>
      <ArrowPaper direction="left" className={classes.arrowPaper}>
        left:center
      </ArrowPaper>
    </div>
    <div className={classes.row}>
      <ArrowPaper direction="up" align="end" className={classes.arrowPaper}>
        up:end
      </ArrowPaper>
      <ArrowPaper direction="down" align="end" className={classes.arrowPaper}>
        down:end
      </ArrowPaper>
      <ArrowPaper direction="right" align="end" className={classes.arrowPaper}>
        right:end
      </ArrowPaper>
      <ArrowPaper direction="left" align="end" className={classes.arrowPaper}>
        left:end
      </ArrowPaper>
    </div>
    <h1>Popup</h1>
    <h2>Box positioning</h2>
    <div className={classes.row}>
      <div className={classes.dropdownButton}>
        <DropdownButton classes={classes} place="up" />
      </div>
      <div className={classes.dropdownButton}>
        <DropdownButton classes={classes} place="down" />
      </div>
      <div className={classes.dropdownButton}>
        <DropdownButton classes={classes} place="left" />
      </div>
      <div className={classes.dropdownButton}>
        <DropdownButton classes={classes} place="right" />
      </div>
    </div>
    <h2>Arrow positioning</h2>
    <div className={classes.row}>
      <div className={classes.dropdownButton}>
        <DropdownButton classes={classes} place="up" arrowAlign="start" />
      </div>
      <div className={classes.dropdownButton}>
        <DropdownButton classes={classes} place="down" arrowAlign="end" />
      </div>
      <div className={classes.dropdownButton}>
        <DropdownButton classes={classes} place="up" arrowAlign="end" />
      </div>
      <div className={classes.dropdownButton}>
        <DropdownButton classes={classes} place="down" arrowAlign="start" />
      </div>
    </div>
    <h1 style={{ marginBottom: 200 }}>Tooltips</h1>
    <div className={classes.row}>
      <TooltipButton place="up" align="start" defaultVisible />
      <TooltipButton place="up" align="center" defaultVisible />
      <TooltipButton place="up" align="end" defaultVisible />
      <CustomTooltipButton />
    </div>
  </Demo>
)

export default injectStyles(styles)(PopupsDemo)
