# Media distribution and data streams course's project

**Members:** Catrina Koskinen, Kerttu Kamula, Veli-Matti Heino

**Stack:** Express, Socket.IO, Tailwind CSS, Flowbite, MongoDB, EmailJS

**Install dependencies:**

`npm install`

**Start Backend:**

`npm run start / nodemon index.js`

**Start the Tailwind CLI build process:**

`npx tailwindcss -i ./src/input.css -o ./public/css/output.css --full --watch`

**Project website** 

https://mediapalvelin.northeurope.cloudapp.azure.com/

## API Endpoint Documentation

This document provides details about the various endpoints available in the API and how to use them.

>:warning: API requires access credentials to MongoDB if you want to run it locally.

## Table of Contents
- [Authentication](#authentication)
  - [Register](#register)
  - [Login](#login)
  - [Authenticate user](#authenticate-user)
- [Messages](#messages)
  - [Post a message](#post-a-message)
  - [Delete a message](#delete-a-message)
  - [Get all messages](#get-all-messages)
- [Movies](#movies)
  - [Get all movies](#get-all-movies)
  - [Add a movie](#add-a-movie)

## Authentication

### Register

**Endpoint:** `POST /api/register`

**Description:** Registers a new user and stores their information into the database.

**Parameter**
| Field                | Type     | Required | Description               |
|--------------------------|----------|----------|-----------------------|
| `email`                  | String   | Yes      | user email            |
| `name`                   | String   | Yes      | user name             |
| `password`               | String   | Yes      | user password         |

**Success Response:**
```javascript 
HTTP/1.1 200 OK

{
  "message": "Account created successfully"
}
```

**Error Response:**
```javascript 
HTTP/1.1 400 Bad Request

{
  "message": "Email already exists"
}
```

```javascript
HTTP/1.1 500 Internal Server Error

{
  "message": "Network error"
}
```

### Login

**Endpoint:** `POST /api/login`

**Description:** Logs in a user and generates a JWT token.

**Parameter**
| Field                | Type     | Required | Description               |
|--------------------------|----------|----------|-----------------------|
| `email`                  | String   | Yes      | user email            |
| `password`               | String   | Yes      | user password         |

**Success Response:**
```javascript
HTTP/1.1 200 OK

{
  "id": "user_id",
  "name": "User Name",
  "email": "user@example.com",
  "token": "generated_jwt_token"
}
```

**Error Response:**
```javascript 
HTTP/1.1 400 Bad Request

{
  "message": "User not found"
}
```

```javascript 
HTTP/1.1 400 Bad Request

{
  "message": "Invalid password"
}
```

```javascript
HTTP/1.1 500 Internal Server Error

{
  "message": "Network error"
}
```

### Authenticate user

**Endpoint:** `POST /api/authUser`

**Description:** verifies jwt token and returns either http 200 or 400.

**Header**
| Field                | Type     | Required | Description           |
|----------------------|----------|----------|-----------------------|
| `x-access-token`     | String   | Yes      | Authentication token  |

**Success Response:**
```javascript
HTTP/1.1 200 OK

{
  "message": "Authorized"
}
```

**Error Response:**
```javascript 
HTTP/1.1 400 Bad Request

{
  "message": "Invalid credentials"
}
```

## Messages

### Post a message

**Endpoint:** `POST /api/postMessage`

**Description:** Posts a message to the database.

**Header**
| Field                | Type     | Required | Description           |
|----------------------|----------|----------|-----------------------|
| `x-access-token`     | String   | Yes      | Authentication token  |

**Parameter**
| Field                | Type     | Required | Description           |
|----------------------|----------|----------|-----------------------|
| `name`               | String   | Yes      | user name             |
| `title`              | String   | Yes      | message title         |
| `rating`             | Number   | Yes      | website rating        |
| `comment`            | String   | Yes      | user message          |
| `senderEmail`        | String   | Yes      | message sender email  |

**Success Response:**
```javascript
HTTP/1.1 200 OK

{
  "message": "Message sent successfully"
}
```

**Error Response:**
```javascript 
HTTP/1.1 400 Bad Request

{
  "message": "Invalid credentials"
}
```

```javascript
HTTP/1.1 500 Internal Server Error

{
  "message": "Network error"
}
```

### Delete a message

**Endpoint:** `DELETE /api/deleteMessage`

**Description:** Deletes a message from the database.

**Header**
| Field                | Type     | Required | Description           |
|----------------------|----------|----------|-----------------------|
| `x-access-token`     | String   | Yes      | Authentication token  |

**Parameter**
| Field                | Type     | Required | Description           |
|----------------------|----------|----------|-----------------------|
| `userId`             | String   | Yes      | current users id      |
| `messageId`          | String   | Yes      | messages id           |
| `senderEmail`        | String   | Yes      | message owner email   |

**Success Response:**
```javascript
HTTP/1.1 200 OK

{
  "message": "Message deleted successfully"
}
```

**Error Response:**
```javascript 
HTTP/1.1 400 Bad Request

{
  "message": "Invalid credentials"
}
```

```javascript
HTTP/1.1 500 Internal Server Error

{
  "message": "Network error"
}
```

### Get all messages

**Endpoint:** `GET /api/getAllMessages`

**Description:** Retrieves all messages from the database.

**Success Response:**
```javascript
HTTP/1.1 200 OK

[
  {
    "name": "User Name",
    "title": "Message Title",
    "rating": 5,
    "comment": "This is a comment.",
    "senderEmail": "user@example.com"
  },
  //... more messages
]
```

**Error Response:**
```javascript
HTTP/1.1 500 Internal Server Error

{
  "message": "Network error"
}
```

## Movies

### Get all movies

**Endpoint:** `GET /api/getMovies`

**Description:** Retrieves all movies from the database.

**Success Response:**
```javascript
HTTP/1.1 200 OK

[
  {
    "name": "Movie Name",
    "time": "10/04/2023 14:00",
    "endTime": "10/04/2023 14:40",
    "length": "125",
    "rating": 4.5,
    "genre": "Action",
    "summary": "Movie summary",
    "director": "Director Name",
    "videolink": "https://www.youtube.com/..."
  },
  //... more movies
]
```

**Error Response:**
```javascript
HTTP/1.1 500 Internal Server Error

{
  "message": "Network error"
}
```

### Add a movie

**Endpoint:** `POST /api/addMovie`

**Description:** Adds a new movie to the database.

**Header**
| Field                | Type     | Required | Description           |
|----------------------|----------|----------|-----------------------|
| `x-access-token`     | String   | Yes      | Authentication token  |

**Parameter**
| Field                | Type     | Required | Description               |
|----------------------|----------|----------|---------------------------|
| `name`               | String   | Yes      | movie name                |
| `time`               | String   | Yes      | movie start time          |
| `endTime`            | String   | Yes      | movie end time            |
| `length`             | String   | Yes      | movie length in minutes   |
| `rating`             | String   | Yes      | movie rating              |
| `genre`              | String   | Yes      | movie genre               |
| `summary`            | String   | Yes      | movie summary             |
| `director`           | String   | Yes      | movie director            |
| `videolink`          | String   | Yes      | link to the movie file    |

**Success Response:**
```javascript
HTTP/1.1 200 OK

{
  "message": "Movie added successfully"
}
```

**Error Response:**
```javascript 
HTTP/1.1 400 Bad Request

{
  "message": "Invalid credentials"
}
```

```javascript
HTTP/1.1 500 Internal Server Error

{
  "message": "Network error"
}
```
