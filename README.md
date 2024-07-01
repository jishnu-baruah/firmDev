<div>
  <img src="./logo.jpg" alt="FirmDev Logo" width="200" height="200">
  <h1>FirmDev: No-Code Firmware Development Platform</h1>

  <h2>Project Structure</h2>

  <p>This repository contains the following main folders:</p>

  <ul>
    <li><strong>backend</strong>: Contains the server-side code.</li>
    <li><strong>frontend</strong>: Contains the client-side code.</li>
    <li><strong>extension</strong>: Contains the Chrome extension.</li>
    <li><strong>generator</strong>: Contains the code for generating firmware.</li>
  </ul>

  <h2>Getting Started</h2>

  <h3>Prerequisites</h3>

  <p>Make sure you have the following installed on your system:</p>

  <ul>
    <li>Node.js and npm</li>
    <li>Arduino CLI</li>
    <li>Python</li>
  </ul>

  <h3>Cloning the Repository</h3>

  <p>Clone this repository to your local machine:</p>

  <pre><code>git clone https://github.com/jishnu-baruah/firmDev.git
cd FirmDev
</code></pre>

  <h3>Setting Up</h3>

  <ol>
    <li>Install dependencies for the root of the project:</li>
  </ol>

  <pre><code>npm install
</code></pre>

  <ol start="2">
    <li>Install dependencies for the backend:</li>
  </ol>

  <pre><code>npm run install-backend
</code></pre>

  <ol start="3">
    <li>Install dependencies for the frontend:</li>
  </ol>

  <pre><code>npm run install-frontend
</code></pre>

  <h3>Starting the Servers</h3>

  <p>Start the backend and frontend servers concurrently:</p>

  <pre><code>npm start
</code></pre>

  <h3>Setting Up the Chrome Extension</h3>

  <h4>Installing the Host Application (Windows)</h4>

  <ol>
    <li>Navigate to the <code>extension/host</code> directory:</li>
  </ol>

  <pre><code>cd extension/host
</code></pre>

  <ol start="2">
    <li>Run the installation script:</li>
  </ol>

  <pre><code>./install.bat
</code></pre>

  <h4>Adding the Extension to Chrome</h4>

  <ol>
    <li>Open Chrome and navigate to <code>chrome://extensions/</code>.</li>
    <li>Enable "Developer mode" in the top right corner.</li>
    <li>Click "Load unpacked" and select the <code>extension/extension-src</code> directory.</li>
  </ol>

  <h3>Adding Gemini API Key</h3>

  <p>To use Gemini, you need to add your API key to the <code>.env</code> file in the <code>backend</code> directory.</p>

  <ol>
    <li>Create a <code>.env</code> file in the <code>backend</code> directory if it doesn't already exist.</li>
    <li>Add the following line to the <code>.env</code> file, replacing <code>API_KEY</code> with your actual API key:</li>
  </ol>

  <pre><code>API_KEY=YOUR_GEMINI_API_KEY
</code></pre>

  <h2>Using the Upload Function (under development)</h2>

  <p>To use the upload function, ensure you have Arduino CLI and Python installed on your system.</p>

  <ol>
    <li>Open the web application and select the hardware components and settings.</li>
    <li>Generate the firmware code.</li>
    <li>Connect your microcontroller device via USB.</li>
    <li>Use the Chrome extension to upload the generated firmware directly to the connected device.</li>
  </ol>

  <h2>Contributing</h2>

  <p>We welcome contributions to this project. Please follow these steps:</p>

  <ol>
    <li>Fork the repository.</li>
    <li>Create a new branch:</li>
  </ol>

  <pre><code>git checkout -b feature-branch
</code></pre>

  <ol start="3">
    <li>Make your changes and commit them:</li>
  </ol>

  <pre><code>git commit -m "Description of changes"
</code></pre>

  <ol start="4">
    <li>Push to the branch:</li>
  </ol>

  <pre><code>git push origin feature-branch
</code></pre>

  <ol start="5">
    <li>Create a pull request on GitHub.</li>
  </ol>

  <h2>License</h2>

  <p>This project is licensed under the MIT License.</p>
</div>
