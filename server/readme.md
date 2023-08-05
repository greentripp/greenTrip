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
