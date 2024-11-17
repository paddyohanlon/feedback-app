import mongoose from 'mongoose'
import { debugApp } from '../utils/debugger'
import config from 'config'

export default function () {
  mongoose.connect(config.get('DB_URL')).then(() => debugApp('Connected to MongoDB...'))

  mongoose.connection.on('error', (err) => {
    debugApp(err)
  })
}
