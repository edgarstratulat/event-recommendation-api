import { fastifyCors } from "@fastify/cors";
import { fastifySwagger} from '@fastify/swagger'
import { fastifySwaggerUi} from  '@fastify/swagger-ui'
import { fastify } from "fastify";
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler
} from "fastify-type-provider-zod";
import { env } from "./env";
import { subscribeToEventRoute } from "./routes/subscribe-to-even-route";


const server = fastify().withTypeProvider<ZodTypeProvider>();

server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

server.register(fastifyCors);

server.register(fastifySwagger, {
  openapi:  {
    info: {
      title: 'Event Recommendation App',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

server.register(subscribeToEventRoute)


server.listen({ port: env.PORT }).then(() => {
  console.log("Server connected to http://localhost:8000");
});
