## Schema

**Reward**:

| Attribute   | Type   |
| ----------- | ------ |
| Name        | STRING |
| CostPoints  | NUMBER |
| ExpireDate  | DATE   |
| Description | STRING |
| Region      | STRING |
| Address     | STRING |
| CreatedAt   | DATE   |

**Voucher**

| Attribute | Type     |
| --------- | -------- |
| UserID    | MONGOGID |
| RewardID  | MONGOGID |
| Paid      | BOOLEAN  |
| CreatedAt | DATE     |

**Points of Interest**:

| Attribute         | Type   |
| ----------------- | ------ |
| Name              | STRING |
| Address           | STRING |
| Region            | STRING |
| Photo             | STRING |
| Available Tickets | NUMBER |
| Category          | STRING |
| Agent             | USERID |
| Slug              | STRING |
| CreatedAt         | DATE   |

**Activity**:

| Attribute         | Type     |
| ----------------- | -------- |
| Name              | STRING   |
| Point Of Interest | MONGOGID |
| Reservation Limit | NUMBER   |
| Description       | STRING   |
| StartAt           | DATE     |
| CreatedAt         | DATE     |

**Booking**:

| Attribute | Type     |
| --------- | -------- |
| PointID   | MONGOGID |
| UserID    | MONGOGID |
| Status    | STRING   |
| Paid      | BOOLEAN  |
| CreatedAt | DATE     |

**User**:

| Attribute            | Type    |
| -------------------- | ------- |
| Name                 | STRING  |
| Email                | STRING  |
| Photo                | STRING  |
| Role                 | STRING  |
| Password             | STRING  |
| PasswordConfirm      | STRING  |
| PasswordChangedAt    | DATE    |
| PasswordResetToken   | STRING  |
| PasswordResetExpires | DATE    |
| Active               | BOOLEAN |
| Verified             | BOOLEAN |
| Phone                | STRING  |
| Region               | STRING  |
| CreatedAt            | DATE    |

## API

**Auth**

```js

- [DELETE] /all
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

**Users** :

```js
- [DELETE] /all
- [GET] /

- [Use protect middleware]
- [PATCH] /updateUserData
- [PATCH] /points/add
- [PATCH] /points/remove
- [GET] /:id
```

**Points:**

```js
- [DELETE] /all
  Delete all points.

- [GET] /
  Get all points.

- [POST] /
  Create a new point.
  - Protected route.
  - Restricted to 'admin' role.
  - Upload point files.
  - Set images in the database.
  - Requires 'isAgent' middleware.

- [Use protect middleware]
  Middleware to protect routes below.

- [GET] /:id
  Get a specific point.

- [PATCH] /:id
  Update a specific point.
  - Upload point files.
  - Set images in the database.

- [DELETE] /:id
  Delete a specific point.

```

**Activities:**

```ts
- [DELETE] /all
  Delete all activities.

- [GET] /
  Get all activities.

- [POST] /
  Create a new activity.

- [Use protect middleware]
  Middleware to protect routes below.

- [GET] /points/:pointId
  Get activities by point.

- [GET] /:id
  Get a specific activity.

- [PATCH] /:id
  Update a specific activity.

- [DELETE] /:id
  Delete a specific activity.

```

**Rewards:**

```js
- [DELETE] /all
  Delete all rewards.
  - TODO: Delete this route.

- [Use protect middleware]
  Middleware to protect routes below.

- [GET] /
  Get all rewards.

- [POST] /
  Create a new reward.
  - Restricted to 'admin' role.
  - Upload a single 'qrcode' image.
  - Set QR code image in the database.

- [GET] /:id
  Get a specific reward.

- [PATCH] /:id
  Update a specific reward.
  - Restricted to 'admin' role.

- [DELETE] /:id
  Delete a specific reward.
  - Restricted to 'admin' role.
```

**Vouchers**

```js
- [DELETE] /all

- [Use protect middleware]
- [GET] /
- [POST] /

- [Use protect middleware]
- [GET] /:id
- [PATCH] /:id
- [DELETE] /:id
```

## Regions:

```js
- [DELETE] /all
  Delete all regions.

- Use protect middleware
  Middleware to protect routes below.

- [GET] /
  Get all regions.
- [POST] /
  Create a new region.

  - Restricted to 'admin' role.

- [GET] /:id
  Get a specific region.

- [PATCH] /:id
  Update a specific region.

  - Restricted to 'admin' role.

- [DELETE] /:id
  Delete a specific region.
  - Restricted to 'admin' role.

```
