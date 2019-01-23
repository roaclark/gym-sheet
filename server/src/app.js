//@flow
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import { withAuth } from './middleware'
import UserService from './services/UserService'

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '../../client/dist')))

app.get('/api', (req, res) => {
  res.send('Hello from the server!')
})

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body
  const userService = new UserService()
  const user = await userService.registerUser(email, password)

  if (user) {
    res.sendStatus(200)
  } else {
    res.status(500).send('Error registering new user')
  }
})

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  const userService = new UserService()
  const token = await userService.authenticateUser(email, password)

  if (token) {
    res.status(200).send(token)
  } else {
    res.status(401).send('Incorrect username or password')
  }
})

app.get('/api/identity', withAuth, (req, res) => {
  const { email, id } = req.user
  res.send({ email, id })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`) // eslint-disable-line no-console
})
