const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;

const devicesRouter = require('./routes/devices');
const sketchRouter = require('./routes/sketch');

// Enable CORS for all routes
app.use(cors());

app.use('/devices', devicesRouter);
app.use('/sketch', sketchRouter);

// Set up paths
const publicPath = path.join(__dirname, 'public');

// Serve static files from the public directory
app.use(express.static(publicPath));

// Define route for /
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Start the server
app.listen(port, () => {
    const ipAddress = 'localhost';
    console.log(`Server is running on http://${ipAddress}:${port}`);
});
