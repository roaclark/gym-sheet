//@flow
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../config'
import getDatabase from './getDatabase'

type User = {
  email: string,
  password: string,
}

const SALT_ROUNDS = 10

export default class UserService {
  table: *

  constructor() {
    this.table = getDatabase().then(db => db.users)
  }

  async registerUser(email: string, password: string): Promise<?User> {
    const usersTable = await this.table
    const existingUser = await usersTable.findOne({ email })
    if (existingUser) {
      return null
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const user = {
      email,
      password: hashedPassword,
    }
    return await usersTable.insert(user)
  }

  async authenticateUser(email: string, password: string): Promise<?User> {
    const usersTable = await this.table
    const user = await usersTable.findOne({ email })

    if (!user) {
      return null
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return null
    }

    const payload = { email }
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '1h',
    })
    return token
  }

  decodeToken(token: string): ?string {
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded && decoded.email
  }
}
