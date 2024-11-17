# A Simple Feedback App

The backend expects MongoDB to be running locally on the default port ([Install MongoDB](https://www.mongodb.com/docs/manual/installation/)).

Seed sample data:

```bash
npm run seed
```

Run the backend locally:

```bash
npm start
```

## API Endpoint Sample Curls

```bash
curl http://localhost:8000/api/v1/feedback | python -m json.tool
```

```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{
  "name": "Ronald",
  "email": "me@example.com",
  "feedbackType": "bug",
  "message": "The home button is broken" 
}' \
http://localhost:8000/api/v1/feedback | python -m json.tool
```
