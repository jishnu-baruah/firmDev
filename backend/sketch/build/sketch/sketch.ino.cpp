#include <Arduino.h>
#line 1 "/home/jishnu/codeFiles/projects/firmDev/backend/sketch/sketch.ino"
```arduino
// Set the pin number for the LED
const int ledPin = 13;

// Setup function runs once when the Arduino starts up
#line 6 "/home/jishnu/codeFiles/projects/firmDev/backend/sketch/sketch.ino"
void setup();
#line 12 "/home/jishnu/codeFiles/projects/firmDev/backend/sketch/sketch.ino"
void loop();
#line 6 "/home/jishnu/codeFiles/projects/firmDev/backend/sketch/sketch.ino"
void setup() {
  // Set the pin mode for the LED pin to output
  pinMode(ledPin, OUTPUT);
}

// Loop function runs continuously after setup
void loop() {
  // Turn on the LED for 1 second
  digitalWrite(ledPin, HIGH);
  delay(1000);

  // Turn off the LED for 1 second
  digitalWrite(ledPin, LOW);
  delay(1000);
}
```
