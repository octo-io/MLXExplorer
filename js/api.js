// API module for Millix network data
const MillixAPI = {
    // Generate synthetic transaction data for demo mode
    generateSyntheticTransaction() {
        const txId = this.generateTxId();
        const amount = (Math.random() * 1000000).toFixed(2);
        
        // Generate transactions with varied ages
        const ageVariation = Math.random() * 3600000; // Up to 1 hour old
        const timestamp = Date.now() - ageVariation;
        
        // Distribute states more evenly:
        // 50% confirmed, 30% pending, 20% hibernating
        const rand = Math.random();
        let state;
        if (rand < 0.5) {
            state = CONFIG.TX_STATE.CONFIRMED;
        } else if (rand < 0.8) {
            state = CONFIG.TX_STATE.PENDING;
        } else {
            state = CONFIG.TX_STATE.HIBERNATING;
        }
        
        return {
            id: txId,
            amount: amount,
            timestamp: timestamp,
            state: state,
            from: this.generateAddress(),
            to: this.generateAddress(),
            fee: (parseFloat(amount) * 0.001).toFixed(2),
            shard: Math.floor(Math.random() * 50),
            parents: this.generateParents()
        };
    },
    
    generateTxId() {
        return Array.from({length: 64}, () => 
            Math.floor(Math.random() * 16).toString(16)
        ).join('');
    },
    
    generateAddress() {
        return Array.from({length: 44}, () => 
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            [Math.floor(Math.random() * 62)]
        ).join('');
    },
    
    generateParents() {
        const parentCount = Math.floor(Math.random() * 3) + 1;
        return Array.from({length: parentCount}, () => this.generateTxId());
    },
    
    // Fetch recent transactions
    async fetchRecentTransactions(limit = 20) {
        if (CONFIG.DEMO_MODE) {
            return Array.from({length: limit}, () => this.generateSyntheticTransaction());
        }
        
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/transactions/recent?limit=${limit}`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.warn('Failed to fetch transactions:', error);
        }
        
        return [];
    },
    
    // Search for a specific transaction
    async searchTransaction(txId, shard) {
        if (CONFIG.DEMO_MODE) {
            // Return a demo transaction with the searched ID
            const tx = this.generateSyntheticTransaction();
            tx.id = txId;
            return tx;
        }
        
        try {
            const qs = shard ? `?shard=${encodeURIComponent(shard)}` : '';
            const response = await fetch(`${CONFIG.API_BASE_URL}/transaction/${txId}${qs}`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.warn('Failed to search transaction:', error);
        }
        
        return null;
    },
    
    // Fetch network statistics
    async fetchNetworkStats() {
        if (CONFIG.DEMO_MODE) {
            return CONFIG.DEFAULT_STATS;
        }
        
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/stats`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.warn('Failed to fetch network stats:', error);
        }
        
        return CONFIG.DEFAULT_STATS;
    },
    
    // Fetch MLX price + history from proxy
    async fetchPriceHistory() {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/price`);
            if (response.ok) return await response.json();
        } catch (error) {
            console.warn('Failed to fetch price history:', error);
        }
        return { price: 0, change: 0, history: [] };
    },

    // Fetch peer list
    async fetchPeers() {
        if (CONFIG.DEMO_MODE) {
            return this.generateSyntheticPeers(60);
        }

        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/peers`);
            if (response.ok) return await response.json();
        } catch (error) {
            console.warn('Failed to fetch peers:', error);
        }
        return [];
    },
    
    // Generate synthetic peers with realistic geolocation
    generateSyntheticPeers(count = 60) {
        // Major cities around the world with their coordinates
        const locations = [
            { city: 'New York', country: 'United States', lat: 40.7128, lon: -74.0060 },
            { city: 'Los Angeles', country: 'United States', lat: 34.0522, lon: -118.2437 },
            { city: 'Chicago', country: 'United States', lat: 41.8781, lon: -87.6298 },
            { city: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278 },
            { city: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522 },
            { city: 'Berlin', country: 'Germany', lat: 52.5200, lon: 13.4050 },
            { city: 'Madrid', country: 'Spain', lat: 40.4168, lon: -3.7038 },
            { city: 'Rome', country: 'Italy', lat: 41.9028, lon: 12.4964 },
            { city: 'Amsterdam', country: 'Netherlands', lat: 52.3676, lon: 4.9041 },
            { city: 'Stockholm', country: 'Sweden', lat: 59.3293, lon: 18.0686 },
            { city: 'Moscow', country: 'Russia', lat: 55.7558, lon: 37.6173 },
            { city: 'Istanbul', country: 'Turkey', lat: 41.0082, lon: 28.9784 },
            { city: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lon: 55.2708 },
            { city: 'Mumbai', country: 'India', lat: 19.0760, lon: 72.8777 },
            { city: 'Delhi', country: 'India', lat: 28.7041, lon: 77.1025 },
            { city: 'Singapore', country: 'Singapore', lat: 1.3521, lon: 103.8198 },
            { city: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503 },
            { city: 'Seoul', country: 'South Korea', lat: 37.5665, lon: 126.9780 },
            { city: 'Beijing', country: 'China', lat: 39.9042, lon: 116.4074 },
            { city: 'Shanghai', country: 'China', lat: 31.2304, lon: 121.4737 },
            { city: 'Hong Kong', country: 'Hong Kong', lat: 22.3193, lon: 114.1694 },
            { city: 'Bangkok', country: 'Thailand', lat: 13.7563, lon: 100.5018 },
            { city: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093 },
            { city: 'Melbourne', country: 'Australia', lat: -37.8136, lon: 144.9631 },
            { city: 'Auckland', country: 'New Zealand', lat: -36.8485, lon: 174.7633 },
            { city: 'São Paulo', country: 'Brazil', lat: -23.5505, lon: -46.6333 },
            { city: 'Rio de Janeiro', country: 'Brazil', lat: -22.9068, lon: -43.1729 },
            { city: 'Buenos Aires', country: 'Argentina', lat: -34.6037, lon: -58.3816 },
            { city: 'Mexico City', country: 'Mexico', lat: 19.4326, lon: -99.1332 },
            { city: 'Toronto', country: 'Canada', lat: 43.6532, lon: -79.3832 },
            { city: 'Vancouver', country: 'Canada', lat: 49.2827, lon: -123.1207 },
            { city: 'Montreal', country: 'Canada', lat: 45.5017, lon: -73.5673 },
            { city: 'Johannesburg', country: 'South Africa', lat: -26.2041, lon: 28.0473 },
            { city: 'Cape Town', country: 'South Africa', lat: -33.9249, lon: 18.4241 },
            { city: 'Cairo', country: 'Egypt', lat: 30.0444, lon: 31.2357 },
            { city: 'Lagos', country: 'Nigeria', lat: 6.5244, lon: 3.3792 },
            { city: 'Nairobi', country: 'Kenya', lat: -1.2921, lon: 36.8219 },
            { city: 'Karachi', country: 'Pakistan', lat: 24.8607, lon: 67.0011 },
            { city: 'Lahore', country: 'Pakistan', lat: 31.5497, lon: 74.3436 },
            { city: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lon: 90.4125 },
            { city: 'Manila', country: 'Philippines', lat: 14.5995, lon: 120.9842 },
            { city: 'Jakarta', country: 'Indonesia', lat: -6.2088, lon: 106.8456 },
            { city: 'Kuala Lumpur', country: 'Malaysia', lat: 3.1390, lon: 101.6869 },
            { city: 'Ho Chi Minh City', country: 'Vietnam', lat: 10.8231, lon: 106.6297 },
            { city: 'Hanoi', country: 'Vietnam', lat: 21.0285, lon: 105.8542 },
            { city: 'Taipei', country: 'Taiwan', lat: 25.0330, lon: 121.5654 },
            { city: 'Tel Aviv', country: 'Israel', lat: 32.0853, lon: 34.7818 },
            { city: 'Warsaw', country: 'Poland', lat: 52.2297, lon: 21.0122 },
            { city: 'Prague', country: 'Czech Republic', lat: 50.0755, lon: 14.4378 },
            { city: 'Vienna', country: 'Austria', lat: 48.2082, lon: 16.3738 },
            { city: 'Zurich', country: 'Switzerland', lat: 47.3769, lon: 8.5417 },
            { city: 'Copenhagen', country: 'Denmark', lat: 55.6761, lon: 12.5683 },
            { city: 'Oslo', country: 'Norway', lat: 59.9139, lon: 10.7522 },
            { city: 'Helsinki', country: 'Finland', lat: 60.1699, lon: 24.9384 },
            { city: 'Athens', country: 'Greece', lat: 37.9838, lon: 23.7275 },
            { city: 'Lisbon', country: 'Portugal', lat: 38.7223, lon: -9.1393 },
            { city: 'Brussels', country: 'Belgium', lat: 50.8503, lon: 4.3517 },
            { city: 'Dublin', country: 'Ireland', lat: 53.3498, lon: -6.2603 },
            { city: 'Edinburgh', country: 'United Kingdom', lat: 55.9533, lon: -3.1883 },
            { city: 'Munich', country: 'Germany', lat: 48.1351, lon: 11.5820 }
        ];
        
        const peers = [];
        for (let i = 0; i < count; i++) {
            const location = locations[i % locations.length];
            // Add small random offset to lat/lon for variety
            const latOffset = (Math.random() - 0.5) * 2; // ±1 degree
            const lonOffset = (Math.random() - 0.5) * 2;
            
            peers.push({
                id: this.generateAddress().substring(0, 34),
                address: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
                port: 10000 + Math.floor(Math.random() * 100),
                portApi: 5500,
                prefix: 'wss://',
                status: Math.random() > 0.1 ? 1 : 0, // 90% active
                updated: Date.now() - Math.random() * 86400000,
                created: Date.now() - Math.random() * 86400000 * 30,
                lat: location.lat + latOffset,
                lon: location.lon + lonOffset,
                country: location.country,
                city: location.city
            });
        }
        
        return peers;
    },

    // Fetch DAG structure for visualization
    async fetchDAGStructure(depth = 3, maxNodes = CONFIG.MAX_NODES) {
        if (CONFIG.DEMO_MODE) {
            return this.generateSyntheticDAG(maxNodes);
        }
        
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/dag?depth=${depth}&max=${maxNodes}`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.warn('Failed to fetch DAG structure:', error);
        }
        
        return this.generateSyntheticDAG(maxNodes);
    },
    
    // Generate synthetic DAG for demo
    generateSyntheticDAG(nodeCount = 50) {
        const nodes = [];
        const links = [];
        
        // Generate nodes
        for (let i = 0; i < nodeCount; i++) {
            const tx = this.generateSyntheticTransaction();
            nodes.push({
                id: tx.id,
                amount: parseFloat(tx.amount),
                timestamp: tx.timestamp,
                state: tx.state,
                group: tx.state === CONFIG.TX_STATE.CONFIRMED ? 1 : 
                       tx.state === CONFIG.TX_STATE.HIBERNATING ? 2 : 3
            });
        }
        
        // Generate links (edges in DAG)
        for (let i = 1; i < nodeCount; i++) {
            // Each node references 1-3 previous nodes
            const parentCount = Math.min(Math.floor(Math.random() * 3) + 1, i);
            for (let j = 0; j < parentCount; j++) {
                const parentIndex = Math.max(0, i - Math.floor(Math.random() * Math.min(10, i)));
                links.push({
                    source: nodes[parentIndex].id,
                    target: nodes[i].id,
                    value: 1
                });
            }
        }
        
        return { nodes, links };
    }
};
