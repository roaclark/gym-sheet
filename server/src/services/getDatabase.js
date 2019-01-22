import massive from 'massive'

import { DATABASE_NAME, DATABASE_URL } from '../config'

const connectionCache = {}

export default () => {
  if (connectionCache[DATABASE_NAME]) {
    return connectionCache[DATABASE_NAME]
  }

  const connection = massive(DATABASE_URL)

  connectionCache[DATABASE_NAME] = connection
  return connectionCache[DATABASE_NAME]
}
