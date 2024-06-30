# Hackathon Project: No-Code Firmware Development Platform

## Project Structure

This repository contains the following main folders:

- **backend**: Contains the server-side code.
- **frontend**: Contains the client-side code.
- **extension**: Contains the Chrome extension.
- **generator**: Contains the code for generating firmware.

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- Node.js and npm
- Arduino CLI
- Python

### Setting Up the Backend

1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```

2. Install the necessary dependencies:
    ```sh
    npm install
    ```

3. Start the backend server:
    ```sh
    npm start
    ```

### Setting Up the Frontend

1. Navigate to the `frontend/firmfront` directory:
    ```sh
    cd frontend/firmfront
    ```

2. Install the necessary dependencies:
    ```sh
    npm install
    ```

3. Start the frontend server:
    ```sh
    npm start
    ```

### Setting Up the Chrome Extension

#### Installing the Host Application (Windows)

1. Navigate to the `extension/host` directory:
    ```sh
    cd extension/host
    ```

2. Run the installation script:
    ```sh
    ./install.bat
    ```

#### Adding the Extension to Chrome

1. Open Chrome and navigate to `chrome://extensions/`.

2. Enable "Developer mode" in the top right corner.

3. Click "Load unpacked" and select the `extension/extension-src` directory.

## Using the Upload Function

To use the upload function, ensure you have Arduino CLI and Python installed on your system.

1. Open the web application and select the hardware components and settings.

2. Generate the firmware code.

3. Connect your microcontroller device via USB.

4. Use the provided interface to upload the generated firmware directly to the connected device.

## Contributing

We welcome contributions to this project. Please follow these steps:

1. Fork the repository.

2. Create a new branch:
    ```sh
    git checkout -b feature-branch
    ```

3. Make your changes and commit them:
    ```sh
    git commit -m "Description of changes"
    ```

4. Push to the branch:
    ```sh
    git push origin feature-branch
    ```

5. Create a pull request on GitHub.

## License

This project is licensed under the MIT License.
