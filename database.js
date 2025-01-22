const { MongoClient } = require('mongodb');


const uri = "mongodb+srv://adiwaghmare856a:dvtdAmrE8iswJsxo@cluster0.tu1zi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";      

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB Atlas");

        const database = client.db('User');
        const collection = database.collection('names');

        const doc = { name: "John Doe", age: 30, city: "New York" };
        const result = await collection.insertOne(doc);

        console.log(`New document inserted with _id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
