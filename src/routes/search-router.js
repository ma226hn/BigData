/**
 * Search routes.
 *
 */

import express from 'express'

export const router = express.Router()

/**
 *
 * @param req
 */
const resolveSearchController = (req) => req.app.get('container').resolve('searchController')

router.get('/', (req, res, next) => resolveSearchController(req).getData(req, res, next))
