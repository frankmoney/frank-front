export default function initRoutes(app, { authCookieName }) {
  app.get('/login', (req, res) => {
    res.cookie(authCookieName, req.query.user)
    res.redirect('/')
  })
  app.get('/logout', (req, res) => {
    res.cookie(authCookieName, '', { expires: new Date(0) })
    res.redirect('/')
  })
}
