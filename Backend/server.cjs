// Importing dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require("axios");

// Creating the web app
const app = express();
app.use(express.json());
app.use(cors());

// Connecting to mongodb
mongoose.connect(
    'mongodb+srv://saalifBro:299792458@cluster0.vnegu.mongodb.net/ShopDB?retryWrites=true&w=majority&appName=Cluster0'
).then(() => console.log("Connected to MongoDB")).catch(err => console.error(err));

// Creating client model
const ClientSchema = new mongoose.Schema({
    username: { type: String, required: true },
    shop_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    nid: { type: String, required: true },
    phone_num: { type: String, required: true },
    address: { type: String, required: true },
    time: { type: Date, default: Date.now }
});
const Client = mongoose.model("Client", ClientSchema);


const transactionSchema = new mongoose.Schema({
    buy: {
        type: String,
        required: true,
    },
    sell: {
        type: String,
        required: true,
    },
    due: {
        type: String,
        required: true,
    },
    time: { 
        type: Date, 
        default: Date.now 
    },
})
const Transaction = mongoose.model("Transaction", transactionSchema) // ✅ FIXED: Capitalized Model Name


// Checking if the server is running
app.listen(5000, () => console.log("Yeeppi!! Server is running on port 5000"));  

// Pings the server to always keep it awake in render
setInterval(() => {
    axios.get("https://stock-x-oyz9.onrender.com")
    .then(() => console.log("Server pinged to stay awake"))
    .catch((err) => console.log("Ping failed:", err.message));
  }, 5 * 60 * 1000); // Ping every 5 minutes


  
  


// ======================== API Routes with error handling ========================

// 1️⃣ Uploading client data to MongoDB
app.post('/add-client', async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ error: "Email and Password are required!" });
        }
        const newClient = new Client(req.body);
        await newClient.save();
        res.json({ message: "Client added!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2️⃣ Fetching all clients from MongoDB
app.get('/clients', async (req, res) => {
    const clients = await Client.find();
    res.json(clients);
});

// 3️⃣ Fetching a single client by ID
app.get("/clients/:id", async (req, res) => {
    try {
        const user = await Client.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// 4️⃣ Updating client data by ID
app.put("/clients/:id", async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClient) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "Client updated!", updatedClient });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// 5️⃣ Deleting client data by ID
app.delete("/clients/:id", async (req, res) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id);
        if (!deletedClient) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "Client deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});




// For transaction history

// ✅ FIXED: Added response after saving
app.post('/add-transaction', async (req, res) => {
    try {
        const transactions = new Transaction(req.body)
        await transactions.save()
        res.json({ message: "Transaction saved successfully!" }) // ✅ Send a response
    } catch (error) {
        res.status(500).json({ error: "Error saving transaction" })
    }
})

app.get('/transactions', async (req, res) => {
    try {
        const info = await Transaction.find()
        res.json(info)
    } catch (error) {
        res.status(500).json({ error: "Error fetching transactions" })
    }
})








  // // ======================== API Routes without error handeling. Just short form========================
  
  // // 1️⃣ Add a new client
  // app.post('/add-client', async (req, res) => {
  //     const newClient = new Client(req.body);
  //     await newClient.save();
  //     res.json({ message: "Client added!" });
  // });
  
  // // 2️⃣ Get all clients
  // app.get('/clients', async (req, res) => {
  //     const clients = await Client.find();
  //     res.json(clients);
  // });
  
  // // 3️⃣ Get a single client by ID
  // app.get("/clients/:id", async (req, res) => {
  //     const user = await Client.findById(req.params.id);
  //     res.json(user);
  // });
  
  // // 4️⃣ Update client data
  // app.put("/clients/:id", async (req, res) => {
  //     const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
  //     res.json({ message: "Client updated!", updatedClient });
  // });
  
  // // 5️⃣ Delete a client
  // app.delete("/clients/:id", async (req, res) => {
  //     await Client.findByIdAndDelete(req.params.id);
  //     res.json({ message: "Client deleted successfully!" });
  // });
  
  
