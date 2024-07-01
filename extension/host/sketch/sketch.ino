// Blinking LED on Arduino

// Pin number for the built-in LED
const int ledPin = LED_BUILTIN;

// Setup runs once when the Arduino is powered on or reset
void setup() {
  // Initialize the digital pin as an output
  pinMode(ledPin, OUTPUT);
}

// Loop runs repeatedly as long as the Arduino has power
void loop() {
  // Turn the LED on (HIGH is the voltage level)
  digitalWrite(ledPin, HIGH);

  // Wait for 1 second (1000 milliseconds)
  delay(100);

  // Turn the LED off by making the voltage LOW
  digitalWrite(ledPin, LOW);

  // Wait for another 1 second
  delay(500);
}
