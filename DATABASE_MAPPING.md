# Database Mapping - Trading Simulation App (MySQL)

## 📊 Database Structure Overview

### Database: `findex_trading`
**Database Type:** MySQL (XAMPP)

---

## 1. Users Table

**Table:** `users`

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | INT | Primary key, Auto increment | PRIMARY KEY |
| `username` | VARCHAR(50) | Unique username | UNIQUE, NOT NULL |
| `email` | VARCHAR(100) | Unique email | UNIQUE, NOT NULL |
| `password` | VARCHAR(255) | Hashed password | NOT NULL |
| `tokens` | DECIMAL(20,2) | Current token balance | DEFAULT 1000.00 |
| `profile_picture` | TEXT | Base64 image | NULL |
| `bio` | TEXT | User bio | NULL |
| `status` | ENUM('active','inactive') | User status | DEFAULT 'active' |
| `is_admin` | BOOLEAN | Admin flag | DEFAULT FALSE |
| `join_date` | DATETIME | Registration date | DEFAULT CURRENT_TIMESTAMP |
| `last_login` | DATETIME | Last login timestamp | NULL |
| `created_at` | TIMESTAMP | Record creation | DEFAULT CURRENT_TIMESTAMP |
| `updated_at` | TIMESTAMP | Last update | DEFAULT CURRENT_TIMESTAMP ON UPDATE |

**Indexes:**
- PRIMARY KEY (`id`)
- UNIQUE (`username`)
- UNIQUE (`email`)
- INDEX (`status`)

---

## 2. Coins Table

**Table:** `coins`

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | INT | Primary key, Auto increment | PRIMARY KEY |
| `name` | VARCHAR(100) | Coin name | NOT NULL |
| `symbol` | VARCHAR(10) | Coin symbol | UNIQUE, NOT NULL |
| `price` | DECIMAL(20,8) | Current price | NOT NULL |
| `volatility` | INT | Main volatility (1-100) | NOT NULL, CHECK (1-100) |
| `icon_color` | VARCHAR(50) | CSS color class | NULL |
| `icon_letter` | VARCHAR(1) | Single letter for icon | NULL |
| `icon_image` | TEXT | Base64 image | NULL |
| `is_running` | BOOLEAN | Trading engine running status | DEFAULT FALSE |
| `sub_volatility_low_rate` | DECIMAL(5,2) | Low volatility rate % | DEFAULT 62.31 |
| `sub_volatility_low_min` | INT | Low volatility min range | DEFAULT 1 |
| `sub_volatility_low_max` | INT | Low volatility max range | DEFAULT 23 |
| `sub_volatility_medium_rate` | DECIMAL(5,2) | Medium volatility rate % | DEFAULT 34.46 |
| `sub_volatility_medium_min` | INT | Medium volatility min range | DEFAULT 24 |
| `sub_volatility_medium_max` | INT | Medium volatility max range | DEFAULT 56 |
| `sub_volatility_high_rate` | DECIMAL(5,2) | High volatility rate % | DEFAULT 3.32 |
| `sub_volatility_high_min` | INT | High volatility min range | DEFAULT 57 |
| `sub_volatility_high_max` | INT | High volatility max range | DEFAULT 68 |
| `sub_volatility_spike_rate` | DECIMAL(5,2) | Spike volatility rate % | DEFAULT 0.01 |
| `sub_volatility_spike_min` | INT | Spike volatility min range | DEFAULT 69 |
| `sub_volatility_spike_max` | INT | Spike volatility max range | DEFAULT 100 |
| `base_sigma` | DECIMAL(10,6) | Base sigma constant (default 0.008) | DEFAULT 0.008000 |
| `floor_price` | DECIMAL(20,8) | Minimum price floor | DEFAULT 0.00010000 |
| `created_at` | TIMESTAMP | Record creation | DEFAULT CURRENT_TIMESTAMP |
| `updated_at` | TIMESTAMP | Last update | DEFAULT CURRENT_TIMESTAMP ON UPDATE |

**Indexes:**
- PRIMARY KEY (`id`)
- UNIQUE (`symbol`)
- INDEX (`is_running`)

**Note:**
- `is_running = FALSE`: Coin is idle, no price updates
- `is_running = TRUE`: Trading engine generates ticks every 500ms

---

## 3. Coin Hourly Volatility Table

**Table:** `coin_hourly_volatility`

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | BIGINT | Primary key, Auto increment | PRIMARY KEY |
| `coin_id` | INT | Reference to coins | FOREIGN KEY, NOT NULL |
| `date` | DATE | Trading date | NOT NULL |
| `hour` | TINYINT | Hour (0-23) | NOT NULL |
| `main_volatility` | INT | Main volatility for this hour (1 to coin.volatility) | NOT NULL |
| `created_at` | TIMESTAMP | Record creation | DEFAULT CURRENT_TIMESTAMP |

**Indexes:**
- PRIMARY KEY (`id`)
- UNIQUE (`coin_id`, `date`, `hour`)
- INDEX (`coin_id`, `date`)
- FOREIGN KEY (`coin_id`) REFERENCES `coins`(`id`)

**Note:**
- Stores hourly main volatility values
- Generated at the start of each hour
- Can be updated by admin during the hour

---

## 4. Coin 15 Second Candles Table

**Table:** `coin_15s_candles`

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | BIGINT | Primary key, Auto increment | PRIMARY KEY |
| `coin_id` | INT | Reference to coins | FOREIGN KEY, NOT NULL |
| `timestamp` | DATETIME | Exact 15-second interval timestamp | NOT NULL |
| `open` | DECIMAL(20,8) | Opening price (start of 15s block) | NOT NULL |
| `high` | DECIMAL(20,8) | Highest price in 15s period | NOT NULL |
| `low` | DECIMAL(20,8) | Lowest price in 15s period | NOT NULL |
| `close` | DECIMAL(20,8) | Closing price (end of 15s block) | NOT NULL |
| `sub_volatility_type` | ENUM('low','medium','high','spike') | Sub-volatility bucket type | NOT NULL |
| `sub_volatility_range` | INT | Actual sub-volatility value (k) sampled | NOT NULL |
| `sub_multiplier` | DECIMAL(10,6) | Calculated subMultiplier (k/mainVol) | NOT NULL |
| `sigma_sec` | DECIMAL(10,8) | Per-second sigma used | NOT NULL |
| `main_volatility` | INT | Main volatility used for this 15s block | NOT NULL |
| `created_at` | TIMESTAMP | Record creation | DEFAULT CURRENT_TIMESTAMP |

**Indexes:**
- PRIMARY KEY (`id`)
- UNIQUE (`coin_id`, `timestamp`)
- INDEX (`coin_id`, `date(timestamp)`, `timestamp`)
- INDEX (`timestamp`)
- FOREIGN KEY (`coin_id`) REFERENCES `coins`(`id`)

**Note:**
- Timestamp format: `YYYY-MM-DD HH:MM:SS` (rounded to 15-second intervals: :00, :15, :30, :45)
- Example: `2024-01-20 14:30:00`, `2024-01-20 14:30:15`, `2024-01-20 14:30:30`, `2024-01-20 14:30:45`
- This is the **final** 15-second candle stored permanently in database

---

## 5. Coin 1 Second Candles Table (Temporary Buffer)

**Table:** `coin_1s_candles`

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | BIGINT | Primary key, Auto increment | PRIMARY KEY |
| `coin_id` | INT | Reference to coins | FOREIGN KEY, NOT NULL |
| `timestamp` | DATETIME | 1-second interval timestamp | NOT NULL |
| `open` | DECIMAL(20,8) | Opening price | NOT NULL |
| `high` | DECIMAL(20,8) | Highest price | NOT NULL |
| `low` | DECIMAL(20,8) | Lowest price | NOT NULL |
| `close` | DECIMAL(20,8) | Closing price | NOT NULL |
| `sub_volatility_type` | ENUM('low','medium','high','spike') | Sub-volatility type | NOT NULL |
| `sub_volatility_range` | INT | Sub-volatility value (k) | NOT NULL |
| `sub_multiplier` | DECIMAL(10,6) | SubMultiplier used | NOT NULL |
| `sigma_sec` | DECIMAL(10,8) | Per-second sigma used | NOT NULL |
| `created_at` | TIMESTAMP | Record creation | DEFAULT CURRENT_TIMESTAMP |

**Indexes:**
- PRIMARY KEY (`id`)
- UNIQUE (`coin_id`, `timestamp`)
- INDEX (`coin_id`, `timestamp`)
- FOREIGN KEY (`coin_id`) REFERENCES `coins`(`id`)

**Note:**
- Aggregated from ticks every 1 second
- Used to build 15-second candles
- **Temporary**: Can be cleaned up after 15-second aggregation (keep last 1 minute for real-time display)

---

## 6. Price Ticks Table (Real-time Buffer)

**Table:** `price_ticks`

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | BIGINT | Primary key, Auto increment | PRIMARY KEY |
| `coin_id` | INT | Reference to coins | FOREIGN KEY, NOT NULL |
| `timestamp` | DATETIME(3) | Exact tick timestamp (millisecond precision) | NOT NULL |
| `price` | DECIMAL(20,8) | Tick price | NOT NULL |
| `log_return` | DECIMAL(15,10) | Log-return r_t used | NOT NULL |
| `sub_volatility_type` | ENUM('low','medium','high','spike') | Sub-volatility type | NOT NULL |
| `sub_volatility_range` | INT | Sub-volatility value (k) | NOT NULL |
| `sub_multiplier` | DECIMAL(10,6) | SubMultiplier used | NOT NULL |
| `sigma_sec` | DECIMAL(10,8) | Per-second sigma used | NOT NULL |
| `main_volatility` | INT | Main volatility used | NOT NULL |
| `created_at` | TIMESTAMP(3) | Record creation | DEFAULT CURRENT_TIMESTAMP(3) |

**Indexes:**
- PRIMARY KEY (`id`)
- INDEX (`coin_id`, `timestamp`)
- INDEX (`timestamp`)
- FOREIGN KEY (`coin_id`) REFERENCES `coins`(`id`)

**Note:**
- Stores ticks generated every 500ms
- Data is aggregated to 1-second candles
- **Temporary**: Can be cleaned up after 1-second aggregation (keep last 5 seconds for real-time display)

---

## 7. Orders Table

**Table:** `orders`

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | BIGINT | Primary key, Auto increment | PRIMARY KEY |
| `user_id` | INT | Reference to users | FOREIGN KEY, NOT NULL |
| `coin_id` | INT | Reference to coins | FOREIGN KEY, NOT NULL |
| `type` | ENUM('buy','sell') | Order type | NOT NULL |
| `amount` | DECIMAL(20,8) | Coin amount | NOT NULL |
| `price` | DECIMAL(20,8) | Execution price | NOT NULL |
| `total` | DECIMAL(20,2) | Total value (amount * price) | NOT NULL |
| `status` | ENUM('pending','filled','canceled') | Order status | DEFAULT 'pending' |
| `executed_at` | DATETIME | Execution timestamp | NULL |
| `created_at` | TIMESTAMP | Order creation | DEFAULT CURRENT_TIMESTAMP |

**Indexes:**
- PRIMARY KEY (`id`)
- INDEX (`user_id`, `created_at`)
- INDEX (`coin_id`, `created_at`)
- INDEX (`status`)
- FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
- FOREIGN KEY (`coin_id`) REFERENCES `coins`(`id`)

---

## 8. Positions Table

**Table:** `positions`

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | BIGINT | Primary key, Auto increment | PRIMARY KEY |
| `user_id` | INT | Reference to users | FOREIGN KEY, NOT NULL |
| `coin_id` | INT | Reference to coins | FOREIGN KEY, NOT NULL |
| `amount` | DECIMAL(20,8) | Coin amount held | NOT NULL |
| `entry_price` | DECIMAL(20,8) | Average entry price | NOT NULL |
| `current_price` | DECIMAL(20,8) | Current market price | NOT NULL |
| `pnl` | DECIMAL(20,2) | Profit/Loss (calculated) | DEFAULT 0.00 |
| `pnl_percentage` | DECIMAL(10,4) | PnL percentage | DEFAULT 0.0000 |
| `opened_at` | DATETIME | Position open time | DEFAULT CURRENT_TIMESTAMP |
| `updated_at` | TIMESTAMP | Last update | DEFAULT CURRENT_TIMESTAMP ON UPDATE |

**Indexes:**
- PRIMARY KEY (`id`)
- UNIQUE (`user_id`, `coin_id`)
- INDEX (`user_id`)
- FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
- FOREIGN KEY (`coin_id`) REFERENCES `coins`(`id`)

---

## 9. Token Transactions Table

**Table:** `token_transactions`

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | BIGINT | Primary key, Auto increment | PRIMARY KEY |
| `user_id` | INT | Reference to users | FOREIGN KEY, NOT NULL |
| `type` | ENUM('add','remove','buy','sell') | Transaction type | NOT NULL |
| `amount` | DECIMAL(20,2) | Token amount | NOT NULL |
| `balance_before` | DECIMAL(20,2) | Balance before transaction | NOT NULL |
| `balance_after` | DECIMAL(20,2) | Balance after transaction | NOT NULL |
| `reason` | TEXT | Transaction reason/note | NULL |
| `order_id` | BIGINT | Reference to orders (if trade-related) | NULL |
| `admin_id` | INT | Reference to admin (if manual adjustment) | NULL |
| `created_at` | TIMESTAMP | Transaction timestamp | DEFAULT CURRENT_TIMESTAMP |

**Indexes:**
- PRIMARY KEY (`id`)
- INDEX (`user_id`, `created_at`)
- INDEX (`type`)
- INDEX (`order_id`)
- FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
- FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`)
- FOREIGN KEY (`admin_id`) REFERENCES `users`(`id`)

---

## 10. Tickets Table

**Table:** `tickets`

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | INT | Primary key, Auto increment | PRIMARY KEY |
| `user_id` | INT | Reference to users | FOREIGN KEY, NOT NULL |
| `subject` | VARCHAR(200) | Ticket subject | NOT NULL |
| `message` | TEXT | User message | NOT NULL |
| `response` | TEXT | Admin response | NULL |
| `status` | ENUM('open','resolved') | Ticket status | DEFAULT 'open' |
| `priority` | ENUM('low','medium','high') | Priority level | DEFAULT 'medium' |
| `created_at` | TIMESTAMP | Ticket creation | DEFAULT CURRENT_TIMESTAMP |
| `resolved_at` | DATETIME | Resolution timestamp | NULL |
| `resolved_by` | INT | Admin who resolved | NULL |

**Indexes:**
- PRIMARY KEY (`id`)
- INDEX (`user_id`, `created_at`)
- INDEX (`status`)
- FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
- FOREIGN KEY (`resolved_by`) REFERENCES `users`(`id`)

---

## 11. Portfolio Holdings Table

**Table:** `portfolio_holdings`

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | BIGINT | Primary key, Auto increment | PRIMARY KEY |
| `user_id` | INT | Reference to users | FOREIGN KEY, NOT NULL |
| `coin_id` | INT | Reference to coins | FOREIGN KEY, NOT NULL |
| `amount` | DECIMAL(20,8) | Coin amount held | NOT NULL |
| `average_price` | DECIMAL(20,8) | Average purchase price | NOT NULL |
| `last_updated` | TIMESTAMP | Last update timestamp | DEFAULT CURRENT_TIMESTAMP ON UPDATE |

**Indexes:**
- PRIMARY KEY (`id`)
- UNIQUE (`user_id`, `coin_id`)
- INDEX (`user_id`)
- FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
- FOREIGN KEY (`coin_id`) REFERENCES `coins`(`id`)

---

## 12. System Statistics Table

**Table:** `system_stats`

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | INT | Primary key, Auto increment | PRIMARY KEY |
| `date` | DATE | Stat date | UNIQUE, NOT NULL |
| `total_users` | INT | Total registered users | DEFAULT 0 |
| `total_coins` | INT | Total active coins | DEFAULT 0 |
| `total_tokens` | DECIMAL(20,2) | Total tokens in system | DEFAULT 0.00 |
| `total_trades` | BIGINT | Total trades executed | DEFAULT 0 |
| `trading_volume_24h` | DECIMAL(20,2) | 24h trading volume | DEFAULT 0.00 |
| `trading_volume_7d` | DECIMAL(20,2) | 7-day trading volume | DEFAULT 0.00 |
| `trading_volume_30d` | DECIMAL(20,2) | 30-day trading volume | DEFAULT 0.00 |
| `created_at` | TIMESTAMP | Record creation | DEFAULT CURRENT_TIMESTAMP |
| `updated_at` | TIMESTAMP | Last update | DEFAULT CURRENT_TIMESTAMP ON UPDATE |

**Indexes:**
- PRIMARY KEY (`id`)
- UNIQUE (`date`)

---

## 🔄 Data Flow Summary

### Real-time Price Update Flow:

```
1. Check coin.is_running
   └─> FALSE: Idle, no updates
   └─> TRUE: Continue to step 2

2. Every Hour (or admin trigger):
   └─> Get/Set mainVol for current hour
   └─> Store in coin_hourly_volatility

3. Every 15-Second Block:
   └─> Sample sub-volatility bucket (low/medium/high/spike)
   └─> Sample integer k from bucket range
   └─> Calculate subMultiplier = k / mainVol
   └─> Calculate σ_sec = baseSigma * (mainVol/100) * subMultiplier

4. Every 1 Second (within 15s block):
   └─> Generate log-return r_t ~ Normal(0, σ_sec)
   └─> Calculate price: p_{t+1} = p_t * exp(r_t)
   └─> Apply floor price clipping

5. Every 500ms (within 1 second):
   └─> Interpolate between p_t and p_{t+1}
   └─> Add micro-noise for natural look
   └─> Store tick in price_ticks
   └─> Update coins.price (real-time)

6. Every 1 Second:
   └─> Aggregate ticks → 1s OHLC candle
   └─> Store in coin_1s_candles
   └─> Send update to WebSocket clients (chart moves)

7. Every 15 Seconds (block complete):
   └─> Aggregate 15 × 1s candles → final 15s OHLC
   └─> Store in coin_15s_candles (permanent)
   └─> Clean up old ticks and 1s candles
   └─> Move to next 15s block
```

---

## 🔍 Query Patterns

### Get Real-time Price
```sql
SELECT price FROM coins WHERE id = ? AND is_running = TRUE;
```

### Get Current Hour Volatility
```sql
SELECT main_volatility 
FROM coin_hourly_volatility 
WHERE coin_id = ? 
  AND date = CURDATE() 
  AND hour = HOUR(NOW());
```

### Get 15-Second Candles for Chart (Today)
```sql
SELECT timestamp, open, high, low, close 
FROM coin_15s_candles 
WHERE coin_id = ? 
  AND DATE(timestamp) = CURDATE()
ORDER BY timestamp ASC;
```

### Get 15-Second Candles for Chart (Historical Date)
```sql
SELECT timestamp, open, high, low, close 
FROM coin_15s_candles 
WHERE coin_id = ? 
  AND DATE(timestamp) = ?
ORDER BY timestamp ASC;
```

### Get 1-Second Candles (Real-time, Last 15 seconds)
```sql
SELECT timestamp, open, high, low, close 
FROM coin_1s_candles 
WHERE coin_id = ? 
  AND timestamp >= DATE_SUB(NOW(), INTERVAL 15 SECOND)
ORDER BY timestamp ASC;
```

### Get Latest Ticks (Real-time, Last 5 seconds)
```sql
SELECT timestamp, price 
FROM price_ticks 
WHERE coin_id = ? 
  AND timestamp >= DATE_SUB(NOW(), INTERVAL 5 SECOND)
ORDER BY timestamp ASC;
```

---

## 📦 Data Storage Strategy

### Real-time Data (In-Memory + Temporary DB):
- **Current Prices**: `coins.price` (updated every 500ms)
- **Active Ticks**: `price_ticks` (last 5 seconds, then cleaned)
- **1-Second Candles**: `coin_1s_candles` (last 1 minute, then cleaned)
- **15-Second Candles**: `coin_15s_candles` (permanent, for chart viewing)

### Historical Data:
- **Hourly Volatility**: `coin_hourly_volatility` (one record per coin per hour)
- **15-Second Candles**: `coin_15s_candles` (all historical data)
- **Orders**: `orders` (all orders, permanent)
- **Positions**: `positions` (current open positions)

### Data Cleanup:
- **price_ticks**: Delete records older than 5 seconds
- **coin_1s_candles**: Delete records older than 1 minute
- **coin_15s_candles**: Keep all (for historical chart viewing)
- **coin_hourly_volatility**: Keep all (for volatility history)

---

## 🎯 Key Implementation Notes

### Timeframe Aggregation:
- **15s**: Direct from `coin_15s_candles`
- **30s**: Aggregate 2 consecutive 15s candles
- **1m**: Aggregate 4 consecutive 15s candles
- **5m**: Aggregate 20 consecutive 15s candles

### WebSocket Updates:
- Send tick updates every 500ms to connected clients (if coin.is_running = TRUE)
- Send 1-second candle updates every second (for real-time chart movement)
- Send 15-second candle finalization when block completes
- Update `coins.price` in real-time for all clients

### MySQL Specific Notes:
- Use `DECIMAL(20,8)` for prices (high precision)
- Use `DECIMAL(20,2)` for token amounts
- Use `DATETIME(3)` for millisecond precision timestamps
- Use `ENUM` for fixed value sets
- Use `TIMESTAMP` with `ON UPDATE CURRENT_TIMESTAMP` for auto-update
- Consider partitioning `coin_15s_candles` by date for better performance
- Use connection pooling for high-frequency writes
