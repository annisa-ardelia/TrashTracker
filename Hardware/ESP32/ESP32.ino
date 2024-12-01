#include <ESP32Servo.h> // Pustaka untuk ESP32
#include <WiFi.h>
#include <HTTPClient.h>

// Servo motor setup
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

// Additional ultrasonic sensors
#define TRIG_PIN1 5   // Trigger Pin for Sensor 1
#define ECHO_PIN1 18  // Echo Pin for Sensor 1
#define TRIG_PIN2 23  // Trigger Pin for Sensor 2
#define ECHO_PIN2 19  // Echo Pin for Sensor 2

// WiFi Configuration
#define WIFI_SSID "Alia"
#define WIFI_PASSWORD "12345678"

// Server Configuration
const char* serverUrl = "http://192.168.66.76/makersgroup/sensor.php";

String sendval1, sendval2, sendval3, sendval4, postData;

void checkWiFiConnection() {
  while (WiFi.status() != WL_CONNECTED) {
    Serial.println("Connecting to Wi-Fi...");
    delay(1000);
  }
  Serial.println("Connected to Wi-Fi");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

float measureDistance(uint8_t trigPin, uint8_t echoPin) {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH);
  float distance = (duration * 0.034) / 2; // Convert time to distance in cm

  // Handle invalid readings
  if (distance > 40) {
    distance = 0; // Cap the distance to 0 cm if it exceeds
  } else {
    distance = 40 - distance; // Adjust distance based on the new formula
  }

  return distance;
}

void setup() {
  Serial.begin(115200);

  // Servo motor and soil sensor setup
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  servo1.attach(26); // Ganti 26 dengan pin PWM yang sesuai untuk ESP32
  Serial.println("Soil Sensor     Ultrasonic          Servo");
  Serial.println(".........");

  // WiFi setup
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  checkWiFiConnection();

  // Additional ultrasonic sensors setup
  pinMode(TRIG_PIN1, OUTPUT);
  pinMode(ECHO_PIN1, INPUT);
  pinMode(TRIG_PIN2, OUTPUT);
  pinMode(ECHO_PIN2, INPUT);
}

void loop() {
  Serial.println("Dry Wet Waste Segregator");

  // Measure soil sensor and ultrasonic distance for segregator
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
      Serial.println("\nGarbage Detected! WET");
      servo1.write(160);
      delay(3000);
    } else {
      delay(1000);
      Serial.println("\nGarbage Detected! DRY");
      servo1.write(20);
      delay(3000);
    }
    servo1.write(90);
  }
  distance = 0;
  fsoil = 0;

  // Measure additional ultrasonic distances
  float distance1 = measureDistance(TRIG_PIN1, ECHO_PIN1);
  float distance2 = measureDistance(TRIG_PIN2, ECHO_PIN2);

  // Calculate percentages
  float percentage3 = (distance1 * 100) / 40;
  float percentage4 = (distance2 * 100) / 40;

  sendval1 = String(distance1); // Convert distance1 to a string
  sendval2 = String(distance2); // Convert distance2 to a string
  sendval3 = String(percentage3, 2); // Convert percentage3 to a string with 2 decimal places
  sendval4 = String(percentage4, 2); // Convert percentage4 to a string with 2 decimal places

  // Display measurements
  Serial.printf("Wet Sensor - Measured Distance: %.2f cm, Percentage: %.2f%%\n", distance1, percentage3);
  Serial.printf("Dry Sensor - Measured Distance: %.2f cm, Percentage: %.2f%%\n", distance2, percentage4);

  // Prepare and send POST data
  postData = "sensor1=" + sendval1 + "&sensor2=" + sendval2 + "&percentage3=" + sendval3 + "&percentage4=" + sendval4;
  Serial.print("Sending data: ");
  Serial.println(postData);

  WiFiClient client;
  HTTPClient http;
  http.begin(client, serverUrl);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");

  int httpCode = http.POST(postData);

  // Handle server response
  if (httpCode == HTTP_CODE_OK) {
    String response = http.getString();
    response.replace("<br>", "\n");
    Serial.println("Server response: ");
    Serial.println(response);
  } else {
    Serial.print("HTTP POST request failed with error code: ");
    Serial.println(httpCode);
  }
  http.end();

  delay(5000); // Wait 10 seconds before the next iteration
}