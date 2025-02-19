import { fastify  } from 'fastify'
import { fastifyCors } from '@fastify/cors'

const server = fastify();

server.register(fastifyCors, {
    origin: 'http:localhost:3000',
})

server.get('/hello', (req, res) => {
    res.send({ Message: 'Hello World'})
})

server.listen({ port: 8000}).then(() => {
    console.log("Server Ligado http://localhost:8000")
})