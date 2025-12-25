# Logic Understanding - Trading Engine Algorithm

## 📋 Overview

Dokumen ini menjelaskan algoritma lengkap untuk trading engine yang menghasilkan pergerakan harga coin secara real-time dengan sistem volatilitas bertingkat.

---

## 🎯 Core Concepts

### 1. Coin State
- **`coin.is_running = FALSE`**: Coin dalam keadaan idle, tidak ada update harga
- **`coin.is_running = TRUE`**: Trading engine aktif, menghasilkan ticks setiap 500ms

### 2. Volatility Hierarchy
```
Main Volatility (mainVol)
  └─> Hourly Volatility (per jam, bisa diubah admin)
      └─> Sub-Volatility Bucket (per 15 detik)
          └─> Per-Second Sigma (σ_sec)
              └─> Log-Return Generation (r_t)
                  └─> Price Update (p_{t+1})
```

---

## 🔄 Algorithm Flow

### Phase 1: Initialization & Setup

#### Step 1.1: Load Coin Configuration
```javascript
coin = {
  id: 1,
  symbol: 'BTC',
  price: 45230.50,
  volatility: 75,  // Main volatility (1-100)
  is_running: true,
  base_sigma: 0.008,  // Default: 0.008 (0.8% stdev when mainVol=100)
  floor_price: 0.0001,
  subVolatility: {
    low: { rate: 62.31, range: { min: 1, max: 23 } },
    medium: { rate: 34.46, range: { min: 24, max: 56 } },
    high: { rate: 3.32, range: { min: 57, max: 68 } },
    spike: { rate: 0.01, range: { min: 69, max: 75 } }
  }
}
```

#### Step 1.2: Check Running Status
```javascript
if (!coin.is_running) {
  // Coin is idle, no price updates
  return;
}
```

---

### Phase 2: Hourly Volatility Management

#### Step 2.1: Get/Set Main Volatility for Current Hour
```javascript
// Every hour (at :00:00) or when admin triggers update
function getHourlyVolatility(coinId, date, hour) {
  // Check if exists in coin_hourly_volatility
  let hourlyVol = db.query(`
    SELECT main_volatility 
    FROM coin_hourly_volatility 
    WHERE coin_id = ? AND date = ? AND hour = ?
  `, [coinId, date, hour]);
  
  if (!hourlyVol) {
    // Generate random volatility for this hour (1 to coin.volatility)
    const mainVol = randomInt(1, coin.volatility);
    
    // Store in database
    db.insert('coin_hourly_volatility', {
      coin_id: coinId,
      date: date,
      hour: hour,
      main_volatility: mainVol
    });
    
    return mainVol;
  }
  
  return hourlyVol.main_volatility;
}

// Usage
const currentDate = new Date();
const currentHour = currentDate.getHours();
const mainVol = getHourlyVolatility(coin.id, currentDate, currentHour);
```

**Note:**
- Main volatility di-generate random setiap jam (1 sampai `coin.volatility`)
- Admin bisa update main volatility kapan saja (override untuk jam tersebut)
- Main volatility berlaku untuk seluruh jam tersebut

---

### Phase 3: 15-Second Block Processing

#### Step 3.1: Start New 15-Second Block
```javascript
// Every 15 seconds (at :00, :15, :30, :45)
function startNew15sBlock(coin, mainVol) {
  // Step 3.2: Sample Sub-Volatility Bucket
  const subVolBucket = sampleSubVolatilityBucket(coin.subVolatility);
  
  // Step 3.3: Sample Integer k from Bucket Range
  const k = randomInt(subVolBucket.range.min, subVolBucket.range.max);
  
  // Step 3.4: Calculate SubMultiplier
  const subMultiplier = k / mainVol;
  
  // Step 3.5: Calculate Per-Second Sigma
  const sigma_sec = coin.base_sigma * (mainVol / 100) * subMultiplier;
  
  return {
    subVolType: subVolBucket.type,
    subVolRange: k,
    subMultiplier: subMultiplier,
    sigma_sec: sigma_sec,
    mainVol: mainVol
  };
}
```

#### Step 3.2: Sample Sub-Volatility Bucket
```javascript
function sampleSubVolatilityBucket(subVolatility) {
  // Generate random number 0-100
  const rand = Math.random() * 100;
  
  let cumulative = 0;
  
  // Check each bucket based on rate distribution
  if (rand <= (cumulative += subVolatility.low.rate)) {
    return { type: 'low', range: subVolatility.low.range };
  }
  if (rand <= (cumulative += subVolatility.medium.rate)) {
    return { type: 'medium', range: subVolatility.medium.range };
  }
  if (rand <= (cumulative += subVolatility.high.rate)) {
    return { type: 'high', range: subVolatility.high.range };
  }
  // Default to spike
  return { type: 'spike', range: subVolatility.spike.range };
}
```

**Example:**
- Main volatility = 75
- Random sample: 45.2
- Cumulative: Low (0-62.31), Medium (62.31-96.77), High (96.77-100.09), Spike (100.09-100.10)
- Result: Medium bucket selected (45.2 falls in 62.31-96.77 range)
- Range: [24, 56]

#### Step 3.3: Sample Integer k from Bucket Range
```javascript
// From Step 3.2, we have bucket range [24, 56]
const k = randomInt(24, 56);  // Example: k = 40
```

#### Step 3.4: Calculate SubMultiplier
```javascript
const subMultiplier = k / mainVol;
// Example: subMultiplier = 40 / 75 = 0.5333
```

#### Step 3.5: Calculate Per-Second Sigma
```javascript
const sigma_sec = coin.base_sigma * (mainVol / 100) * subMultiplier;
// Example: sigma_sec = 0.008 * (75/100) * 0.5333 = 0.008 * 0.75 * 0.5333 = 0.0032
```

**Formula Breakdown:**
- `base_sigma`: Konstanta default (0.008 = 0.8% stdev per detik ketika mainVol=100 & subMultiplier=1)
- `(mainVol / 100)`: Normalisasi main volatility ke 0-1
- `subMultiplier`: Normalisasi sub-volatility (k/mainVol)
- `sigma_sec`: Standard deviation per detik untuk distribusi normal

---

### Phase 4: Per-Second Price Generation

#### Step 4.1: Generate Log-Return
```javascript
// Every 1 second (within 15s block)
function generateLogReturn(sigma_sec) {
  // Generate random number from Normal distribution: N(0, σ_sec)
  // Using Box-Muller transform or library function
  const r_t = normalRandom(0, sigma_sec);
  return r_t;
}

// Example: r_t = 0.0023 (random from N(0, 0.0032))
```

#### Step 4.2: Calculate New Price (Geometric Progression)
```javascript
function calculateNewPrice(currentPrice, logReturn, floorPrice) {
  // Geometric progression: p_{t+1} = p_t * exp(r_t)
  let newPrice = currentPrice * Math.exp(logReturn);
  
  // Clipping & Safety: Ensure price > floor_price
  newPrice = Math.max(newPrice, floorPrice);
  
  return newPrice;
}

// Example:
// currentPrice = 45230.50
// logReturn = 0.0023
// newPrice = 45230.50 * exp(0.0023) = 45230.50 * 1.0023 = 45334.12
```

**Why Geometric Progression?**
- Log-returns are additive over time
- Prevents negative prices
- More realistic for financial markets
- Maintains price continuity

---

### Phase 5: Tick Generation (500ms Intervals)

#### Step 5.1: Interpolate Between Second Prices
```javascript
// Every 500ms (2 ticks per second)
function generateTick(currentPrice, nextSecondPrice, tickIndex) {
  // tickIndex: 0 (at 0ms) or 1 (at 500ms)
  
  // Linear interpolation
  const alpha = tickIndex * 0.5;  // 0.0 or 0.5
  let interpolatedPrice = currentPrice * (1 - alpha) + nextSecondPrice * alpha;
  
  // Add micro-noise for natural look
  const microNoise = (Math.random() - 0.5) * 0.0001;  // ±0.01% noise
  interpolatedPrice = interpolatedPrice * (1 + microNoise);
  
  // Apply floor price
  interpolatedPrice = Math.max(interpolatedPrice, coin.floor_price);
  
  return interpolatedPrice;
}
```

**Example:**
- `currentPrice` (at second 0) = 45230.50
- `nextSecondPrice` (at second 1) = 45334.12
- At 500ms (tickIndex = 1):
  - `interpolatedPrice` = 45230.50 * 0.5 + 45334.12 * 0.5 = 45282.31
  - Add micro-noise: 45282.31 * (1 + 0.00005) = 45284.57

---

### Phase 6: Aggregation & Storage

#### Step 6.1: Aggregate Ticks to 1-Second Candle
```javascript
// Every 1 second
function aggregateTo1sCandle(ticks, blockConfig) {
  if (ticks.length === 0) return null;
  
  const sortedTicks = ticks.sort((a, b) => a.timestamp - b.timestamp);
  
  const candle = {
    coin_id: coin.id,
    timestamp: roundToSecond(sortedTicks[0].timestamp),
    open: sortedTicks[0].price,
    high: Math.max(...sortedTicks.map(t => t.price)),
    low: Math.min(...sortedTicks.map(t => t.price)),
    close: sortedTicks[sortedTicks.length - 1].price,
    sub_volatility_type: blockConfig.subVolType,
    sub_volatility_range: blockConfig.subVolRange,
    sub_multiplier: blockConfig.subMultiplier,
    sigma_sec: blockConfig.sigma_sec
  };
  
  // Store in coin_1s_candles
  db.insert('coin_1s_candles', candle);
  
  // Send WebSocket update (chart moves in real-time)
  websocket.broadcast('1s_candle_update', candle);
  
  return candle;
}
```

#### Step 6.2: Aggregate 1s Candles to 15s Candle
```javascript
// Every 15 seconds (when block completes)
function aggregateTo15sCandle(oneSecondCandles, blockConfig) {
  if (oneSecondCandles.length === 0) return null;
  
  const sortedCandles = oneSecondCandles.sort((a, b) => a.timestamp - b.timestamp);
  
  const candle15s = {
    coin_id: coin.id,
    timestamp: roundTo15s(sortedCandles[0].timestamp),  // Round to :00, :15, :30, :45
    open: sortedCandles[0].open,
    high: Math.max(...sortedCandles.map(c => c.high)),
    low: Math.min(...sortedCandles.map(c => c.low)),
    close: sortedCandles[sortedCandles.length - 1].close,
    sub_volatility_type: blockConfig.subVolType,
    sub_volatility_range: blockConfig.subVolRange,
    sub_multiplier: blockConfig.subMultiplier,
    sigma_sec: blockConfig.sigma_sec,
    main_volatility: blockConfig.mainVol
  };
  
  // Store permanently in coin_15s_candles
  db.insert('coin_15s_candles', candle15s);
  
  // Send WebSocket update (final 15s candle)
  websocket.broadcast('15s_candle_final', candle15s);
  
  // Clean up old data
  cleanupOldTicks(coin.id);
  cleanupOld1sCandles(coin.id);
  
  return candle15s;
}
```

---

## 📊 Complete Example Flow

### Scenario: BTC with volatility 75, running for 1 minute

```
Time: 14:30:00.000
├─> Check coin.is_running: TRUE ✓
├─> Get hourly volatility: mainVol = 68 (random 1-75)
├─> Start 15s block [14:30:00 - 14:30:15]
│   ├─> Sample bucket: Medium (k=40)
│   ├─> subMultiplier = 40/68 = 0.588
│   ├─> sigma_sec = 0.008 * (68/100) * 0.588 = 0.0032
│   │
│   ├─> Second 0 (14:30:00)
│   │   ├─> Generate log-return: r_0 = 0.0015
│   │   ├─> New price: p_1 = 45230.50 * exp(0.0015) = 45298.35
│   │   ├─> Tick at 0ms: 45230.50 (interpolated)
│   │   ├─> Tick at 500ms: 45264.42 (interpolated + noise)
│   │   └─> Aggregate to 1s candle: OHLC(45230.50, 45298.35, 45230.50, 45298.35)
│   │
│   ├─> Second 1 (14:30:01)
│   │   ├─> Generate log-return: r_1 = -0.0021
│   │   ├─> New price: p_2 = 45298.35 * exp(-0.0021) = 45203.12
│   │   ├─> Tick at 0ms: 45298.35
│   │   ├─> Tick at 500ms: 45250.73
│   │   └─> Aggregate to 1s candle: OHLC(45298.35, 45298.35, 45203.12, 45203.12)
│   │
│   ├─> ... (continue for 13 more seconds)
│   │
│   └─> Second 14 (14:30:14)
│       └─> Final 15s candle: OHLC(45230.50, 45450.20, 45180.30, 45320.15)
│
├─> Time: 14:30:15.000
│   └─> Start new 15s block [14:30:15 - 14:30:30]
│       ├─> Sample bucket: Low (k=15)
│       ├─> subMultiplier = 15/68 = 0.221
│       └─> sigma_sec = 0.008 * (68/100) * 0.221 = 0.0012
│
└─> ... (continue for next blocks)
```

---

## 🔧 Implementation Pseudocode

### Main Trading Engine Loop

```javascript
class TradingEngine {
  constructor(coin) {
    this.coin = coin;
    this.currentBlock = null;
    this.oneSecondCandles = [];
    this.ticks = [];
  }
  
  async start() {
    if (!this.coin.is_running) {
      console.log(`Coin ${this.coin.symbol} is idle`);
      return;
    }
    
    // Main loop
    setInterval(() => {
      this.processTick();
    }, 500);  // Every 500ms
    
    // 1-second aggregation
    setInterval(() => {
      this.aggregateTo1s();
    }, 1000);  // Every 1 second
    
    // 15-second finalization
    setInterval(() => {
      this.aggregateTo15s();
    }, 15000);  // Every 15 seconds
    
    // Hourly volatility check
    setInterval(() => {
      this.updateHourlyVolatility();
    }, 3600000);  // Every 1 hour
  }
  
  processTick() {
    // Check if new 15s block needed
    if (!this.currentBlock || this.isBlockComplete()) {
      this.startNewBlock();
    }
    
    // Generate tick
    const tick = this.generateTick();
    this.ticks.push(tick);
    
    // Update coin price
    this.coin.price = tick.price;
    db.update('coins', { price: tick.price }, { id: this.coin.id });
    
    // Store tick
    db.insert('price_ticks', tick);
    
    // Broadcast via WebSocket
    websocket.broadcast('tick_update', tick);
  }
  
  startNewBlock() {
    const mainVol = this.getHourlyVolatility();
    this.currentBlock = this.calculateBlockConfig(mainVol);
    this.oneSecondCandles = [];
  }
  
  calculateBlockConfig(mainVol) {
    const bucket = this.sampleSubVolatilityBucket();
    const k = randomInt(bucket.range.min, bucket.range.max);
    const subMultiplier = k / mainVol;
    const sigma_sec = this.coin.base_sigma * (mainVol / 100) * subMultiplier;
    
    return {
      subVolType: bucket.type,
      subVolRange: k,
      subMultiplier: subMultiplier,
      sigma_sec: sigma_sec,
      mainVol: mainVol,
      startTime: Date.now()
    };
  }
  
  generateTick() {
    // Generate log-return for current second
    const logReturn = this.generateLogReturn(this.currentBlock.sigma_sec);
    
    // Calculate next second price
    const nextSecondPrice = this.calculateNewPrice(this.coin.price, logReturn);
    
    // Interpolate for 500ms tick
    const tickIndex = (Date.now() % 1000) < 500 ? 0 : 1;
    const tickPrice = this.interpolatePrice(this.coin.price, nextSecondPrice, tickIndex);
    
    return {
      coin_id: this.coin.id,
      timestamp: new Date(),
      price: tickPrice,
      log_return: logReturn,
      sub_volatility_type: this.currentBlock.subVolType,
      sub_volatility_range: this.currentBlock.subVolRange,
      sub_multiplier: this.currentBlock.subMultiplier,
      sigma_sec: this.currentBlock.sigma_sec,
      main_volatility: this.currentBlock.mainVol
    };
  }
  
  aggregateTo1s() {
    if (this.ticks.length === 0) return;
    
    const candle1s = this.aggregateTicks(this.ticks);
    this.oneSecondCandles.push(candle1s);
    
    // Store and broadcast
    db.insert('coin_1s_candles', candle1s);
    websocket.broadcast('1s_candle_update', candle1s);
    
    // Clear ticks buffer
    this.ticks = [];
  }
  
  aggregateTo15s() {
    if (this.oneSecondCandles.length === 0) return;
    
    const candle15s = this.aggregate1sCandles(this.oneSecondCandles, this.currentBlock);
    
    // Store permanently
    db.insert('coin_15s_candles', candle15s);
    websocket.broadcast('15s_candle_final', candle15s);
    
    // Cleanup
    this.cleanupOldData();
    
    // Start new block
    this.startNewBlock();
  }
}
```

---

## 🎯 Key Points

1. **Idle State**: Jika `coin.is_running = FALSE`, engine tidak menghasilkan ticks
2. **Hourly Volatility**: Main volatility di-generate setiap jam (1 sampai max volatility)
3. **15s Block Sampling**: Setiap 15 detik, sample sub-volatility bucket berdasarkan rate distribution
4. **Per-Second Sigma**: `σ_sec = baseSigma * (mainVol/100) * subMultiplier`
5. **Geometric Progression**: `p_{t+1} = p_t * exp(r_t)` dengan `r_t ~ N(0, σ_sec)`
6. **Tick Interpolation**: Interpolate antara second prices + micro-noise untuk natural look
7. **Floor Price**: Clipping untuk mencegah price ≤ 0.0001
8. **Real-time Updates**: 1s candles dikirim setiap detik untuk chart movement
9. **Permanent Storage**: 15s candles disimpan permanent untuk historical viewing

---

## 📝 Notes

- **Latency**: 300-500ms untuk tick generation
- **Precision**: Prices menggunakan DECIMAL(20,8) untuk akurasi tinggi
- **Cleanup**: Ticks dan 1s candles dibersihkan setelah aggregation
- **WebSocket**: Real-time updates untuk connected clients
- **Scalability**: Engine bisa handle multiple coins secara parallel

