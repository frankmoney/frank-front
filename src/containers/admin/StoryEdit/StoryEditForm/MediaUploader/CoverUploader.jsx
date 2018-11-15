import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { PhotoSizeSelectActual as CoverPhotoIcon } from 'material-ui-icons'
import { Uploader, UploadButton, readFileData } from '@frankmoney/components'
import UploaderButtonWithHint from './UploaderButtonWithHint'
import { CoverPreview } from './index'

const styles = {
  uploadButton: {
    marginBottom: 15,
  },
}

const getOriginalUrl = image => image.thumbs && image.thumbs.original

const uploadBase64File = async file => {
  const originalUrl = await readFileData(file)
  return {
    name: file.name,
    type: file.type,
    thumbs: {
      original: originalUrl,
    },
  }
}

const CoverUploader = ({
  classes,
  className,
  buttonLabel,
  hint,
  // omit
  httpClient,
  ...props
}) => (
  <Uploader
    className={cx(classes.root, className)}
    getImagePreviewUrl={getOriginalUrl}
    accept={['image/*']}
    uploadFile={uploadBase64File}
    {...props}
  >
    <Uploader.Consumer>
      {({ files, removeFile }) =>
        files.length === 0 ? (
          <UploadButton
            className={classes.uploadButton}
            iconComponent={CoverPhotoIcon}
            label={buttonLabel}
            hint={hint}
            component={UploaderButtonWithHint}
          />
        ) : (
          <CoverPreview
            url={getOriginalUrl(files[0])}
            onDelete={() => removeFile(files[0].id)}
          />
        )
      }
    </Uploader.Consumer>
  </Uploader>
)

export default injectStyles(styles)(CoverUploader)
