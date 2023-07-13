
import { SiteServices } from '../services/SiteServices.js'

/**
 *
 */
export class searchController {
  /**
   * The service.
   *
   * @type {SiteServices}
   */
  #service

  /**
   * Initializes a new instance.
   *
   * @param {SiteServices} service - A service instantiated from a class with the same capabilities as siteService.
   */
  constructor (service = new SiteServices()) {
    this.#service = service
  }

  /**
   * Function to get the access token.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  async getData (req, res, next) {
    try {
      const { ...query } = req.query
      for (const key in query) {
        console.log(`${key}: ${query[key]}`)
      }
      const userCredential = {
        userName: req.app.get('container').resolve('userName'),
        password: req.app.get('container').resolve('elasticPassword'),
        elasticUrl: req.app.get('container').resolve('elasticUrl'),
        elasticCa:req.app.get('container').resolve('elasticCa')
      }
      let viewData = {}
      this.#service.search(userCredential, query).then((response) => {
        // if no data found
        if (response.hits.total.value === 0) {
           res.render('search/noData', { viewData, query }) 
          } else {
          viewData = response.hits.hits
          res.render('search/index', { viewData, query })
        }
      })
    } catch (error) {
      next(error)
    }
  }
}
