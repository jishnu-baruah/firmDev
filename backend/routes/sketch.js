const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');

const router = express.Router();

router.use(express.json());



router.get('/sketch-content', async (req, res) => {
    try {
        const sketchPath = path.join(__dirname, '../sketch/sketch.ino');
        const sketchContent = await fs.readFile(sketchPath, 'utf-8');
        res.send(sketchContent);
    } catch (error) {
        console.error('Error reading sketch file:', error);
        res.status(500).send('Error fetching sketch content');
    }
});
// Define route for /compile

router.get('/compile', (req, res) => {
    // Paths to your compile script and sketch file
    const scriptPath = './compile.sh';
    const sketchPath = './sketch/sketch.ino';

    // Construct the full command to execute
    const command = `${scriptPath} ${sketchPath}`;

    // Execute the command
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing the command: ${error}`);
            res.status(500).send('Error compiling sketch');
            return;
        }
        console.log(`Compilation successful: ${stdout}`);
        res.send('Sketch compiled successfully!');
    });
});

module.exports = router;