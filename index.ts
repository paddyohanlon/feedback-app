import express from 'express'
import feedbackRouter from './routers/feedback'
import { debugApp } from './utils/debugger'

const app = express()

const apiRouter = express.Router()
apiRouter.use(express.json())
apiRouter.use('/feedback', feedbackRouter)

app.use('/api/v1', apiRouter)

const port = process.env.PORT || 8000
app.listen(port, () => debugApp(`Server started on ${port}`))
