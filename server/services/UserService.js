//@flow
import bcrypt from 'bcrypt'

type User = {
  email: string,
  password: string,
}

const SALT_ROUNDS = 10

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

  async getUser(email: string, password: string): Promise<?User> {
    const user = users[email]

    if (!user) {
      return null
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    return passwordMatch ? user : null
  }
}
