# Quick Start Guide

## Launch the Application

### Method 1: Using the Launch Script (Recommended)
```bash
./launch.sh
```

Then open your browser to: **http://localhost:8000**

### Method 2: Direct Browser Access
Simply open `index.html` in your web browser by double-clicking it or dragging it into your browser window.

### Method 3: Manual Server Start
```bash
# Python 3
python3 -m http.server 8000

# Or Node.js
npx http-server -p 8000

# Or PHP
php -S localhost:8000
```

Then visit: **http://localhost:8000**

## Using the Explorer

### 1. View the DAG Visualization
- The center panel shows the interactive DAG network
- **Green nodes** = Confirmed transactions
- **Yellow nodes** = Pending transactions  
- **Blue nodes** = Hibernating transactions (>10 min old)

### 2. Interact with the Graph
- **Click** nodes to view transaction details
- **Drag** nodes to reposition them
- **Scroll** to zoom in/out
- **Click + drag background** to pan

### 3. Use the Controls
- **+ / -** buttons: Zoom in/out
- **Reset**: Return to default view
- **Labels**: Toggle transaction ID labels
- **2D/3D**: Switch visualization modes (3D coming soon!)

### 4. Search Transactions
1. Enter a transaction ID or wallet address in the search box
2. Click "Search" or press Enter
3. View results in the details panel on the right

### 5. Monitor Live Feed
- Watch the left sidebar for real-time transactions
- Click any transaction to view full details
- Transactions automatically update every 5 seconds

### 6. Check Network Stats
- Top right shows:
  - Total network nodes
  - 24-hour transaction count
  - Current MLX price in BTC

## Demo Mode

By default, the application runs in **demo mode** with synthetic data. This allows you to explore all features without connecting to a real Millix node.

To connect to a real Millix node, edit `js/config.js`:
```javascript
DEMO_MODE: false,
API_BASE_URL: 'https://your-millix-node-api.com'
```

## Tips

- **Best Performance**: Use Chrome or Firefox for optimal D3.js rendering
- **Mobile**: Works on tablets and phones, with responsive layout
- **Multiple Windows**: Open multiple browser tabs to view different parts of the network
- **Developer Tools**: Open browser console (F12) to see detailed logs

## Troubleshooting

**Problem**: White/blank screen  
**Solution**: Check browser console for errors. Ensure D3.js CDN is accessible.

**Problem**: No data showing  
**Solution**: In demo mode, data generates automatically. Check `config.js` settings.

**Problem**: Visualization is slow  
**Solution**: Reduce `MAX_NODES` in `config.js` or close other browser tabs.

**Problem**: Can't start server  
**Solution**: Check if port 8000 is already in use, try a different port.

## What's Next?

Explore the full README.md for:
- Detailed feature documentation
- Configuration options
- API integration guide
- Architecture overview

Enjoy exploring the Millix DAG! 🚀
