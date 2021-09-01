const express = require('express')
const {
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware')
const User = require('./users-model')

const router = express.Router()

router.get('/', (req, res) => {
  User.get(req.query)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
})

router.post('/', validateUser, (req, res) => {
  User.insert(req.body)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.put('/:id', validateUserId, validateUser, (req, res) => {
  User.update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.delete('/:id', validateUserId, async (req, res) => {
  const deletedUser = await User.getById(req.params.id)
  User.remove(req.params.id).then((user) => {
    console.log(user)
    res.status(200).json(deletedUser)
  })
})

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  User.getUserPosts(req.body).then((post) => {
    console.log(post)
    res.status(200).json(post)
  })
})

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
})

module.exports = router
