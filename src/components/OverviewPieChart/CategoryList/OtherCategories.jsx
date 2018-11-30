// @flow strict-local
import * as React from 'react'
import CategoryLabel from 'components/CategoryLabel'
import Paper from 'components/kit/Paper'
import TooltipBase from 'components/kit/TooltipBase'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import { type IndexedPieChartCategory } from '../utils'

const styles = theme => ({
  root: {
    padding: 15,
    zIndex: 1,
  },
  title: {
    color: '#A8AAB4',
    ...theme.fontMedium(14, 22),
    marginBottom: 12,
  },
  label: {
    marginTop: 10,
  },
  icon: {
    height: 12,
    width: 12,
    position: 'relative',
    top: -1,
  },
  text: {
    flex: [1, 1],
    paddingRight: 40,
    ...theme.fontMedium(14, 16),
    whiteSpace: 'nowrap',
  },
  value: {
    flex: [1, 0],
    textAlign: 'right',
    ...theme.fontMedium(14, 16),
    color: '#252B43',
    opacity: 1,
  },
})

type Props = {|
  ...InjectStylesProps,
  //
  anchor: React.Element<typeof CategoryLabel>,
  items: Array<IndexedPieChartCategory>,
  valueUnit?: string,
|}

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
            <Paper
              className={classes.root}
              type="tooltip"
              {...getTooltipProps()}
            >
              <div className={classes.title}>Other categories</div>
              {items.map(renderItem)}
            </Paper>
          )}
        </>
      )}
    </TooltipBase>
  )
}

export default injectStyles(styles)(OtherCategories)
