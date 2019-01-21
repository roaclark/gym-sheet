//@flow
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

type User = {
  email: string,
  password: string,
}

const SALT_ROUNDS = 10
const SECRET = 'temporary_secret'

const users: { [string]: User } = {}

export default class UserService {
  async registerUser(email: string, password: string): Promise<?User> {
    if (users[email]) {
      return null
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const user = {
      email,
      password: hashedPassword,
    }
    users[email] = user
    return user
  }

  async authenticateUser(email: string, password: string): Promise<?User> {
    const user = users[email]

    if (!user) {
      return null
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return null
    }

    const payload = { email }
    const token = jwt.sign(payload, SECRET, {
      expiresIn: '1h',
    })
    return token
  }
}
