# Media distribution and data streams course's project

**Members:** Catrina Koskinen, Kerttu Kamula, Veli-Matti Heino

**Stack:** Express, Socket.IO, Tailwind CSS, Flowbite, MongoDB 

**Start BE**

`npm run start`

**Start the Tailwind CLI build process:**

`npx tailwindcss -i ./src/input.css -o ./public/css/output.css --full --watch`

## API Endpoint Documentation

This document provides details about the various endpoints available in the API and how to use them.

## Table of Contents
- [Authentication](#authentication)
  - [Register](#register)
  - [Login](#login)
- [Messages](#messages)
  - [Post Message](#post-a-message)
  - [Delete Message](#delete-a-message)
  - [Get All Messages](#get-all-messages)
- [Movies](#movies)
  - [Get Movies](#get-movies)
  - [Add Movie](#add-movie)

## Authentication
### Register
**Endpoint:** `POST /api/register`

**Description:** Registers a new user and stores their information in the database.

**Parameter**
| Field                | Type     | Required | Description               |
|--------------------------|----------|----------|-----------------------|
| `email`                  | String   | Yes      | user email            |
| `name`                   | String   | Yes      | user name             |
| `password`               | String   | Yes      | user password         |

**Success Response:**
```json 
HTTP/1.1 200 OK

{
  "message": "Account created successfully"
}
```


**Error Response:**
```json 
HTTP/1.1 400 Bad Request

{
  "message": "Email already exists"
}
```

```json
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
```json
HTTP/1.1 200 OK

{
  "id": "user_id",
  "name": "User Name",
  "email": "user@example.com",
  "token": "generated_jwt_token"
}
```

**Error Response:**
```json 
HTTP/1.1 400 Bad Request

{
  "message": "User not found"
}
```

```json 
HTTP/1.1 400 Bad Request

{
  "message": "Invalid password"
}
```

```json
HTTP/1.1 500 Internal Server Error

{
  "message": "Network error"
}
```
## Messages
### Post a Message
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
```json
HTTP/1.1 200 OK

{
  "message": "Message sent successfully"
}
```
**Error Response:**
```json 
HTTP/1.1 400 Bad Request

{
  "message": "Invalid credentials"
}
```
```json
HTTP/1.1 500 Internal Server Error

{
  "message": "Network error"
}
```
## Delete a Message
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
```json
HTTP/1.1 200 OK

{
  "message": "Message deleted successfully"
}
```
**Error Response:**
```json 
HTTP/1.1 400 Bad Request

{
  "message": "Invalid credentials"
}
```
```json
HTTP/1.1 500 Internal Server Error

{
  "message": "Network error"
}
```
## Get All Messages
**Endpoint:** `GET /api/getAllMessages`

**Description:** Retrieves all messages from the database.

**Success Response:**
```json
HTTP/1.1 200 OK

[
  {
    "name": "User Name",
    "title": "Message Title",
    "rating": 5,
    "comment": "This is a comment.",
    "senderEmail": "user@example.com"
  }
  //... more messages
]
```
**Error Response:**
```json
HTTP/1.1 500 Internal Server Error

{
  "message": "Network error"
}
```
## Movies
### Get Movies
**Endpoint:** `GET /api/getMovies`

**Description:** Retrieves all movies from the database.

**Success Response:**
```json
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
    "director": "Director Name"
  }
  //... more movies
]
```
**Error Response:**
```json
HTTP/1.1 500 Internal Server Error

{
  "message": "Network error"
}
```
## Add Movie
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

**Success Response:**
```json
HTTP/1.1 200 OK

{
  "message": "Movie added successfully"
}
```
**Error Response:**
```json 
HTTP/1.1 400 Bad Request

{
  "message": "Invalid credentials"
}
```
```json
HTTP/1.1 500 Internal Server Error

{
  "message": "Network error"
}
```
