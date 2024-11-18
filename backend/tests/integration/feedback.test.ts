import request from 'supertest'
import config from 'config'
import { startServer } from '../../index'
import { Server } from 'net'
import { FeedbackModel } from '../../models/feedback'
import { Feedback, FeedbackType, type UnsavedFeedback } from '../../types/common'
import mongoose from 'mongoose'
import db from '../../db'

let server: Server

describe('/api/v1/feedback', () => {
  beforeEach(async () => {
    await db()
    const feedbackA: UnsavedFeedback = {
      name: 'Jo',
      email: 'jo@example.com',
      type: FeedbackType.BUG,
      message: 'I am unable to find anything on this website...'
    }
    const feedbackB: UnsavedFeedback = {
      name: 'Nicola',
      email: 'nico@example.com',
      type: FeedbackType.SUGGESTION,
      message: 'The buy now button is broken'
    }
    const feedbackC: UnsavedFeedback = {
      name: 'Angel',
      email: 'angel@example.com',
      type: FeedbackType.BUG,
      message: 'Contact form submission does not work for me'
    }
    const feedbackD: UnsavedFeedback = {
      name: 'Angel',
      email: 'angel@example.com',
      type: FeedbackType.SUGGESTION,
      message: 'Why not just fix your app?'
    }
    // Add individually so `createdAt` is different to test sort by date
    await FeedbackModel.create(feedbackA)
    await FeedbackModel.create(feedbackB)
    await FeedbackModel.create(feedbackC)
    await FeedbackModel.create(feedbackD)
    server = startServer() as Server
  })
  afterEach(async () => {
    server.close()
    await FeedbackModel.deleteMany()
    mongoose.connection.close()
  })

  describe('GET /', () => {
    it('should return all feedback with default sorting', async () => {
      const res = await request(server).get('/api/v1/feedback')
      const body = res.body as Feedback[]

      expect(res.status).toBe(200)
      expect(body.length).toBe(4)
      // Test default `createdAt` desc sorting
      expect(body[0].name === 'Angel').toBeTruthy()
      expect(body[1].name === 'Angel').toBeTruthy()
      expect(body[2].name === 'Nicola').toBeTruthy()
      expect(body[3].name === 'Jo').toBeTruthy()
    })

    it('should return 400 if `name` query param is invalid', async () => {
      const maxNameLength = config.get('NAME_MAX_LENGTH') as number
      const nameOneCharTooLong = new Array(maxNameLength + 2).join('a')
      const res = await request(server).get(`/api/v1/feedback?name=${nameOneCharTooLong}`)
      expect(res.status).toBe(400)
    })
    it('should return 400 if `pageNumber` query param is invalid', async () => {
      const res = await request(server).get('/api/v1/feedback?pageNumber=string')
      expect(res.status).toBe(400)
    })
    it('should return 400 if `pageSize` query param is invalid', async () => {
      const res = await request(server).get('/api/v1/feedback?pageSize=string')
      expect(res.status).toBe(400)
    })
    it('should return 400 if `sortBy` query param is invalid', async () => {
      const res = await request(server).get('/api/v1/feedback?sortBy=monkey')
      expect(res.status).toBe(400)
    })
    it('should return 400 if `sortOrder` query param is invalid', async () => {
      const res = await request(server).get('/api/v1/feedback?sortOrder=monkey')
      expect(res.status).toBe(400)
    })

    it('should return all feedback sorted by date ASC', async () => {
      const res = await request(server).get('/api/v1/feedback?sortBy=createdAt&sortOrder=asc')
      const body = res.body as Feedback[]

      expect(res.status).toBe(200)
      expect(body[0].name === 'Jo').toBeTruthy()
      expect(body[1].name === 'Nicola').toBeTruthy()
      expect(body[2].name === 'Angel').toBeTruthy()
      expect(body[3].name === 'Angel').toBeTruthy()
    })
    it('should return all feedback sorted by date DESC', async () => {
      const res = await request(server).get('/api/v1/feedback?sortBy=createdAt&sortOrder=desc')
      const body = res.body as Feedback[]

      expect(res.status).toBe(200)
      expect(body[3].name === 'Jo').toBeTruthy()
      expect(body[2].name === 'Nicola').toBeTruthy()
      expect(body[1].name === 'Angel').toBeTruthy()
      expect(body[0].name === 'Angel').toBeTruthy()
    })

    it('should return posts filtered by name', async () => {
      const res = await request(server).get('/api/v1/feedback?name=Angel')

      expect(res.status).toBe(200)
      expect(res.body.length).toBe(2)
    })

    it('should return paginated feedback', async () => {
      const res = await request(server).get('/api/v1/feedback?pageSize=2&pageNumber=2')

      const body = res.body as Feedback[]

      console.log('body', body)

      expect(res.status).toBe(200)
      expect(body.length).toBe(2)
      expect(body[0].name).toBe('Nicola')
      expect(body[1].name).toBe('Jo')
    })

    it('should handle multiple query parameters together', async () => {
      const res = await request(server).get(
        '/api/v1/feedback?name=Angel&pageSize=1&pageNumber=1&sortBy=createdAt&sortOrder=asc'
      )
      const body = res.body as Feedback[]

      expect(res.status).toBe(200)
      expect(body).toHaveLength(1)
      expect(body[0].name).toBe('Angel')
    })

    // Test error handling
    it('should return 500 when database query fails', async () => {
      // Force an error by closing the connection
      await mongoose.connection.close()

      const res = await request(server).get('/api/v1/feedback')
      expect(res.status).toBe(500)
      expect(res.body).toHaveProperty('error', 'Internal server error')

      // Reconnect for cleanup
      await db()
    })
  })

  describe('POST /', () => {
    it('should return 400 if name is too long', async () => {
      const maxNameLength = config.get('NAME_MAX_LENGTH') as number
      const nameOneCharTooLong = new Array(maxNameLength + 2).join('a')
      const res = await request(server).post('/api/v1/feedback').send({
        name: nameOneCharTooLong,
        email: 'michelle@example.com',
        type: FeedbackType.SUGGESTION,
        message: 'How about making the website yellow?'
      })

      expect(res.status).toBe(400)
    })
    it('should return 400 if email is invalid', async () => {
      const res = await request(server).post('/api/v1/feedback').send({
        name: 'Michelle',
        email: 'lemons',
        type: FeedbackType.SUGGESTION,
        message: 'How about making the website yellow?'
      })

      expect(res.status).toBe(400)
    })
    it('should return 400 if feedback type is invalid', async () => {
      const res = await request(server).post('/api/v1/feedback').send({
        name: 'Michelle',
        email: 'michelle@example.com',
        type: 'tree',
        message: 'How about making the website yellow?'
      })

      expect(res.status).toBe(400)
    })
    it('should return 400 if message is too long', async () => {
      const maxMessageLength = config.get('MESSAGE_MAX_LENGTH') as number
      const messageOneCharTooLong = new Array(maxMessageLength + 2).join('a')
      const res = await request(server).post('/api/v1/feedback').send({
        name: 'Michelle',
        email: 'michelle@example.com',
        type: FeedbackType.SUGGESTION,
        message: messageOneCharTooLong
      })

      expect(res.status).toBe(400)
    })
    it('should return 400 if feedback properties are missing', async () => {
      const res = await request(server).post('/api/v1/feedback').send({})

      expect(res.status).toBe(400)
    })
    it('should save the feedback, return the feedback and 201', async () => {
      const res = await request(server).post('/api/v1/feedback').send({
        name: 'Michelle',
        email: 'michelle@example.com',
        type: FeedbackType.SUGGESTION,
        message: 'How about making the website yellow?'
      })

      const feedback = await FeedbackModel.find({ name: 'Michelle' })

      expect(res.status).toBe(201)
      expect(feedback).not.toBeNull()
    })
  })
})
