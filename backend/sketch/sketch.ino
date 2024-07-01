```arduino
// Define the pins for the components
const int pirPin = 2; // PIR sensor signal pin
const int ledPin = 13; // LED pin

// Define the PIR sensor state
int pirState = LOW;

void setup() {
  // Set the LED pin as output
  pinMode(ledPin, OUTPUT);

  // Set the PIR sensor pin as input
  pinMode(pirPin, INPUT);
}

void loop() {
  // Read the PIR sensor state
  pirState = digitalRead(pirPin);

  // If the PIR sensor detects motion, turn on the LED
  if (pirState == HIGH) {
    digitalWrite(ledPin, HIGH);
  } else {
    // If the PIR sensor does not detect motion, turn off the LED
    digitalWrite(ledPin, LOW);
  }
}
```