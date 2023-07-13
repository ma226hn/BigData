/**
 * The routes.
 */

import express from 'express'
import { router as homeRouter } from './home-router.js'
import { router as searchRouter } from './search-router.js'

export const router = express.Router()
console.log('router')
router.use('/', homeRouter)
router.use('/search', searchRouter)

router.use('*', (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
