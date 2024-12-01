#include <WiFi.h>
#include <HTTPClient.h>

/* CONSTANTS FOR HC-SR04 SENSORS */
#define TRIG_PIN1 5  // Trigger Pin for Sensor 1
#define ECHO_PIN1 18 // Echo Pin for Sensor 1
#define TRIG_PIN2 23 // Trigger Pin for Sensor 2
#define ECHO_PIN2 19 // Echo Pin for Sensor 2

/* WiFi Configuration */
#define WIFI_SSID "Alia"
#define WIFI_PASSWORD "12345678"

/* Server Configuration */
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
  Serial.println("Communication Started\n");

  /* WiFi Initialization */
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  checkWiFiConnection();

  /* HC-SR04 Initialization */
  pinMode(TRIG_PIN1, OUTPUT);
  pinMode(ECHO_PIN1, INPUT);
  pinMode(TRIG_PIN2, OUTPUT);
  pinMode(ECHO_PIN2, INPUT);
}

void loop() {
  /* Ensure WiFi Connection */
  checkWiFiConnection();

  /* Measure Distance with HC-SR04 */
  float distance1 = measureDistance(TRIG_PIN1, ECHO_PIN1);
  float distance2 = measureDistance(TRIG_PIN2, ECHO_PIN2);

  /* Calculate Percentages */
  float percentage3 = (distance1 * 100) / 40;
  float percentage4 = (distance2 * 100) / 40;

  sendval1 = String(distance1); // Convert distance1 to a string
  sendval2 = String(distance2); // Convert distance2 to a string
  sendval3 = String(percentage3, 2); // Convert percentage3 to a string with 2 decimal places
  sendval4 = String(percentage4, 2); // Convert percentage4 to a string with 2 decimal places

  /* Display Measurements */
  Serial.printf("Wet Sensor - Measured Distance: %.2f cm, Percentage: %.2f%%\n", distance1, percentage3);
  Serial.printf("Dry Sensor 2 - Measured Distance: %.2f cm, Percentage: %.2f%%\n", distance2, percentage4);

  /* Prepare POST Data */
  postData = "sensor1=" + sendval1 + "&sensor2=" + sendval2 + "&percentage3=" + sendval3 + "&percentage4=" + sendval4;
  Serial.print("Sending data: ");
  Serial.println(postData);

  /* Send Data to Server */
  WiFiClient client;
  HTTPClient http;
  http.begin(client, serverUrl);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");

  int httpCode = http.POST(postData);

  /* Handle Server Response */
  if (httpCode == HTTP_CODE_OK) {
    String response = http.getString();

    // Replace `<br>` tags with newlines for better formatting
    response.replace("<br>", "\n");

    Serial.println("Server response: ");
    Serial.println(response); // Print response with newlines
  } else {
    Serial.print("HTTP POST request failed with error code: ");
    Serial.println(httpCode);

    if (httpCode == HTTPC_ERROR_CONNECTION_REFUSED) {
      Serial.println("Connection refused by the server.");
    } else if (httpCode == HTTP_CODE_NOT_FOUND) {
      Serial.println("Server resource not found.");
    } else {
      Serial.println("Unknown error occurred.");
    }
  }

  http.end();
  delay(10000); // Wait 10 seconds before the next reading
}