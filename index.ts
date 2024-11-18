import express from 'express'
import config from 'config'
import feedbackRouter from './routers/feedback'
import { debugApp } from './utils/debugger'
import { errorHandler } from './middleware/error'
import db from './db'

const app = express()

// Eventually would probably use: helmet, cors
// If the API is public, consider abuse (DDOS and spam...)

db()

debugApp(process.env.NODE_ENV)

const apiRouter = express.Router()
apiRouter.use(express.json())
apiRouter.use('/feedback', feedbackRouter)

app.use('/api/v1', apiRouter)

app.use(errorHandler)

const port = config.get('PORT')

export function startServer() {
  return app.listen(port, () => debugApp(`Server started on ${port}`))
}

// Only start the server when this file is run, not when the server is imported for testing
if (require.main === module) {
  startServer()
}
