const express = require('express');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.use(express.json());

// Endpoint to list connected serial devices
router.get('/list-devices', async (req, res) => {
    try {
        const ports = await SerialPort.list();
        res.json(ports);
    } catch (error) {
        console.error('Error listing devices:', error.message);
        res.status(500).json({ error: 'Failed to list devices' });
    }
});

// Endpoint to connect to a specific device
router.post('/connect-device', (req, res) => {
    const { path, baudRate } = req.body;

    const port = new SerialPort(path, { baudRate: baudRate || 9600 });

    const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

    parser.on('data', (data) => {
        console.log(`Data received: ${data}`);
    });

    port.on('open', () => {
        console.log(`Connected to ${path}`);
        res.json({ message: 'Device connected', path });
    });

    port.on('error', (err) => {
        console.error('Error connecting to device:', err.message);
        res.status(500).json({ error: 'Failed to connect to device' });
    });
});

// Endpoint to flash firmware to the connected device
router.post('/flash-firmware', async (req, res) => {
    const { devicePath } = req.body;
    const firmwarePath = path.join(__dirname, '../sketch/build/sketch.ino.hex');

    try {
        const firmware = fs.readFileSync(firmwarePath);

        const port = new SerialPort(devicePath, { baudRate: 115200 });

        port.on('open', () => {
            console.log(`Flashing firmware to ${devicePath}`);

            port.write(firmware, (err) => {
                if (err) {
                    console.error('Error writing firmware:', err.message);
                    res.status(500).json({ error: 'Failed to flash firmware' });
                } else {
                    console.log('Firmware flashed successfully');
                    res.json({ message: 'Firmware flashed successfully' });
                }
            });
        });

        port.on('error', (err) => {
            console.error('Error connecting to device:', err.message);
            res.status(500).json({ error: 'Failed to connect to device' });
        });
    } catch (error) {
        console.error('Error reading firmware file:', error.message);
        res.status(500).json({ error: 'Failed to read firmware file' });
    }
});

module.exports = router;
