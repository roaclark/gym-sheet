import massive from 'massive'

const GYM_DATABASE = 'gym'
const GYM_DATABASE_CONFIG = {
  host: 'localhost',
  port: 5432,
  database: 'gym',
  user: 'postgres',
  password: 'password',
}

const connectionCache = {}

export default () => {
  if (connectionCache[GYM_DATABASE]) {
    return connectionCache[GYM_DATABASE]
  }

  const connection = massive(GYM_DATABASE_CONFIG)

  connectionCache[GYM_DATABASE] = connection
  return connectionCache[GYM_DATABASE]
}
