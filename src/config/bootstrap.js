
import { IoCContainer } from '../util/IoCContainer.js'
import { SiteServices } from '../services/SiteServices.js'
import { searchController } from '../controllers/search-controller.js'

import { HomeController } from '../controllers/home-controller.js'

const iocContainer = new IoCContainer()

iocContainer.register('userName', process.env.USER_NAME)
iocContainer.register('elasticPassword', process.env.ELASTIC_PASSWORD)
iocContainer.register('elasticUrl', process.env.ELASTIC_URL)
iocContainer.register('elasticCa', process.env.ELASTIC_CA)
iocContainer.register('baseURL', process.env.BASE_URL)

iocContainer.register('SiteServices', SiteServices, {

  singleton: true
})

iocContainer.register('searchController', searchController, {
  dependencies: [
    'SiteServices'
  ]
})

iocContainer.register('homeController', HomeController, {
})

export const container = Object.freeze(iocContainer)
