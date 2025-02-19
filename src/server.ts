import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from 'zod'

const server = fastify().withTypeProvider<ZodTypeProvider>();

server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

server.register(fastifyCors);

server.post("/subscriptions", {
    schema: {
        body: z.object({
            name: z.string(),
            email: z.string().email(),
            phone: z.number().optional()
        }),
        response: {
            201: z.object({
                name: z.string(),
                email: z.string().email(),
                phone: z.number().optional()
            })
        }
    }
}, async  (req, res) => {
  const { name, email, phone } = req.body

  return res.status(201).send({name, email, phone})
});

server.listen({ port: 8000 }).then(() => {
  console.log("Server Ligado http://localhost:8000");
});
