# Millix DAG Explorer v1.3

A comprehensive, browser-based visualization tool for exploring the Millix cryptocurrency network. Features real-time transaction monitoring, interactive DAG visualization, global peer network mapping, and live price tracking.

![Version](https://img.shields.io/badge/version-1.3-purple)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🌟 Key Features

### 📡 Multi-Mode Visualization
Switch seamlessly between four powerful visualization modes:

1. **Peer Network Views**
   - **Hub-and-Spoke (2D)**: Radial layout showing your node at the center with all peer connections
   - **World Map**: Geographic visualization showing peer locations on an interactive world map
   - Real-time geolocation of peer nodes using IP addresses
   - 60 global peers in demo mode spanning all continents

2. **Transaction DAG Views**
   - **Node Transactions**: Your wallet's transaction DAG
   - **Network Transactions**: Full network transaction visualization
   - Real-time updates every 20 seconds
   - Force-directed graph layout

3. **Price Chart**
   - Live MLX/USD price tracking from fiatleak.com
   - Historical price data with interactive line chart
   - 24-hour price change indicators
   - Updates every 30 seconds

### 🔍 Transaction Explorer
- **Real-time Transaction Feed**: Live updates showing the latest 20 transactions
- **Detailed Transaction View**: Click any transaction to see:
  - Transaction ID, amount, and state
  - From/To addresses with full details
  - Shard information and parent relationships
  - Timestamp and confirmation status
- **Smart Fallback**: Automatically handles transactions without extended data
- **Search**: Find transactions by ID or address

### 🌐 Global Peer Network
- **IP Geolocation**: Automatic geolocation of all peer nodes
- **Interactive World Map**:
  - Dark-themed map with Millix purple styling
  - Hover to see peer details (country, city, status)
  - Visual connection lines from your node to peers
  - Zoom and pan controls
- **Peer Details**: Click any peer to view:
  - Node ID and connection status
  - IP address, ports (node + API)
  - Connection timestamps
  - Geographic location

### 📊 Network Statistics
Real-time dashboard showing:
- **Peers**: Connected network nodes
- **Node Txns**: Your wallet transactions
- **Network Txns**: Total network transactions  
- **MLX Price**: Current USD price with 24h change

### 🎨 Interactive Controls
- **Zoom In/Out**: Magnify or reduce view scale
- **Reset View**: Return to default viewport
- **Toggle Labels**: Show/hide transaction IDs
- **2D/MAP Toggle**: Switch between peer visualization modes (hub or world map)
- **LIVE/DEMO Toggle**: Switch between real network data and demo mode

### 🎯 Millix-Specific Features
- **Hibernation Tracking**: Visualizes Millix's unique 10-minute hibernation mechanism
- **Shard Awareness**: Displays transaction shard assignments
- **Parent Transaction Links**: Shows DAG relationships
- **State Color Coding**:
  - 🟢 **Green**: Confirmed transactions
  - 🟣 **Purple**: Pending transactions
  - 🔵 **Blue**: Hibernating transactions

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ (for the proxy server)
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Millix node running locally (optional, can use demo mode)

### Installation

1. **Clone the repository**:
```bash
cd /home/zen/Documents/Octo-PROg/MLXExplorer
cd MLXExplorer-v1.3
```

2. **Install dependencies** (proxy server):
```bash
cd proxy
npm install
cd ..
```

3. **Start the server**:
```bash
cd proxy
node unified-server.js
```

4. **Open in browser**:
```
http://localhost:8080
```

The server will:
- Serve all static files (HTML, CSS, JS)
- Proxy API requests to your local Millix node (localhost:5500)
- Fetch live MLX price data
- Provide geolocation for peer nodes

## 📁 Project Structure

```
MLXExplorer-v1.3/
├── index.html              # Main application page
├── styles.css              # Millix purple theme styles
├── js/
│   ├── config.js          # Configuration (API endpoints, intervals, colors)
│   ├── app.js             # Main application logic & event handlers
│   ├── api.js             # Millix API client + demo data generation
│   ├── visualization.js   # D3.js visualizations (DAG, peers, map, chart)
│   ├── transactions.js    # Transaction management & display
│   ├── network-stats.js   # Network statistics updates
│   └── live-data.js       # Real-time data coordination
├── proxy/
│   ├── unified-server.js  # Node.js server (static files + API proxy)
│   ├── millix-node-api.js # Millix node API client with geolocation
│   └── package.json       # Server dependencies
├── millix-icon.png        # Millix logo
└── README.md              # This file
```

## ⚙️ Configuration

Edit `js/config.js` to customize:

```javascript
const CONFIG = {
    API_BASE_URL: '/api',              // API endpoint (proxied)
    DEMO_MODE: false,                  // true = synthetic data, false = live node
    
    // Update intervals (milliseconds)
    STATS_UPDATE_INTERVAL: 20000,      // Network stats
    TRANSACTION_UPDATE_INTERVAL: 20000, // Transaction feed
    VISUALIZATION_UPDATE_INTERVAL: 20000, // DAG updates
    
    // Visualization settings
    MAX_NODES: 404,                    // Max nodes in DAG
    NODE_RADIUS: 8,                    // Node circle size
    
    // Millix theme colors
    COLORS: {
        CONFIRMED: '#10b981',          // Green
        PENDING: '#c084fc',            // Purple
        HIBERNATING: '#60a5fa',        // Blue
        LINK: '#8b5cf6'                // Purple links
    }
};
```

### Demo Mode

**Enable Demo Mode** to run without a Millix node:

1. Click the **LIVE** button (top right) → switches to **DEMO**
2. Demo mode features:
   - 60 synthetic peers from major cities worldwide
   - Realistic geolocation data (USA, Europe, Asia, Africa, etc.)
   - Synthetic transaction generation
   - Simulated network statistics

## 🌍 World Map Feature

The world map visualization uses:
- **TopoJSON** for world geography data
- **D3.js** Mercator projection
- **IP-API.com** for free IP geolocation (45 requests/min)
- **Caching** to minimize API calls

### Supported Locations (Demo Mode)
60 peers distributed across:
- 🌎 **Americas**: New York, Los Angeles, Toronto, São Paulo, Buenos Aires
- 🌍 **Europe**: London, Paris, Berlin, Madrid, Rome, Stockholm
- 🌏 **Asia**: Tokyo, Singapore, Mumbai, Beijing, Seoul
- 🌏 **Oceania**: Sydney, Melbourne, Auckland
- 🌍 **Africa**: Johannesburg, Cairo, Lagos

## 🔗 Millix Node Integration

### API Endpoints Used

The proxy server connects to your local Millix node API:

| Endpoint | Purpose | Parameters |
|----------|---------|------------|
| `/api/list_transaction` | Recent transactions | p0: limit |
| `/api/get_transaction_extended` | Transaction details | p0: txId, p1: shardId |
| `/api/list_transaction_output` | Transaction outputs | (none) |
| `/api/get_stat_summary` | Network statistics | (none) |
| `/api/list_node` | Peer nodes | (none) |

### Authentication

The proxy automatically uses your node credentials from:
```
~/millix-tangled/node.json
```

## 🎨 User Interface

### Color Theme
- **Background**: Deep purple/black gradient
- **Primary**: Purple (#8b5cf6)
- **Accent**: Light purple (#c084fc)
- **Success**: Green (#10b981)
- **Info**: Blue (#60a5fa)

### Layout
- **Header**: Logo + network statistics cards
- **Left Sidebar**: Search, filters, live transaction feed
- **Center**: Main visualization area with controls
- **Right Panel**: Transaction/peer details (expandable)
- **Footer**: Version info and update frequency

## 📊 Visualization Modes

### 1. Peer Hub View (Default)
- Your node at the center (purple, glowing)
- Peer nodes arranged radially
- Connection lines to all peers
- Green = active, Blue = inactive
- Click peers for details

### 2. World Map View
- Geographic peer positions
- Dark-themed world map
- Country borders in purple
- Connection lines from your location
- Hover for city/country labels

### 3. Transaction DAG
- Force-directed graph layout
- Nodes = transactions
- Edges = parent relationships
- Color-coded by state
- Interactive drag & zoom

### 4. Price Chart
- Time series line chart
- Gradient fill under line
- X-axis: Time (HH:MM)
- Y-axis: Price ($USD)
- Latest price highlighted (green dot)

## 🔧 Development

### Build & Run

**Development mode** with auto-reload:
```bash
cd proxy
npm install
node unified-server.js
```

**Production mode**:
```bash
cd proxy
nohup node unified-server.js > server.log 2>&1 &
```

**Stop server**:
```bash
pkill -f unified-server.js
```

### Dependencies

Server (proxy directory):
- `topojson-client`: TopoJSON to GeoJSON conversion
- None required - uses built-in Node.js `http`, `https`, `fs`

Frontend (loaded via CDN):
- D3.js v7 (visualization)
- TopoJSON v3 (world map data)

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 90+     | ✅ Fully supported |
| Firefox | 88+     | ✅ Fully supported |
| Safari  | 14+     | ✅ Fully supported |
| Edge    | 90+     | ✅ Fully supported |

## ⚡ Performance

- **Optimized rendering**: Maximum 404 nodes in DAG visualization
- **Efficient updates**: Only re-renders changed data
- **Low bandwidth**: ~50-100KB per update cycle
- **Caching**: Geolocation results cached per IP
- **Rate limiting**: 15ms delay between geolocation requests

## 🐛 Troubleshooting

### No transactions showing
- Ensure Millix node is running (`ps aux | grep millix-node`)
- Check node credentials exist: `~/millix-tangled/node.json`
- Verify node API is accessible: `curl https://localhost:5500/api/...`
- Try demo mode: Click **LIVE** → **DEMO**

### Peers not showing on map
- Geolocation requires internet connection
- IP-API.com has 45 requests/min limit
- Some peers may not have public IPs
- Local/private IPs cannot be geolocated

### Price chart not loading
- Requires internet access to fiatleak.com
- Updates every 30 seconds
- May take 1-2 minutes to collect initial data

## 🆕 What's New in v1.3

### Major Features
- ✨ **World Map Visualization**: Geographic peer network view
- 🌍 **IP Geolocation**: Automatic peer location detection
- 📈 **Live Price Chart**: MLX/USD price tracking with history
- 🔄 **Smart Fallback**: Better handling of incomplete transaction data
- 🎭 **Enhanced Demo Mode**: 60 global synthetic peers

### Improvements
- Updated legend to vertical layout
- Changed "Wallet Txns" → "Node Txns"
- Legend only shows on transaction DAG views
- Show hibernating filter enabled by default
- Better error handling for missing transaction data

### Technical
- Node.js proxy server with unified API endpoints
- Geolocation caching for performance
- Rate limiting for external API calls
- Improved visualization cleanup between modes

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **Millix Team**: For the innovative DAG cryptocurrency
- **D3.js Community**: For powerful visualization tools
- **TopoJSON**: For efficient geographic data
- **IP-API.com**: For free IP geolocation service
- **Fiatleak.com**: For live cryptocurrency price data
- **IOTA Explorer**: UI inspiration
- **Arkham Intel Visualizer**: Design concepts

## 📞 Support

- **Millix Website**: [millix.org](https://millix.org)
- **Millix Documentation**: [docs.millix.org](https://docs.millix.org)
- **Issues**: Open an issue on GitHub

---

**Version 1.3** | Made with 💜 for the Millix Community
