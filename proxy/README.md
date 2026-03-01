# Millix Node HTTP Proxy Bridge

A Node.js bridge server that connects to your local Millix node and exposes an HTTP REST API with CORS support for browser-based applications.

## Features

- ✅ Connects to local Millix node on port 5500
- ✅ Exposes HTTP REST API on port 5501
- ✅ Full CORS support for browser access
- ✅ Automatic fallback to synthetic data
- ✅ Debug logging
- ✅ Graceful shutdown handling

## Requirements

- Node.js (v12 or higher)
- Local Millix node running on localhost:5500

## Installation

No dependencies required - uses built-in Node.js modules only!

## Usage

### Start the Proxy

```bash
node millix-proxy.js
```

Or make it executable:
```bash
chmod +x millix-proxy.js
./millix-proxy.js
```

### Test the Proxy

```bash
# Health check
curl http://localhost:5501/health

# Get network stats
curl http://localhost:5501/stats

# Get recent transactions
curl http://localhost:5501/transactions/recent
```

## Configuration

Edit the `CONFIG` object in `millix-proxy.js`:

```javascript
const CONFIG = {
    PROXY_PORT: 5501,              // Port for HTTP proxy
    MILLIX_HOST: 'localhost',      // Millix node host
    MILLIX_PORT: 5500,             // Millix node port
    CORS_ORIGINS: [                // Allowed CORS origins
        'http://localhost:8080',
        'http://localhost:8000'
    ],
    DEBUG: true                     // Enable debug logging
};
```

## How It Works

1. **Browser Request** → Proxy receives HTTP request
2. **TCP Connection** → Proxy connects to Millix node via TCP
3. **Protocol Translation** → Converts HTTP to Millix protocol
4. **Response** → Returns data with CORS headers
5. **Fallback** → If node unavailable, returns synthetic data

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /health` | Proxy health check |
| `GET /stats` | Network statistics |
| `GET /transactions/recent` | Recent transactions |
| `GET /dag` | DAG structure |

## Integration with Explorer

Update your explorer config to use the proxy:

```javascript
// In js/config.js
API_BASE_URL: 'http://localhost:5501',
DEMO_MODE: false,
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 5501
lsof -i :5501
# Kill it or change PROXY_PORT in config
```

### Millix Node Not Responding
- Check if Millix node is running: `lsof -i :5500`
- Verify connection: `telnet localhost 5500`
- Check proxy logs for error messages

### CORS Errors
- Add your origin to `CORS_ORIGINS` in config
- Restart the proxy after config changes

## Stopping the Proxy

Press `Ctrl+C` for graceful shutdown

## Notes

- Proxy automatically falls back to synthetic data if Millix node is unavailable
- All requests are logged when `DEBUG: true`
- Supports both GET and POST methods
- Handles preflight OPTIONS requests

## License

MIT
