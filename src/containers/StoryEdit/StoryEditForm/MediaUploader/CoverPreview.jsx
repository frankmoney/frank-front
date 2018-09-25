import React from 'react'
import { fromJS } from 'immutable'
import { withProps, mapProps } from 'recompose'
import { Field } from 'redux-form/immutable'
import { Close as RemoveIcon } from 'material-ui-icons'
import { injectStyles } from '@frankmoney/ui'
import ImageMiniature from 'controls/ImageMiniature'

const previewStyles = {
  container: {
    position: 'relative',
    marginLeft: -35,
    borderRadius: 5,
    overflow: 'hidden',
    width: 850,
  },
  removeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 100,
    width: 28,
    height: 28,
    color: 'rgba(255, 255, 255, 0.8)',
    cursor: 'pointer',
  },
  iconBackground: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 50,
    width: 100,
    height: 100,
    background:
      'radial-gradient(100.00px at 100% 0%, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%)',
  },
  coverFull: {
    width: props => props.grid.fixed.getColumnSpanWidth(6),
    height: 400,
  },
  coverFullImage: {},
}

const toImmutable = value => fromJS(value)
const fromImmutable = value => value && value.toJS()

const ImageMiniatureField = withProps({
  component: mapProps(({ input: { value, onChange }, meta, ...custom }) => ({
    initialCrop: value,
    onCrop: onChange,
    ...custom,
  }))(ImageMiniature),
  parse: toImmutable,
  format: fromImmutable,
})(Field)

const CoverPreview = injectStyles(previewStyles, { grid: true })(
  ({ classes, url, onDelete }) => (
    <div className={classes.container}>
      <RemoveIcon className={classes.removeIcon} onClick={onDelete} />
      <div className={classes.iconBackground} />
      <ImageMiniatureField
        name="coverCrop"
        imageSrc={url}
        imageClassName={classes.coverFullImage}
        className={classes.coverFull}
      />
    </div>
  )
)

export default CoverPreview
