const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://DanielChung:Fufupapachon23@cluster0.6z8gr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: false });

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/submit', (req, res) => {
    const {email: emailDB} = req.body;
    if (emailDB.includes("@")){
        client.connect( async (err)=>{
            const collection = client.db("cookiy-beta-email").collection("emails");
            const email = {
                email : emailDB
            }
            await collection.insertOne(email);
            console.log(emailDB + " has been saved!");
            res.sendStatus(201);
        });
    }
    else{
        res.sendStatus(406)
    }
});

app.listen(port, () => {
  console.log(`Cookiy Beta email website api hosted at http://localhost:${port}`)
})