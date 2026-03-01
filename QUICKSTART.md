# Quick Start Guide - Millix Explorer v1.3

Get up and running with the Millix DAG Explorer in under 2 minutes!

## 🚀 Launch the Application

### Method 1: Unified Server (Recommended)

```bash
cd /home/zen/Documents/Octo-PROg/MLXExplorer/MLXExplorer-v1.3/proxy
node unified-server.js
```

Then open: **http://localhost:8080**

### Method 2: Background Mode

```bash
cd /home/zen/Documents/Octo-PROg/MLXExplorer/MLXExplorer-v1.3/proxy
nohup node unified-server.js > server.log 2>&1 &
```

### Stop the Server

```bash
pkill -f unified-server.js
```

## 🎯 Using the Explorer

### 1. Choose Your View Mode

Click the stat cards at the top to switch between modes:

- **Peers** 🌐: View your network peer connections
- **Node Txns** 📊: Your wallet's transaction DAG
- **Network Txns** 🌍: Full network transaction visualization
- **MLX Price** 💰: Live price chart with history

### 2. Peer Network (Default View)

**Toggle Between Views:**
- Click **2D/MAP** button to switch between:
  - **Hub View**: Your node at center with radial connections
  - **World Map**: Geographic peer locations on a world map

**Interact:**
- **Click** any peer to view details (IP, port, location, status)
- **Hover** over peers on map to see country/city
- **Zoom/Pan** to explore the map

### 3. Transaction DAG Views

**Visual Elements:**
- 🟢 **Green nodes** = Confirmed transactions
- 🟣 **Purple nodes** = Pending transactions  
- 🔵 **Blue nodes** = Hibernating transactions

**Controls:**
- **Click** nodes to view transaction details
- **Drag** nodes to reposition
- **Scroll** to zoom in/out
- **Drag background** to pan

### 4. Price Chart

- Live MLX/USD price from fiatleak.com
- Historical data with interactive graph
- 24-hour change percentage
- Updates every 30 seconds

### 5. Interactive Controls

Top-right buttons:
- **+ / -**: Zoom in/out
- **Reset**: Return to default view
- **Labels**: Toggle node ID labels
- **2D/MAP**: Switch peer visualization modes
- **LIVE/DEMO**: Toggle between real and demo data

### 6. Search & Explore

**Left Sidebar:**
1. **Search Box**: Enter transaction ID or address
2. **Filters**: 
   - Show Recent (10 min) - enabled by default
   - Show Hibernating - enabled by default
   - Time Range selector
3. **Live Feed**: Real-time transaction updates

**Right Panel:**
- Click any transaction/peer to see detailed information
- Shows: ID, amount, addresses, timestamps, state, location

## 🎭 Demo Mode

**Switch to Demo Mode** (no Millix node required):

1. Click the **LIVE** button (top right)
2. It switches to **DEMO** mode
3. Demo features:
   - 60 synthetic peers from major cities worldwide
   - Real geolocation data
   - Simulated transactions
   - Mock network statistics

**Switch back to LIVE** mode:
- Click the **DEMO** button
- Requires local Millix node running

## 💡 Tips & Tricks

### Performance
- **Best Browsers**: Chrome 90+, Firefox 88+ for optimal D3.js rendering
- **Mobile**: Fully responsive on tablets and phones
- **Multiple Views**: Open multiple tabs to monitor different aspects

### Keyboard Shortcuts
- **F12**: Open developer console for detailed logs
- **Ctrl +/-**: Browser zoom (separate from graph zoom)
- **Ctrl+Shift+R**: Hard refresh to clear cache

### Advanced Features
- **Geolocation**: Peers automatically geolocated via IP address
- **Auto-updates**: All data refreshes every 20 seconds
- **Smart Fallback**: Missing transaction data handled gracefully
- **Caching**: Geolocation results cached for performance

## 🐛 Troubleshooting

### Server Won't Start

**Problem**: Port 8080 already in use
```bash
# Find what's using the port
lsof -i :8080
# Kill it or use a different port
```

**Problem**: Millix node not found
```bash
# Check if node is running
ps aux | grep millix-node
# Check credentials exist
ls -la ~/millix-tangled/node.json
```

### No Data Showing

**Solution 1**: Switch to demo mode (click LIVE → DEMO)

**Solution 2**: Check server logs
```bash
tail -f /home/zen/Documents/Octo-PROg/MLXExplorer/MLXExplorer-v1.3/proxy/server.log
```

### World Map Not Loading

**Problem**: TopoJSON/D3.js not loading
- Check internet connection (loads from CDN)
- Check browser console (F12) for errors
- Try hard refresh (Ctrl+Shift+R)

**Problem**: Peers not showing on map
- Geolocation requires internet access
- Some IPs may be private/local (can't geolocate)
- Check rate limits (45 requests/min for IP-API)

### Price Chart Empty

**Solution**: Wait 30-60 seconds for initial data collection
- Price updates every 30 seconds
- Requires internet access to fiatleak.com
- Check browser console for fetch errors

### Visualization is Slow

**Solutions**:
- Reduce MAX_NODES in `js/config.js`
- Close other browser tabs
- Use Chrome/Firefox for better performance
- Disable browser extensions temporarily

## 📚 What's Next?

Explore the complete documentation:

- **README.md**: Full feature list and technical details
- **LIVE_DATA_STATUS.md**: Current data sources and status
- **proxy/README.md**: Server configuration and API

## 🎨 Customization

### Change Colors

Edit `js/config.js`:
```javascript
COLORS: {
    CONFIRMED: '#10b981',    // Green
    PENDING: '#c084fc',      // Purple
    HIBERNATING: '#60a5fa',  // Blue
    LINK: '#8b5cf6'         // Purple links
}
```

### Adjust Update Intervals

Edit `js/config.js`:
```javascript
STATS_UPDATE_INTERVAL: 20000,        // 20 seconds
TRANSACTION_UPDATE_INTERVAL: 20000,  // 20 seconds
VISUALIZATION_UPDATE_INTERVAL: 20000 // 20 seconds
```

### Configure Node Connection

Edit `proxy/unified-server.js`:
```javascript
const CONFIG = {
    SERVER_PORT: 8080,
    MILLIX_HOST: 'localhost',
    MILLIX_PORT: 5500
};
```

---

**Enjoy exploring the Millix network! 🚀💜**

For issues or questions, check the full README.md or open an issue on GitHub.
