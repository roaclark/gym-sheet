//@flow
import UserService from './services/UserService'

const getTokenFromHeader = (authHeader: string): ?string => {
  if (!authHeader) {
    return null
  }

  const parts = authHeader.split(' ')
  if (parts.length < 2 || parts[0] !== 'Bearer') {
    return null
  }
  return parts[1]
}

export const withAuth = (req: *, res: *, next: *) => {
  const token =
    req.body.token ||
    req.query.token ||
    getTokenFromHeader(req.headers['authorization'])

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
