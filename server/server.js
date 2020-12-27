import chalk from 'chalk'
import express from 'express'
import { createLogger, format, transports } from 'winston'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'

import router from './api/routes'

dotenv.config()

const logger = createLogger({
  level: 'debug',
  format: format.simple(),
  transports: [new transports.Console()]
})
const app = express()
const corsOptions = {
  credentials: true,
  origin: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)

app.get('*', (req, res) =>
  res.status(200).send({
    status: 'fail',
    message: 'Route not found'
  })
)

// configure port and listen for requests
const port = process.env.PORT || 8080

app.listen(port, () => {
  logger.debug(`Server running on  http://localhost:${chalk.blue(port)}`)
})

export default app