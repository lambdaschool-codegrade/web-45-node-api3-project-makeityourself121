const express = require('express')
const {
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware')
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const User = require('./users-model')

const router = express.Router()

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get(req.query)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
})

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert(req.body)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.delete('/:id', validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const deletedUser = await User.getById(req.params.id)
  User.remove(req.params.id).then((user) => {
    console.log(user)
    res.status(200).json(deletedUser)
  })
})

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
})

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
})

// do not forget to export the router
module.exports = router
