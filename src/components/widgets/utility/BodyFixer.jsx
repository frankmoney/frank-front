import { injectStyles } from 'utils/styles'

const styles = {
  '@global body': {
    position: 'fixed',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
}

const BodyFixer = () => null

export default injectStyles(styles)(BodyFixer)
