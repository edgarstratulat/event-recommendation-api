import type {  FastifyPluginAsyncZod} from 'fastify-type-provider-zod'
import { z} from 'zod'

export const subscribeToEventRoute: FastifyPluginAsyncZod =  async (server) => {
    server.post("/subscriptions", {
        schema: {
            summary: 'Subscribe to an event',
            tags: ['Subscription an Event'],
            body: z.object({
                name: z.string(),
                email: z.string().email(),
            }),
            response: {
                201: z.object({
                    name: z.string(),
                    email: z.string().email(),
                })
            }
        }
    }, async  (req, res) => {
      const { name, email } = req.body
    
      return res.status(201).send({name, email})
    });
}

