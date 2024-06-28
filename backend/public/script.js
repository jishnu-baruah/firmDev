document.addEventListener('DOMContentLoaded', () => {
    const showSketchBtn = document.getElementById('showSketchBtn');
    const compileBtn = document.getElementById('compileBtn');
    const sketchContentElem = document.getElementById('sketchContent');
    const listDevicesBtn = document.getElementById('listDevicesBtn');
    const devicesList = document.getElementById('devicesList');
    const connectDeviceBtn = document.getElementById('connectDeviceBtn');
    const flashFirmwareBtn = document.getElementById('flashFirmwareBtn');
    const testButton = document.getElementById('testButton');

    // Function to fetch and display sketch content
    showSketchBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/sketch/sketch-content');
            if (!response.ok) {
                throw new Error('Failed to fetch sketch content');
            }
            const sketchContent = await response.text();
            sketchContentElem.textContent = sketchContent;
        } catch (error) {
            console.error('Error fetching sketch:', error);
            sketchContentElem.textContent = 'Error fetching sketch.';
        }
    });

    // Function to compile the sketch
    compileBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/sketch/compile');
            if (!response.ok) {
                throw new Error('Failed to compile sketch');
            }
            const compileMessage = await response.text();
            alert(compileMessage); // Show compilation message in an alert box
        } catch (error) {
            console.error('Error compiling sketch:', error);
            alert('Error compiling sketch.');
        }
    });

    // Function to list connected devices
    listDevicesBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/devices/list-devices');
            if (!response.ok) {
                throw new Error('Failed to list devices');
            }
            const devices = await response.json();
            devicesList.innerHTML = '';
            devices.forEach(device => {
                const option = document.createElement('option');
                option.textContent = `${device.path} - ${device.manufacturer}`;
                option.value = device.path;
                devicesList.appendChild(option);
            });
        } catch (error) {
            console.error('Error listing devices:', error);
            alert('Error listing devices.');
        }
    });

    // Function to connect to a selected device
    connectDeviceBtn.addEventListener('click', async () => {
        const selectedDevicePath = devicesList.value;
        if (!selectedDevicePath) {
            alert('Please select a device to connect.');
            return;
        }

        try {
            const response = await fetch('/devices/connect-device', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ path: selectedDevicePath })
            });
            if (!response.ok) {
                throw new Error('Failed to connect to device');
            }
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Error connecting to device:', error);
            alert('Error connecting to device.');
        }
    });

    // Function to flash firmware to a connected device
    flashFirmwareBtn.addEventListener('click', async () => {
        const selectedDevicePath = devicesList.value;
        if (!selectedDevicePath) {
            alert('Please select a device to flash firmware.');
            return;
        }

        try {
            const response = await fetch('/devices/flash-firmware', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    devicePath: selectedDevicePath
                })
            });
            if (!response.ok) {
                throw new Error('Failed to flash firmware');
            }
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Error flashing firmware:', error);
            alert('Error flashing firmware.');
        }
    });
    testButton.addEventListener("click", () => {

    })
});
