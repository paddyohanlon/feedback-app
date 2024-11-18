# A Simple Feedback App

The backend expects MongoDB to be running locally on the default port ([Install MongoDB](https://www.mongodb.com/docs/manual/installation/)).

Seed sample data:

```bash
npm run seed
```

Install frontend and backend dependencies:

```bash
npm run install-all
```

Build the frontend:

```bash
npm run build
```

Run the backend:

```bash
npm run backend
```

Then, view the built frontend at <http://localhost:8000>

Or, run the frontend and backend concurrently:

```bash
npm run dev
```

The backend will run on `http://localhost:8000`. The frontend will run on `http://localhost:5173/` (if `5173` is available, check the command output to double-check the port)

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
  "type": "bug",
  "message": "The home button is broken" 
}' \
http://localhost:8000/api/v1/feedback | python -m json.tool
```
