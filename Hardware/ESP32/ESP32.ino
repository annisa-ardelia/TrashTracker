#include <WiFi.h>
#include <HTTPClient.h>

/* CONSTANTS FOR HC-SR04 SENSOR */
#define TRIG_PIN 5 // Define Trigger Pin
#define ECHO_PIN 18 // Define Echo Pin

/* WiFi Configuration */
#define WIFI_SSID "Alia"
#define WIFI_PASSWORD "12345678"

/* Server Configuration */
const char* serverUrl = "http://192.168.66.76/makersgroup/sensor.php";

String sendval, postData;

void checkWiFiConnection() {
  while (WiFi.status() != WL_CONNECTED) {
    Serial.println("Connecting to Wi-Fi...");
    delay(1000);
  }
  Serial.println("Connected to Wi-Fi");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void setup() {
  Serial.begin(115200);
  Serial.println("Communication Started\n");

  /* WiFi Initialization */
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  checkWiFiConnection();

  /* HC-SR04 Initialization */
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
}

void loop() {
  /* Ensure WiFi Connection */
  checkWiFiConnection();

  /* Measure Distance with HC-SR04 */
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH);
  float distance = (duration * 0.034) / 2; // Convert time to distance in cm
  sendval = String(distance); // Convert distance to a string

  /* Display Distance */
  Serial.printf("Measured Distance: %.2f cm\n", distance);

  /* Prepare POST Data */
  postData = "sendval=" + sendval;
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
    Serial.println("Server response: " + response);
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
  delay(5000); // Wait 5 seconds before the next reading
}