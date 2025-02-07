const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enable CORS for all origins (You can restrict it to specific origins)
app.use(cors({
    origin: '*',  // Allow all origins (change this to specific origin if needed)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

const uri = process.env.MONGO_URI || "mongodb+srv://adiwaghmare856a:dvtdAmrE8iswJsxo@cluster0.tu1zi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// ✅ Reuse MongoDB connection
const client = new MongoClient(uri);
async function connectDB() {
    if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
        console.log("Connected to MongoDB");
    }
    return client.db('User');
}

// ✅ Route to Fetch Names
app.get('/fetch-names', async (req, res) => {
    try {
        const db = await connectDB();
        const collection = db.collection('names');

        const users = await collection.find({}, { projection: { _id: 0, name: 1, email: 1 } }).toArray();
        
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching names:", error);
        res.status(500).json({ message: 'Error fetching names' });
    }
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
