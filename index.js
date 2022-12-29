require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@cluster0.qdaz7cw.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const postCollection = client.db('facebookUser').collection('post');

        app.post('/postfield', async(req, res) =>{
            const posts = req.body;
            const result = await postCollection.insertOne(posts);
            res.send(result);
        });
        app.get('/postfield', async(req, res) =>{
            const query = {}
            const result = await postCollection.find(query).sort({like: -1}).toArray();
            res.send(result);
        })
       
    }
    finally {

    }
}
run().catch(err => console.error(err))

app.get('/', (req, res) => {
    res.send("Social Network server is running")
});

app.listen(port, (req, res) => {
    console.log(`Social Network server runnig on ${port}`);
})
