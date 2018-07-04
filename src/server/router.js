export default function initRoutes(app, { authCookieName }) {
  app.get('/sign-out', (req, res) => {
    res.cookie(authCookieName, '', { expires: new Date(0), httpOnly: true })
    res.redirect('/')
  })
}
