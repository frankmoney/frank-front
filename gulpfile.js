const fs = require('fs')
const gulp = require('gulp')
const gutil = require('gulp-util')
const gcPub = require('gulp-gcloud-publish')
const gzip = require('gulp-gzip') // optional

const putDirectoryToGCloud = (localDir, metadata) => () => {
  const base64Keys = process.env.GOOGLE_KEYS
  const bucket = process.env.GOOGLE_BUCKET_NAME
  const projectId = process.env.GOOGLE_PROJECT
  const bucketPath = process.env.GOOGLE_BUCKET_PATH
  const keysFile = 'google_keys.json'

  fs.writeFileSync(keysFile, Buffer.from(base64Keys, 'base64').toString('utf8'))

  return gulp
    .src(localDir)
    .pipe(gzip()) // optional
    .pipe(
      gcPub({
        bucket,
        keyFilename: keysFile,
        projectId,
        base: bucketPath,
        public: true,
        metadata,
      })
    )
    .on('error', gutil.log)
    .on('end', () => fs.unlinkSync(keysFile))
}

gulp.task(
  'gcloud-webapp',
  putDirectoryToGCloud('build/client/**', {
    cacheControl: 'public, max-age=31530000',
    cacheControlHeader: 'public, max-age=31530000',
  })
)
gulp.task(
  'gcloud-widget',
  putDirectoryToGCloud('build/widget/**', {
    cacheControl: 'max-age=3600, no-transform, public',
  })
)
