// @flow strict-local
import * as React from 'react'
import CategoryLabel from 'components/CategoryLabel'
import Paper from 'components/kit/Paper'
import TooltipBase from 'components/kit/TooltipBase'
import createPortalInBody from 'utils/dom/createPortal'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { type IndexedPieChartCategory } from '../utils'

const styles = theme => ({
  root: {
    padding: 15,
  },
  title: {
    color: '#A8AAB4',
    ...theme.fontMedium(14, 22),
  },
  label: {
    alignItems: 'center',
    display: 'flex',
    '&:not(:first-child)': {
      marginTop: 12,
    },
  },
  icon: {
    height: 12,
    width: 12,
  },
  text: {
    flex: [1, 1],
    paddingRight: 40,
    ...theme.fontMedium(14, 16),
    whiteSpace: 'nowrap',
  },
  value: {
    flex: [1, 1],
    textAlign: 'right',
    ...theme.fontMedium(14, 16),
    color: 'black !important',
  },
})

type Props = {|
  ...InjectStylesProps,
  //
  anchor: React.Element<typeof CategoryLabel>,
  items: Array<IndexedPieChartCategory>,
  valueUnit?: string,
|}

const Portal = ({ children }) => createPortalInBody(children)

const OtherCategories = ({ anchor, classes, items, valueUnit }: Props) => {
  const renderItem = ({
    id, // omit
    index,
    ...otherProps
  }: IndexedPieChartCategory) => (
    <CategoryLabel
      className={classes.label}
      iconClassName={classes.icon}
      key={index}
      nameClassName={classes.text}
      valueClassName={classes.value}
      valueUnit={valueUnit}
      {...otherProps}
    />
  )

  return (
    <TooltipBase popupAccessible place="down" align="center" distance={4}>
      {({ open, getTargetProps, getTooltipProps }) => (
        <>
          {React.cloneElement(anchor, getTargetProps())}
          {open && (
            <Portal>
              <Paper
                className={classes.root}
                type="tooltip"
                {...getTooltipProps()}
              >
                <div className={classes.title}>Other categories</div>
                {items.map(renderItem)}
              </Paper>
            </Portal>
          )}
        </>
      )}
    </TooltipBase>
  )
}

export default injectStyles(styles)(OtherCategories)
