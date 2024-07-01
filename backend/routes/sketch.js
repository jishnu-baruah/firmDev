const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { generateContent } = require('../genModel/gemini');
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

router.get('/compile', (req, res) => {
    const scriptPath = './compile.sh';
    const sketchPath = './sketch/sketch.ino';
    const command = `${scriptPath} ${sketchPath}`;

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

// New POST method to handle componentData and projectDetails
router.post('/generate', async (req, res) => {

    const { componentData, projectDetails } = req.body;
    console.log("gen..")
    if (!componentData && !projectDetails) {
        return res.status(400).send('Component data and project details are required');
    }

    const prompt = `Generate sketch code for the following component data and project details:
    Component Data: ${JSON.stringify(componentData)}
    Project Details: ${projectDetails}`;

    try {
        const generatedSketch = await generateContent(prompt);
        const sketchPath = path.join(__dirname, '../sketch', 'sketch.ino');
        await fs.writeFile(sketchPath, generatedSketch, 'utf-8');
        res.send('Sketch generated and saved successfully!');
    } catch (error) {
        console.error('Error generating sketch:', error);
        res.status(500).send('Error generating sketch');
    }
});


module.exports = router;
