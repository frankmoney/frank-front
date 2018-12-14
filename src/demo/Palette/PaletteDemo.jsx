// @flow
import React from 'react'
import { withState, toRenderProps } from 'recompose'
import { injectStyles } from 'utils/styles'
import Demo, { Row } from 'demo/Demo'
import Palette from 'components/kit/Palette'
import { CATEGORY_PALETTE } from 'const'

const styles = theme => ({
  paletteWrap: {},
  paletteValue: {
    marginTop: 30,
    textAlign: 'center',
    width: '100%',
    color: 'rgba(0,0,0,0.6)',
    ...theme.fontRegular(22),
  },
})

const PaletteState = toRenderProps(withState('value', 'onChange'))

const PaletteDemo = ({ classes }) => (
  <Demo gray>
    <h1>Palette</h1>
    <PaletteState>
      {state => (
        <Row centered>
          <div className={classes.paletteWrap}>
            <Palette palette={CATEGORY_PALETTE} {...state} />
            <div className={classes.paletteValue}>
              {state.value || 'Nothing selected'}
            </div>
          </div>
        </Row>
      )}
    </PaletteState>
  </Demo>
)

export default injectStyles(styles)(PaletteDemo)
