import express from 'express'
import pino from 'express-pino-logger'

const { Nuxt } = require('nuxt')
const config = require('../nuxt.config.js')

config.dev = false

const nuxt = new Nuxt(config)

// @ts-ignore
nuxt.hook('render:errorMiddleware', (app) => {
  // @ts-ignore
  app.use((error, req, res, next) => {
    // @ts-ignore
    req.log.error(error)
    // @ts-ignore
    next(error)
  })
})

const app = express()

app.use(pino())

app.use(async (req, res, next) => {
  await nuxt.ready()
  nuxt.render(req, res, next)
})

app.listen(3000)
