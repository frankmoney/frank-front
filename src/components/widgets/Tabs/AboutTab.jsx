// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import TotalsComponent from 'components/widgets/Totals'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    margin: [0, 'auto'],
    paddingTop: 22,
    width: '100%',
    overflowY: 'scroll',
  },
  small: {},
  title: {
    ...theme.fontSemibold(40, 42),
  },
  totals: {
    margin: [13, 0, 0],
  },
  link: {
    margin: [28, 0, 0, -2],
  },
  description: {
    ...theme.fontRegular(18, 28),
    color: '#666B7B',
    margin: [29, 0, 0, 1],
  },
})

type Props = {|
  ...InjectStylesProps,
  //
  description: ?string,
  descriptionClassName?: string,
  multilineTotals?: boolean,
  name: ?string,
  titleClassName?: string,
  Totals: ?React.Element<typeof TotalsComponent>,
  totalsClassName?: string,
|}

const AboutTab = ({
  classes,
  className,
  description,
  descriptionClassName,
  multilineTotals,
  name,
  titleClassName,
  Totals,
  totalsClassName,
}: Props) => (
  <div className={cx(classes.root, className)}>
    {name && <div className={cx(classes.title, titleClassName)}>{name}</div>}
    {Totals &&
      React.cloneElement(Totals, {
        className: cx(classes.totals, totalsClassName),
        multiline: multilineTotals,
      })}
    {/* <PublicLinkButton
      className={classes.link}
      url={'google.com'}
      label={'google.com'}
    /> */}
    {description && (
      <div className={cx(classes.description, descriptionClassName)}>
        {description}
      </div>
    )}
  </div>
)

export default injectStyles(styles)(AboutTab)
