#include <ESP32Servo.h> // Pustaka untuk ESP32

Servo servo1;

const int trigPin = 12;
const int echoPin = 13; // Ganti dengan pin yang sesuai
long duration;
int distance = 0;
int potPin = 34; // ESP32 menggunakan pin ADC seperti 34 atau 35
int soil = 0;
int fsoil;
int maxDryValue = 1;      // Nilai kelembapan untuk menentukan jenis sampah
int Ultra_Distance = 15;  // Jarak sensor ultrasonik ke sensor kelembapan dalam cm

void setup() {
  Serial.begin(115200);

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  servo1.attach(26); // Ganti 26 dengan pin PWM yang sesuai untuk ESP32

  Serial.println("Soil Sensor     Ultrasonic          Servo");
  Serial.println(".........");
  delay(1000);
}

void loop() {
  Serial.println("Dry Wet Waste Segregator");

  int soil = 0;
  for (int i = 0; i < 2; i++) {
    digitalWrite(trigPin, LOW);
    delayMicroseconds(7);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);
    delayMicroseconds(10);
    duration = pulseIn(echoPin, HIGH);
    distance = duration * 0.034 / 2 + distance;
    delay(10);
  }
  distance = distance / 2;

  if (distance < Ultra_Distance && distance > 1) {
    delay(1000);
    for (int i = 0; i < 3; i++) {
      soil = analogRead(potPin);
      soil = constrain(soil, 485, 1023);
      fsoil = (map(soil, 485, 1023, 100, 0)) + fsoil;
      delay(75);
    }
    fsoil = fsoil / 3;

    Serial.print("Humidity: ");
    Serial.print(fsoil);
    Serial.print("%    Distance: ");
    Serial.print(distance);
    Serial.print(" cm");
    if (fsoil > maxDryValue) {
      delay(1000);
      Serial.println("Garbage Detected! WET");
      servo1.write(160);
      delay(3000);
    } else {
      delay(1000);
      Serial.println("Garbage Detected! DRY");
      servo1.write(20);
      delay(3000);
    }
    servo1.write(90);
  }
  distance = 0;
  fsoil = 0;

  // Set delay between readings to 5 seconds
  delay(5000);
}