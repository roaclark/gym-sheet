exports.up = db => {
  return db.createTable('users', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    email: 'string',
    password: 'string',
  })
}

exports.down = db => {
  return db.dropTable('users')
}
