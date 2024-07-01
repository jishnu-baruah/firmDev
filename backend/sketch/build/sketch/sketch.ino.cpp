#include <Arduino.h>
#line 1 "C:\\Users\\IB\\codeFiles\\Projects\\firmDev\\backend\\sketch\\sketch.ino"
// Define pin numbers
const int pirPin = 2;  // PIR sensor output pin
const int ledPin = 7;  // LED control pin

#line 5 "C:\\Users\\IB\\codeFiles\\Projects\\firmDev\\backend\\sketch\\sketch.ino"
void setup();
#line 11 "C:\\Users\\IB\\codeFiles\\Projects\\firmDev\\backend\\sketch\\sketch.ino"
void loop();
#line 5 "C:\\Users\\IB\\codeFiles\\Projects\\firmDev\\backend\\sketch\\sketch.ino"
void setup() {
  pinMode(pirPin, INPUT);   // PIR sensor pin as input
  pinMode(ledPin, OUTPUT);  // LED pin as output
  Serial.begin(9600);       // Initialize serial communication for debugging
}

void loop() {
  int pirState = digitalRead(pirPin);  // Read PIR sensor state
  if (pirState == HIGH) {
    digitalWrite(ledPin, HIGH);  // Turn on LED when motion detected
    Serial.println("Motion detected!");
    delay(100);  // Delay for stability
    digitalWrite(ledPin, LOW);
    delay(100);
  } else {
    digitalWrite(ledPin, LOW);  // Turn off LED when no motion
  }
}
