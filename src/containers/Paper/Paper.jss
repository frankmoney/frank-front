import { mergeStyles } from '@frankmoney/ui'

export default theme =>
  mergeStyles(
    {
      paper: {
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.07)',
        padding: [30, 40],
      },
    },
    theme,
    'Paper'
  )
