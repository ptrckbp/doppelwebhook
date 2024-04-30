
import qs from 'qs'
import * as botpress from '.botpress'


const integration = new botpress.Integration({
  handler: async ({ req, client, ctx }) => {
    if (ctx.configuration.secret && req.headers['x-bp-secret'] !== ctx.configuration.secret) {
      throw new Error('Invalid secret')
    }

    const method = req.method.toUpperCase()
    if (!['POST', 'GET'].includes(method)) {
      throw new Error('Invalid method')
    }

    const query = req.query ? qs.parse(req.query) : {}

    let body = {}
    try {
      body = JSON.parse(req.body ?? '{}')
    } catch (err) {}

    await client.createEvent({
      type: 'breaking-integrations/darkhook:event',
      payload: {
        conversationId: body.conversationId,
      },
    })
  },
  register: async () => {},
  unregister: async () => {},
  actions: {},
  channels: {},
})

export default integration
