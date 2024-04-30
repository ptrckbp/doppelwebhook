import { IntegrationDefinition } from '@botpress/sdk'
import { z } from 'zod'

export default new IntegrationDefinition({
  name: 'breaking-integrations/darkhook',
  version: '0.2.0',
  title: 'Darkhook',
  description: 'This integration allows your bot to interact with Darkhook.',
  icon: 'icon.svg',
  readme: 'readme.md',
  configuration: {
    schema: z.object({
      secret: z.string().optional(),
    }),
  },
  events: {
    event: {
      schema: z
        .object({
          conversationId: z.string(),
        })
        .passthrough(),
    },
  },
})
