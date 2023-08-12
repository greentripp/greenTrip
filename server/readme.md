# Green Trip

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
  - [Auth](#auth)
  - [Users](#users)
  - [Points](#points)
  - [Activities](#activities)
  - [Rewards](#rewards)
  - [Vouchers](#vouchers)
  - [Regions](#regions)
- [Conclusion](#conclusion)

## Introduction

Welcome to the documentation for **Green Trip** – an innovative platform for booking points of interest, activities, and rewards. This document provides an overview of the project, the technologies used, database schema, and a comprehensive table of contents to navigate through the API endpoints and functionalities.

## Technologies Used

Green Trip is built using a variety of technologies to ensure a seamless and secure experience for both users and administrators:

- **Node.js**: The backend of Green Trip is developed using Node.js for its fast and efficient server-side capabilities.
- **Express.js**: Express.js is used to create robust and scalable APIs and handle various HTTP requests.
- **MongoDB**: The project utilizes MongoDB as the database to store user data, bookings, points of interest, activities, rewards, and more.
- **JWT (JSON Web Tokens)**: JSON Web Tokens are employed for secure user authentication and authorization.
- **Figma**: The project's design and layout are planned using Figma, resulting in an intuitive and visually appealing user interface.
- **Android App (Separate Repo)**: Green Trip extends its reach with a dedicated Android app, providing on-the-go access to the platform's features.
- **Various Middleware**: Custom middleware is implemented to handle authentication, data validation, image uploads, and more.

## Database Schema

## Schema

**User**:

| Attribute            | Type    |
| -------------------- | ------- |
| Name                 | STRING  |
| Email                | STRING  |
| Avatar               | STRING  |
| Role                 | STRING  |
| Password             | STRING  |
| PasswordConfirm      | STRING  |
| PasswordChangedAt    | DATE    |
| PasswordResetToken   | STRING  |
| PasswordResetExpires | DATE    |
| Active               | BOOLEAN |
| Phone                | STRING  |
| Region               | STRING  |
| Points               | NUMBER  |
| Bookings             | FK      |
| Vouchers             | FK      |

**Point of Interest**:

| Attribute         | Type   |
| ----------------- | ------ |
| Name              | STRING |
| Address           | STRING |
| Region            | STRING |
| Photo             | STRING |
| Available Tickets | NUMBER |
| Cost Points       | STRING |
| Category          | STRING |
| Agent             | USERID |
| Slug              | STRING |
| QR Code           | STRING |
| Activities        | FK     |

**Activity**:

| Attribute         | Type   |
| ----------------- | ------ |
| Name              | STRING |
| Point of Interest | FK     |
| Reservation Limit | NUMBER |
| Description       | STRING |
| Start At          | DATE   |

**Booking**:

| Attribute    | Type     |
| ------------ | -------- |
| Type         | STRING   |
| Point        | MONGOGID |
| Activity     | MONGOGID |
| User         | MONGOGID |
| Status       | STRING   |
| NumOfTickets | NUMBER   |
| NumOfDays    | NUMBER   |
| Paid         | BOOLEAN  |
| CreatedAt    | DATE     |

**Reward**:

| Attribute         | Type   |
| ----------------- | ------ |
| Title             | STRING |
| Description       | STRING |
| Point of Interest | FK     |
| Cost Points       | NUMBER |
| Expire Date       | DATE   |
| QR Code           | STRING |

**Voucher**:

| Attribute | Type    |
| --------- | ------- |
| User      | FK      |
| Reward    | FK      |
| Paid      | BOOLEAN |
| CreatedAt | DATE    |

**Region**:

| Attribute | Type   |
| --------- | ------ |
| Name      | STRING |

## API Endpoints

- ### Auth:

```bash
  - [GET] /
  - [POST] /signup
  - [POST] /login
  - [POST] /adminLogin
  - [GET] /logout
  - [POST] /forgotPassword
  - [PATCH] /resetPassword/:token
  - [GET] /resetPassword/verify/:token
  - [Use protect middleware]
  - [PATCH] /updateMyPassword
  - [GET] /me
  - [DELETE] /me
```

- ### Users:

```bash

  - [GET] /
  - [Use protect middleware]
  - [PATCH] /updateUserData
  - [PATCH] /points/add
  - [PATCH] /points/remove
  - [GET] /:id
```

- ### Points:

```bash
  - [GET] /
  - [Use protect middleware]
  - [POST] /
  - [GET] /:id
  - [PATCH] /:id
  - [DELETE] /:id
```

- ### Activities:

```bash
  - [GET] /
  - [Use protect middleware]
  - [POST] /
  - [GET] /points/:pointId
  - [GET] /:id
  - [PATCH] /:id
  - [DELETE] /:id
```

### Rewards:

```bash
  - [GET] /
  - [Use protect middleware]
  - [POST] /
  - [GET] /:id
  - [PATCH] /:id
  - [DELETE] /:id
```

- ### Vouchers:

```bash
  - [Use protect middleware]
  - [GET] /
  - [POST] /
  - [GET] /:id
  - [PATCH] /:id
  - [DELETE] /:id
```

- ### Regions:

```bash
  - [GET] /
  - [Use protect middleware]
  - [POST] /
  - [GET] /:id
  - [PATCH] /:id
  - [DELETE] /:id
```
