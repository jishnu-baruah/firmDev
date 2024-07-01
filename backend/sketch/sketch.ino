```arduino
// PIR Sensor library
#include <PIRSensor.h>

// PIR sensor
PIRSensor pir(51);

void setup() {
  // Set the PIR sensor pin
  pir.setPin(51);

  // Set the PIR sensor sensitivity
  pir.setSensitivity(0);

  // Set the PIR sensor delay
  pir.setDelay(500);

  // Set the PIR sensor timeout
  pir.setTimeout(1000);

  // Set the PIR sensor trigger mode
  pir.setTriggerMode(PIR_TRIGGER_MODE_HIGH);

  // Set the PIR sensor debug mode
  pir.setDebugMode(true);

  // Start the PIR sensor
  pir.start();
}

void loop() {
  // Check if the PIR sensor is triggered
  if (pir.isTriggered()) {
    // Intruder detected!
    digitalWrite(LED_BUILTIN, HIGH);
  } else {
    // No intruder detected
    digitalWrite(LED_BUILTIN, LOW);
  }
}
```