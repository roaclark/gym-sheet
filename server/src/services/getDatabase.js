import massive from 'massive'

import { DATABASE_CONFIG } from '../config'

const connectionCache = {}

export default () => {
  if (connectionCache[DATABASE_CONFIG.database]) {
    return connectionCache[DATABASE_CONFIG.database]
  }

  const connection = massive(DATABASE_CONFIG)

  connectionCache[DATABASE_CONFIG.database] = connection
  return connectionCache[DATABASE_CONFIG.database]
}
