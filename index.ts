import express from 'express'
import config from 'config'
import feedbackRouter from './routers/feedback'
import { debugApp } from './utils/debugger'
import { errorHandler } from './middleware/error'
import db from './db'

const app = express()

db()

debugApp(process.env.NODE_ENV)

const apiRouter = express.Router()
apiRouter.use(express.json())
apiRouter.use('/feedback', feedbackRouter)

app.use('/api/v1', apiRouter)

app.use(errorHandler)

const port = config.get('PORT')
app.listen(port, () => debugApp(`Server started on ${port}`))
