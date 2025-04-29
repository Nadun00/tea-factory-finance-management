const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const transactionRoutes = require('./routes/transactions');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());  // Allows parsing of JSON bodies

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));


app.get('/', (req, res) => {
    res.send('Tea Factory Financial System Backend');
});

// Use the transaction routes
app.use('/api/transactions', transactionRoutes);  // All routes in transactions.js will start with /api/transactions


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
