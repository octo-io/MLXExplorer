# Unified Millix Explorer Server

A Node.js server that serves the Millix Explorer application and provides a unified API for accessing Millix node data, live price information, and peer geolocation.

## Features

✅ **Static File Serving**: Serves HTML, CSS, JS, and assets  
✅ **API Proxy**: Proxies requests to local Millix node (port 5500)  
✅ **Live Price Data**: Scrapes MLX/USD price from fiatleak.com  
✅ **IP Geolocation**: Automatic peer location detection  
✅ **CORS Support**: Enables browser access  
✅ **Auto-fallback**: Handles missing transaction data gracefully  
✅ **No Dependencies**: Uses built-in Node.js modules only

## Quick Start

### Installation

```bash
cd /home/zen/Documents/Octo-PROg/MLXExplorer/MLXExplorer-v1.3/proxy
npm install  # No external deps, but sets up package.json
```

### Run the Server

**Foreground (with logs)**:
```bash
node unified-server.js
```

**Background (production)**:
```bash
nohup node unified-server.js > server.log 2>&1 &
```

**Stop the server**:
```bash
pkill -f unified-server.js
```

### Access the Explorer

Open your browser to: **http://localhost:8080**

## Configuration

Edit the `CONFIG` object in `unified-server.js`:

```javascript
const CONFIG = {
    SERVER_PORT: 8080,         // HTTP server port
    MILLIX_HOST: 'localhost',  // Millix node host
    MILLIX_PORT: 5500,         // Millix node API port
    STATIC_DIR: path.join(__dirname, '..'), // Static files directory
    DEBUG: true                // Enable debug logging
};
```

## Architecture

```
┌─────────────────────────────────────────┐
│          Browser (localhost:8080)       │
└─────────┬───────────────────────────────┘
          │
          │ HTTP Requests
          ▼
┌─────────────────────────────────────────┐
│        Unified Server (Node.js)         │
│                                         │
│  ┌────────────────────────────────┐   │
│  │  Static File Server            │   │
│  │  (HTML, CSS, JS, images)       │   │
│  └────────────────────────────────┘   │
│                                         │
│  ┌────────────────────────────────┐   │
│  │  API Proxy (/api/*)            │   │
│  │  - Transactions                 │   │
│  │  - Network stats                │   │
│  │  - Peer list + geolocation      │   │
│  │  - DAG structure                │   │
│  └────────┬──────────────────┬─────┘   │
└───────────┼──────────────────┼─────────┘
            │                  │
            ▼                  ▼
    ┌──────────────┐   ┌──────────────┐
    │ Millix Node  │   │  IP-API.com  │
    │ (port 5500)  │   │ (geolocation)│
    └──────────────┘   └──────────────┘
            │
            └─── Credentials from:
                 ~/millix-tangled/node.json
```

## API Endpoints

### Static Files

| Endpoint | Description |
|----------|-------------|
| `/` | Serves index.html |
| `/styles.css` | Application styles |
| `/js/*.js` | JavaScript modules |
| `/millix-icon.png` | Millix logo |

### API Routes

| Endpoint | Description | Source |
|----------|-------------|--------|
| `/api/stats` | Network statistics | Millix node |
| `/api/transactions/recent` | Recent transactions (20) | Millix node |
| `/api/transaction/:id` | Transaction details | Millix node |
| `/api/dag` | DAG structure (100 nodes) | Millix node |
| `/api/peers` | Peer list with geolocation | Millix node + IP-API |
| `/api/price` | MLX/USD price + history | Fiatleak.com |
| `/health` | Server health check | Server |

## Components

### 1. Static File Server

Serves all application files with proper MIME types:
- HTML: `text/html`
- CSS: `text/css`
- JavaScript: `application/javascript`
- Images: `image/*`
- JSON: `application/json`

Security: Prevents directory traversal attacks

### 2. API Proxy (millix-node-api.js)

**Connects to Millix Node:**
- Loads credentials from `~/millix-tangled/node.json`
- Uses authenticated HTTPS API
- Supports all node endpoints

**Key Methods:**
```javascript
getRecentTransactions(limit)  // Get recent transactions with amounts
getDAG(limit)                 // Get DAG structure
getStatSummary()              // Get network statistics
getPeers()                    // Get peer list (with geolocation)
getTransactionDetails(id, shard) // Get full transaction details
```

### 3. IP Geolocation

**Features:**
- Automatic geolocation for all peer IPs
- Uses free IP-API.com service (45 requests/min)
- In-memory caching to minimize API calls
- Rate limiting: 15ms delay between requests
- Returns: latitude, longitude, country, city

**Caching:**
```javascript
_geoCache = {
  '1.2.3.4': {
    lat: 40.7128,
    lon: -74.0060,
    country: 'United States',
    city: 'New York'
  },
  // ...
}
```

### 4. Price Scraper

**Source:** fiatleak.com/mlx

**Data Collected:**
- Current MLX/USD price
- 24-hour change percentage
- Price history (1440 points max)

**Update Interval:** Every 60 seconds

**Storage:**
```javascript
priceHistory = [
  { t: timestamp, p: price },
  // ... up to 1440 points (24 hours at 60s intervals)
]
```

## Transaction Data Handling

### Smart Fallback System

When extended transaction data is unavailable:

1. **Try Extended API**: `get_transaction_extended`
2. **Check for Error**: Detect `api_status: 'fail'`
3. **Fallback**: Use basic transaction + output data
4. **Result**: Always returns amount, even without full details

**Example:**
```javascript
// Full data available
{
  id: 'abc123...',
  amount: 1000000,
  from: '1Address...',
  to: '2Address...',
  // ... full details
}

// Fallback mode
{
  id: 'abc123...',
  amount: 1000000,  // From outputs
  from: 'N/A',      // Not available
  to: 'N/A',        // Not available
  // ... basic info only
}
```

## Development

### Debug Mode

Enable detailed logging:
```javascript
CONFIG.DEBUG = true
```

Logs include:
- HTTP requests (method, path)
- Millix API calls
- Price updates
- Errors and warnings

### Testing

**Test server:**
```bash
curl http://localhost:8080/health
```

**Test API:**
```bash
# Stats
curl http://localhost:8080/api/stats | jq

# Peers with geolocation
curl http://localhost:8080/api/peers | jq '.[0:3] | .[] | {id, country, lat, lon}'

# Transactions
curl http://localhost:8080/api/transactions/recent | jq '.[0:3]'

# Price
curl http://localhost:8080/api/price | jq '{price, change, history: .history | length}'
```

**Monitor logs:**
```bash
tail -f server.log
```

## Troubleshooting

### Port 8080 Already in Use

```bash
# Find process
lsof -i :8080

# Kill it
kill -9 <PID>

# Or change port in CONFIG
```

### Millix Node Not Found

```bash
# Check if node is running
ps aux | grep millix-node

# Check credentials file exists
ls -la ~/millix-tangled/node.json

# Test node API manually
curl -k https://localhost:5500/api/.../...
```

### No Transactions Showing

1. Verify node has transactions:
   ```bash
   curl -k "https://localhost:5500/api/NODE_ID/SIGNATURE/l4kaEhMnhjB5yseq?p0=10"
   ```

2. Check server logs for errors:
   ```bash
   tail -50 server.log
   ```

3. Try demo mode in browser (click LIVE → DEMO)

### Geolocation Not Working

**Symptom:** Peers show `lat: null, lon: null`

**Causes:**
- Private/local IP addresses (127.0.0.1, 192.168.*, etc.)
- IP-API.com rate limit exceeded
- No internet connection

**Solutions:**
- Use demo mode for synthetic geolocation
- Wait 1 minute if rate limited
- Check internet connectivity

### Price Chart Empty

**Wait time:** 30-60 seconds for initial data

**Check:**
```bash
curl http://localhost:8080/api/price | jq '.history | length'
```

Should show increasing count over time.

## Performance

### Optimizations

- **Geolocation caching**: Reduces API calls by 99%
- **Rate limiting**: Prevents API bans
- **In-memory storage**: Fast price history access
- **Async operations**: Non-blocking I/O
- **Efficient routing**: Simple regex-based routing

### Resource Usage

- **CPU**: ~1-2% idle, 5-10% during updates
- **Memory**: ~50-80 MB
- **Bandwidth**: 
  - Outgoing: ~100 KB/min (API calls)
  - Incoming: ~50 KB/min (price scraping)

## Security

### Current Implementation

✅ **Directory Traversal Protection**: Path normalization  
✅ **HTTPS to Millix Node**: Secure connection  
✅ **Error Handling**: No stack traces exposed  
⚠️ **Self-signed Certs**: Node API uses `rejectUnauthorized: false`

### Recommendations for Production

1. Use proper SSL certificates
2. Add authentication for external access
3. Rate limit API endpoints
4. Implement request validation
5. Add request logging
6. Use environment variables for secrets

## License

MIT License - See LICENSE file in root directory

## Related Documentation

- **../README.md**: Main project documentation
- **../QUICKSTART.md**: User quick start guide
- **../STATUS.md**: Current system status
- **../LIVE_DATA_STATUS.md**: Data source details

---

**Version**: 1.3  
**Node.js**: 14+ required  
**Dependencies**: None (built-in modules only)
