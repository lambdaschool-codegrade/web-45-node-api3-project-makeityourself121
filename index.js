const server = require('./api/server')

server.listen(5000, () => {
  console.log('Server runing on http://localhost:5000')
})
