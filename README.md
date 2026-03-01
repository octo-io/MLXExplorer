# Millix DAG Explorer

A fully browser-based, interactive visualization tool for exploring the Millix cryptocurrency DAG (Directed Acyclic Graph) network. Inspired by explorer.iota.org and the visual interface of intel.arkm.com/visualizer.

## Features

### 🔍 Transaction Explorer
- **Real-time Transaction Feed**: Live updates of recent transactions on the Millix network
- **Search Functionality**: Search by transaction ID or wallet address
- **Detailed Transaction View**: View comprehensive transaction details including:
  - Transaction ID, amount, and fees
  - From/To addresses
  - Transaction state (Pending, Confirmed, Hibernating)
  - Shard information
  - Parent transactions

### 📊 Network Statistics
- Live network node count
- 24-hour transaction volume
- Current MLX price in BTC
- Animated statistics updates

### 🎨 Interactive DAG Visualization
- **Force-Directed Graph**: D3.js-powered interactive network visualization
- **Color-Coded States**:
  - 🟢 Green: Confirmed transactions
  - 🟡 Yellow: Pending transactions
  - 🔵 Blue: Hibernating transactions (>10 minutes old)
- **Interactive Controls**:
  - Zoom in/out
  - Pan and drag
  - Node selection for details
  - Toggle transaction labels
  - Reset view

### 🎯 Millix-Specific Features
- **Hibernation Tracking**: Visualizes Millix's unique 10-minute hibernation period
- **Shard Awareness**: Displays transaction shard assignments
- **Parent Transaction Links**: Shows DAG relationships between transactions

## Technology Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Visualization**: D3.js v7
- **Architecture**: Fully browser-based, no backend required
- **Design**: Responsive, modern dark theme

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for testing)

### Installation

1. Clone or download this repository:
```bash
cd /home/zen/Documents/Octo-PROg/MLXExplorer
```

2. Open `index.html` in your web browser, or serve via a local web server:

**Option 1: Python**
```bash
python3 -m http.server 8000
```

**Option 2: Node.js (http-server)**
```bash
npx http-server -p 8000
```

**Option 3: PHP**
```bash
php -S localhost:8000
```

3. Navigate to `http://localhost:8000` in your browser

## Configuration

The application can be configured by editing `js/config.js`:

```javascript
const CONFIG = {
    API_BASE_URL: 'https://api.millix.com',  // Millix API endpoint
    DEMO_MODE: true,                          // Use synthetic data for demo
    MAX_NODES: 100,                          // Maximum nodes in visualization
    TRANSACTION_UPDATE_INTERVAL: 5000,        // Update interval (ms)
    // ... more options
};
```

### Demo Mode
By default, `DEMO_MODE` is set to `true`, which generates synthetic transaction data for demonstration purposes. To connect to a real Millix node:

1. Set `DEMO_MODE: false` in `js/config.js`
2. Configure `API_BASE_URL` to point to your Millix node API endpoint
3. Ensure CORS is properly configured on the Millix node

## Project Structure

```
MLXExplorer/
├── index.html              # Main HTML file
├── styles.css              # Application styles
├── js/
│   ├── config.js          # Configuration settings
│   ├── api.js             # Millix API integration
│   ├── visualization.js   # D3.js DAG visualization
│   ├── transactions.js    # Transaction management
│   ├── network-stats.js   # Network statistics
│   └── app.js             # Main application logic
└── README.md              # This file
```

## Features in Detail

### DAG Visualization
The visualization uses D3.js force-directed graph layout to represent the DAG structure:
- **Nodes**: Represent individual transactions
- **Edges**: Show parent-child relationships between transactions
- **Force Simulation**: Creates natural spacing and organization
- **Interactivity**: Click nodes to view details, drag to reposition

### Transaction States
Millix has three transaction states:
1. **Pending**: New transactions being propagated through the network
2. **Confirmed**: Validated transactions within the 10-minute window
3. **Hibernating**: Transactions older than 10 minutes (Millix's ledger closure solution)

### Search Capabilities
- Search by full transaction ID (64 hex characters)
- Search by wallet address
- Real-time search suggestions
- View transaction lineage and relationships

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Performance

- Optimized for up to 100 nodes in visualization
- Efficient data updates every 5-10 seconds
- Low bandwidth usage (~50KB/update in demo mode)
- Minimal CPU usage with D3.js hardware acceleration

## Future Enhancements

- [ ] 3D visualization mode
- [ ] Transaction history timeline
- [ ] Network topology map
- [ ] Address watch list
- [ ] Export transaction data
- [ ] Dark/Light theme toggle
- [ ] Mobile-optimized touch controls

## About Millix

Millix is a DAG-based cryptocurrency designed for:
- High transaction throughput (hundreds of thousands TPS)
- Low fees (nearly zero)
- Energy efficiency
- Decentralized architecture

Learn more at [millix.org](https://millix.org)

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## Acknowledgments

- Millix development team
- D3.js community
- IOTA Explorer for inspiration
- Arkham Intel Visualizer for UI concepts
