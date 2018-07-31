import * as Vibrant from 'node-vibrant'

export default (req, res) => {
  const url = req.query.url
  Vibrant.from(url)
    .getPalette()
    .then(palette => res.send(palette))
}
