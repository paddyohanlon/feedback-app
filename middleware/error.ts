import { ErrorRequestHandler } from 'express'
import { debugApp } from '../utils/debugger'

/**
 * Error handling middleware
 *
 * `express-async-errors` is required in `index.js`, which effectively wraps
 * all controllers in `try catch` blocks.
 */
export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  // Could log errors somewhere better using something like Winston
  debugApp(err)

  res.status(500).json({ message: 'Internal server error' })
}
