const gulp = require('gulp')
const azure = require('gulp-deploy-azure-cdn')
const gutil = require('gulp-util')

gulp.task('azure', () =>
  gulp
    .src('./build/client/**')
    .pipe(
      azure({
        containerName: 'assets', // container name in blob
        serviceOptions: [
          'DefaultEndpointsProtocol=https;AccountName=frankassets;AccountKey=5Etp5UdlquiJPi7+6AuW9qlWGUCIcpX2iy0rYp47J/av7/Ynl3/J4aPzPkN8aA0J1I0Kige0oz/qjtrUqT1HnQ==',
        ], // custom arguments to azure.createBlobService
        folder: 'frank', // path within container
        zip: true, // gzip files if they become smaller after zipping, content-encoding header will change if file is zipped
        deleteExistingBlobs: false, // true means recursively deleting anything under folder
        concurrentUploadThreads: 10, // number of concurrent uploads, choose best for your network condition
        metadata: {
          cacheControl: 'public, max-age=31530000', // cache in browser
          cacheControlHeader: 'public, max-age=31530000', // cache in azure CDN. As this data does not change, we set it to 1 year
        },
      })
    )
    .on('error', gutil.log)
)
