import { Client } from "@elastic/elasticsearch"

/**
 *
 */
export class SiteServices {
  /**
   *
   * @param user
   * @param query
   */
  async search (user, query) {
    
    const client = new Client({
      node: `${user.elasticUrl}`,
      auth: {
        username: `${user.userName}`,
        password: `${user.password}`
      },
      tls: {
        ca: `${user.elasticCa}`,
        rejectUnauthorized: false
      }
    })
    // const client = new Client({
    //   host: `${user.elasticUrl}`,
    //   log: 'trace',
    //   httpAuth: `${user.userName}:${user.password}`
    // })
    try {
      let response
      // the URL query has value of from so its the query of find result between two years
      if (query.from) {
        response = await client.search({
          index: 'tourism',
          body: {
            query: {
              range: {
                year: {
                  gte: `${query.from}`,
                  lte: `${query.to}`
                }
              }
            },
            size:100,

            _source: true // include the _source field in the response
          }
        })
      } else if (query.name) {  // its query to find the result for a name of one country
        response = await client.search({
          index: 'tourism',
          body: {
            query: {
              match: {
                name: `${query.name}`
              }
            }

          },
          size: 200,
          _source: true // include the _source field in the response
        }
        )
      } else { // query  to get all data
        response = await client.search({
          index: 'tourism',
          body: {
            query: {
              match_all: {}
            }

          },
          size: 4156,
          _source: true // include the _source field in the response
        }
        )
      }
      return response
    } catch (error) {
      console.error(error)
      return []
    }
  }
}
