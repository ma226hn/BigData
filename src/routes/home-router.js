/**
 * Home routes.
 *
 */

import express from 'express'

export const router = express.Router()

/**
 *
 * @param req
 */
const resolveHomeController = (req) => req.app.get('container').resolve('homeController')

router.get('/', (req, res, next) => resolveHomeController(req).index(req, res, next))
