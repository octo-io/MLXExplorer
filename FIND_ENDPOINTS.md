# How to Find Millix API Endpoints

## Method 1: Inspect Tangled Browser Network Traffic (RECOMMENDED)

1. **Open Tangled Browser**
2. **Open Developer Tools** (F12 or Ctrl+Shift+I)
3. **Go to Network tab**
4. **Look at your node data** in the Tangled browser (wallet, transactions, stats, etc.)
5. **Watch for API calls** in the Network tab - look for requests to:
   - `localhost:5500/*`
   - `127.0.0.1:5500/*`
   - `chrome-untrusted://millix*`

6. **Note the endpoints** you see, like:
   - `/api/wallet/balance`
   - `/node/stats`
   - `/transaction/recent`
   - etc.

7. **Share those endpoints with me** and I'll integrate them!

## Method 2: Search the Tangled Source Code

```bash
# Search for API endpoint definitions in Tangled
grep -r "localhost:5500" ~/.config/tangled/ 2>/dev/null | head -20
grep -r "fetch.*5500" ~/.config/tangled/ 2>/dev/null | head -20

# Search in Tangled installation
strings /opt/tangled.com/tangled/millix_node/index.dist.js | grep -E "^/[a-z]" | sort -u | head -50
```

## Method 3: Check Tangled's Documentation

Look in Tangled browser's help/settings for:
- API documentation
- Developer mode
- Node configuration panel

## Method 4: Intercept with mitmproxy

If you have mitmproxy installed:
```bash
mitmproxy -p 8888 --mode reverse:https://localhost:5500
# Then configure Tangled to use proxy
```

## What I Need From You

Once you find the endpoints, share them like this:
```
✓ /wallet/balance - Returns wallet balance
✓ /node/stats - Returns node statistics  
✓ /transaction/list - Returns transactions
✓ /network/peers - Returns peer list
```

Then I can update the proxy to fetch real data from your node!
