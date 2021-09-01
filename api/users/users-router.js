const express = require('express')
const {
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware')
const User = require('./users-model')
const Post = require('../posts/posts-model')
const router = express.Router()

router.get('/', (req, res, next) => {
  User.get(req.query)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
})

router.post('/', validateUser, (req, res, next) => {
  User.insert(req.body)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((err) => {
      next(err)
    })
})

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  User.update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => {
      next(err)
    })
})

router.delete('/:id', validateUserId, async (req, res) => {
  const deletedUser = await User.getById(req.params.id)
  User.remove(req.params.id).then(() => {
    res.status(200).json(deletedUser)
  })
})

router.get('/:id/posts', validateUserId, (req, res) => {
  User.getUserPosts(req.params.id).then((post) => {
    res.status(200).json(post)
  })
})

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  req.body.user_id = req.params.id
  Post.insert(req.body)
    .then((post) => {
      res.status(201).json(post)
    })
    .catch((err) => {
      next(err)
    })
})

//eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: 'something is wrong with the server',
    message: err.message,
  })
})
module.exports = router
