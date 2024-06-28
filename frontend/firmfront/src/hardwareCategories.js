// src/hardwareCategories.js
const hardwareCategories = [
    {
      category: 'Microcontroller/Microprocessor',
      components: [
        { id: 1, name: 'Arduino Uno', pin: 'A0-A5, D0-D13' },
        { id: 2, name: 'Raspberry Pi', pin: 'GPIO1-GPIO40' },
        { id: 3, name: 'ESP32', pin: 'GPIO1-GPIO39' },
        { id: 4, name: 'STM32', pin: 'PA0-PA15, PB0-PB15' }
      ]
    },
    {
      category: 'Sensors',
      components: [
        { id: 5, name: 'Temperature Sensor (DHT11)', pin: 'Data' },
        { id: 6, name: 'Ultrasonic Sensor (HC-SR04)', pin: 'VCC, Trig, Echo, GND' },
        { id: 7, name: 'Light Sensor (LDR)', pin: 'Analog' },
        { id: 8, name: 'Accelerometer (ADXL345)', pin: 'SDA, SCL' }
      ]
    },
    {
      category: 'Actuators',
      components: [
        { id: 9, name: 'Servo Motor', pin: 'PWM' },
        { id: 10, name: 'Stepper Motor', pin: 'IN1, IN2, IN3, IN4' },
        { id: 11, name: 'DC Motor', pin: 'Positive, Negative' },
        { id: 12, name: 'Solenoid', pin: 'Positive, Negative' }
      ]
    },
    {
      category: 'Communication Modules',
      components: [
        { id: 13, name: 'Bluetooth Module (HC-05)', pin: 'VCC, GND, TXD, RXD' },
        { id: 14, name: 'WiFi Module (ESP8266)', pin: 'VCC, GND, TX, RX, CH_PD' },
        { id: 15, name: 'LoRa Module', pin: 'VCC, GND, MISO, MOSI, SCK, NSS' },
        { id: 16, name: 'ZigBee Module', pin: 'VCC, GND, TXD, RXD' }
      ]
    },
    {
      category: 'Power Supply',
      components: [
        { id: 17, name: 'Battery', pin: 'Positive, Negative' },
        { id: 18, name: 'AC-DC Converter', pin: 'Input, Output' },
        { id: 19, name: 'Solar Panel', pin: 'Positive, Negative' },
        { id: 20, name: 'Power Bank', pin: 'USB Output' }
      ]
    },
    {
      category: 'Display Units',
      components: [
        { id: 21, name: 'LCD Display (16x2)', pin: 'VSS, VDD, VO, RS, RW, E, D0-D7, A, K' },
        { id: 22, name: 'OLED Display', pin: 'VCC, GND, SCL, SDA' },
        { id: 23, name: 'Seven Segment Display', pin: 'a, b, c, d, e, f, g, dp, VCC, GND' },
        { id: 24, name: 'TFT Display', pin: 'VCC, GND, CS, RESET, DC, MOSI, SCK, LED' }
      ]
    },
    {
      category: 'Development and Prototyping Boards',
      components: [
        { id: 25, name: 'Breadboard', pin: 'N/A' },
        { id: 26, name: 'PCB', pin: 'N/A' },
        { id: 27, name: 'Perfboard', pin: 'N/A' },
        { id: 28, name: 'Prototyping Shield', pin: 'N/A' }
      ]
    },
    {
      category: 'Connectors and Wires',
      components: [
        { id: 29, name: 'Jumper Wires', pin: 'N/A' },
        { id: 30, name: 'Dupont Connectors', pin: 'N/A' },
        { id: 31, name: 'Screw Terminals', pin: 'N/A' },
        { id: 32, name: 'Ribbon Cables', pin: 'N/A' }
      ]
    }
  ];
  
  export default hardwareCategories;
  