import React from 'react'
import * as R from 'ramda'
import { Paper } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import Image from './BlendableImage'
import testData from './testData.json'

const styles = {
  demo: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    marginTop: 35,
    padding: [30, 30, 40],
    width: 850,
    '&:last-child': {
      marginBottom: 180,
    },
  },
  image: {
    height: 180,
    width: '100%',
    '&:not(:last-child)': {
      marginBottom: 20,
    },
  },
}

const ImagesDemo = ({ classes }) => (
  <div className={classes.demo}>
    <Paper className={classes.card}>
      {R.map(
        ({ medium_logo_url }) => (
          <Image src={medium_logo_url} className={classes.image} />
        ),
        testData
      )}
      {/* <Image src={testData[0].medium_logo_url} className={classes.image} /> */}
      {/* <Image src={testData[1].medium_logo_url} className={classes.image} /> */}
    </Paper>
  </div>
)

export default injectStyles(styles)(ImagesDemo)
