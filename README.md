# A Simple Feedback App

Run the backend locally:

```bash
npm start
```

## API Endpoint Curls

```bash
curl http://localhost:8000/api/v1/feedback
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
http://localhost:8000/api/v1/feedback
```
