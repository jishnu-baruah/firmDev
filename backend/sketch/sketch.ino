```arduino
// This Arduino sketch blinks an LED on pin 13.

// Declare the LED pin as an output.
const int ledPin = 13;

void setup() {
  // Set the LED pin as an output.
  pinMode(ledPin, OUTPUT);
}

void loop() {
  // Turn on the LED.
  digitalWrite(ledPin, HIGH);
  // Wait for 500 milliseconds.
  delay(500);
  // Turn off the LED.
  digitalWrite(ledPin, LOW);
  // Wait for 500 milliseconds.
  delay(500);
}
```