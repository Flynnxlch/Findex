# Frontend-Backend Alignment Checklist

## 🔍 Issues Found & Required Changes

### 1. Field Naming Mismatch

**Issue:** Frontend menggunakan `isTrading` sedangkan database menggunakan `is_running`

**Current State:**
- Frontend: `coin.isTrading` (boolean)
- Database: `coins.is_running` (boolean)

**Required Change:**
- Ubah semua referensi `isTrading` menjadi `isRunning` di frontend
- Atau gunakan mapping saat API integration

**Files to Update:**
- `src/components/ManageCoins.jsx`
- `src/components/manageCoins/CoinTable.jsx`
- Semua komponen yang menggunakan `isTrading`

---

### 2. Missing Fields in Create/Edit Coin Forms

**Issue:** Field `base_sigma` dan `floor_price` tidak ada di form create/edit coin

**Required Fields:**
- `base_sigma` (DECIMAL, default: 0.008) - Base sigma constant untuk algoritma
- `floor_price` (DECIMAL, default: 0.0001) - Minimum price floor

**Files to Update:**
- `src/components/manageCoins/CreateCoinModal.jsx`
- `src/components/manageCoins/EditCoinModal.jsx`
- `src/components/ManageCoins.jsx` (formData state)

---

### 3. Data Structure Alignment

**Issue:** Frontend menggunakan camelCase, database menggunakan snake_case

**Current Frontend Structure:**
```javascript
{
  id: 1,
  name: 'Bitcoin',
  symbol: 'BTC',
  price: 45230.50,
  volatility: 75,
  iconColor: 'bg-yellow-400',
  iconLetter: 'B',
  iconImage: null,
  isTrading: false,  // ❌ Should be isRunning
  subVolatility: { ... }
}
```

**Database Structure:**
```sql
{
  id: 1,
  name: 'Bitcoin',
  symbol: 'BTC',
  price: 45230.50,
  volatility: 75,
  icon_color: 'bg-yellow-400',
  icon_letter: 'B',
  icon_image: null,
  is_running: false,  // ✅
  base_sigma: 0.008,  // ❌ Missing in frontend
  floor_price: 0.0001,  // ❌ Missing in frontend
  sub_volatility_low_rate: 62.31,
  sub_volatility_low_min: 1,
  sub_volatility_low_max: 23,
  ...
}
```

**Solution:**
- Buat utility function untuk mapping camelCase ↔ snake_case
- Atau gunakan library seperti `camelcase-keys` / `snakecase-keys`

---

### 4. Sub-Volatility Structure

**Current Frontend:**
```javascript
subVolatility: {
  low: { rate: 62.31, range: { min: 1, max: 23 } },
  medium: { rate: 34.46, range: { min: 24, max: 56 } },
  high: { rate: 3.32, range: { min: 57, max: 68 } },
  spike: { rate: 0.01, range: { min: 69, max: 75 } }
}
```

**Database:**
```sql
sub_volatility_low_rate: 62.31
sub_volatility_low_min: 1
sub_volatility_low_max: 23
sub_volatility_medium_rate: 34.46
sub_volatility_medium_min: 24
sub_volatility_medium_max: 56
...
```

**Solution:**
- Buat helper function untuk convert antara nested object ↔ flat database fields
- Atau simpan sebagai JSON di database (tidak recommended untuk query performance)

---

## ✅ Implementation Checklist

### Priority 1: Critical Changes (Before Backend Integration)

- [ ] **Rename `isTrading` to `isRunning`**
  - [ ] Update `ManageCoins.jsx`
  - [ ] Update `CoinTable.jsx`
  - [ ] Update all references

- [ ] **Add `base_sigma` field**
  - [ ] Add to `CreateCoinModal.jsx`
  - [ ] Add to `EditCoinModal.jsx`
  - [ ] Add to `formData` state in `ManageCoins.jsx`
  - [ ] Default value: 0.008

- [ ] **Add `floor_price` field**
  - [ ] Add to `CreateCoinModal.jsx`
  - [ ] Add to `EditCoinModal.jsx`
  - [ ] Add to `formData` state in `ManageCoins.jsx`
  - [ ] Default value: 0.0001

### Priority 2: Data Mapping Utilities

- [ ] **Create API mapping utilities**
  - [ ] `utils/apiMapper.js` - Convert camelCase ↔ snake_case
  - [ ] `utils/coinMapper.js` - Convert coin data structure
  - [ ] `utils/subVolatilityMapper.js` - Convert sub-volatility structure

### Priority 3: API Integration Preparation

- [ ] **Create API service layer**
  - [ ] `services/coinService.js` - API calls for coins
  - [ ] `services/userService.js` - API calls for users
  - [ ] `services/tradingService.js` - API calls for trading

- [ ] **Create API constants**
  - [ ] `constants/api.js` - API endpoints
  - [ ] `constants/config.js` - API base URL, etc.

### Priority 4: WebSocket Integration

- [ ] **Create WebSocket service**
  - [ ] `services/websocketService.js` - WebSocket connection
  - [ ] Handle real-time price updates
  - [ ] Handle 1s candle updates
  - [ ] Handle 15s candle finalization

---

## 📝 Recommended File Structure

```
src/
├── components/
│   ├── manageCoins/
│   │   ├── CreateCoinModal.jsx (✅ Add base_sigma, floor_price)
│   │   ├── EditCoinModal.jsx (✅ Add base_sigma, floor_price)
│   │   └── CoinTable.jsx (✅ Change isTrading → isRunning)
│   └── ManageCoins.jsx (✅ Change isTrading → isRunning, add fields)
├── utils/
│   ├── apiMapper.js (🆕 Create)
│   ├── coinMapper.js (🆕 Create)
│   └── subVolatilityMapper.js (🆕 Create)
├── services/
│   ├── coinService.js (🆕 Create)
│   ├── userService.js (🆕 Create)
│   ├── tradingService.js (🆕 Create)
│   └── websocketService.js (🆕 Create)
└── constants/
    ├── api.js (🆕 Create)
    └── config.js (🆕 Create)
```

---

## 🔧 Implementation Details

### 1. Rename isTrading to isRunning

**Before:**
```javascript
isTrading: false
```

**After:**
```javascript
isRunning: false
```

### 2. Add base_sigma and floor_price to Forms

**CreateCoinModal.jsx:**
```jsx
<div>
  <label>Base Sigma (Default: 0.008)</label>
  <input
    type="number"
    step="0.000001"
    value={formData.baseSigma || 0.008}
    onChange={(e) => onFormChange({ ...formData, baseSigma: parseFloat(e.target.value) })}
  />
</div>
<div>
  <label>Floor Price (Default: 0.0001)</label>
  <input
    type="number"
    step="0.00000001"
    value={formData.floorPrice || 0.0001}
    onChange={(e) => onFormChange({ ...formData, floorPrice: parseFloat(e.target.value) })}
  />
</div>
```

### 3. Create API Mapper Utility

**utils/apiMapper.js:**
```javascript
// Convert camelCase to snake_case
export const toSnakeCase = (obj) => {
  // Implementation
};

// Convert snake_case to camelCase
export const toCamelCase = (obj) => {
  // Implementation
};
```

---

## ⚠️ Notes

1. **Naming Convention**: Frontend tetap menggunakan camelCase untuk konsistensi React. Mapping dilakukan saat API call.

2. **Default Values**: 
   - `base_sigma`: 0.008 (0.8% stdev when mainVol=100 & subMultiplier=1)
   - `floor_price`: 0.0001 (minimum price to prevent zero)

3. **Backward Compatibility**: Pastikan perubahan tidak breaking untuk data existing (jika ada).

4. **Validation**: 
   - `base_sigma`: > 0, typically 0.001 - 0.01
   - `floor_price`: > 0, typically 0.0001 - 0.01

