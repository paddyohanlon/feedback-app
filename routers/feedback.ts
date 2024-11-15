import { Router } from 'express'
import { debugApp } from '../utils/debugger'

const router = Router()

router.get('/', (req, res) => {
  debugApp('GET feedback')
  res.json({ message: 'get feedback' })
})

router.post('/', (req, res) => {
  debugApp('POST feedback')
  debugApp('req.body', req.body)
  res.json({ message: 'post feedback' })
})

export default router
