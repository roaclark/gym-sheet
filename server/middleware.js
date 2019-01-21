import UserService from './services/UserService'

export const withAuth = (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token

  if (!token) {
    return res.status(401).send('Unauthorized: No token provided')
  }

  const userService = new UserService()
  try {
    req.email = userService.decodeToken(token)
    next()
  } catch {
    res.status(401).send('Unauthorized: Invalid token')
  }
}
