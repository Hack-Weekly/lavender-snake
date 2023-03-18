# Backend

To run dev server:

```
npm run dev
```

## Authentication docs

For frontend:

- To register a user, send a POST request to `/user/signup` with request body in this format:
  ```json
  {
    "email": "alice@dummy.com",
    "password": "alice123",
    "username": "Alice"
  }
  ```
- To login a user, send a POST request to `/user/login` with request body in this format:
  ```json
  {
    "email": "bob@dummy.com",
    "password": "bob123"
  }
  ```
- Both endpoints will return data in this format:
  ```json
  {
    "id": "bobid",
    "name": "Bob",
    "picture": "https://robohash.org/Bob",
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJvYmlkIiwiaWF0IjoxNjc5MTQ2MTU0fQ.c0N0BqMXndH7iQDa8kNtUPy349aRjOzCxRMRbJKeoFI"
  }
  ```
- To access a protected route, make sure to send the auth_token in request header prefixed with 'Bearer'
  ```
  authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJvYiIsImlhdCI6MTY3OTEzNjE4Nn0.3TZKiauRcTErc9w6xRkMoLCdGn7Ojbo3_jLU0MB-uTE'
  ```

For backend:

- To mark a route as protected, simply add the hook `server.authenticate`.
  ```ts
  // example of a protected route
  server.get('/', { onRequest: [server.authenticate] }, async (req, reply) => {
    reply.send({ message: 'hello from protected route' })
  })
  ```
