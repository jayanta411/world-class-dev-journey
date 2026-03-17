# 🗄️ SQL Practice Notes

## Practice Schema

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Week 1 Queries
```sql
-- 1. Total orders per user
-- TODO

-- 2. Top 5 users by total amount
-- TODO

-- 3. Orders in last 30 days
-- TODO
```

## Week 2 Queries (JOINs, CTEs, Window Functions)
```sql
-- TODO
```
