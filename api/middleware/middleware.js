const User = require('../users/users-model')

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method}
     to ${req.url}`,
  )
  next()
}

function validateUserId(req, res, next) {
  const { id } = req.params
  User.getById(id).then((possibleUser) => {
    if (possibleUser) {
      req.user = possibleUser
      next()
    } else {
      res.status(404).json({
        message: 'user not found',
      })
    }
  })
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.name) {
    res.status(400).json({
      message: 'missing required name field',
    })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser }
